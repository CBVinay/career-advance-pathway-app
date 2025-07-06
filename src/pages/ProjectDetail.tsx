
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Star, Users, Github, ExternalLink, Download, CreditCard, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Fetch project details
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project-detail', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Check if user has already purchased this project
  const { data: userPurchase, isLoading: purchaseLoading } = useQuery({
    queryKey: ['user-purchase', id],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('project_purchases')
        .select('*')
        .eq('project_id', id)
        .eq('user_id', user.id)
        .eq('status', 'paid')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    }
  });

  const handlePurchase = async () => {
    try {
      setIsProcessingPayment(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to purchase this project.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-project-payment', {
        body: { 
          projectId: id,
          amount: 299900 // ₹2999 in paise
        }
      });

      if (error) throw error;

      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: 'DevHub',
          description: `${data.projectTitle} - Source Code`,
          order_id: data.orderId,
          prefill: {
            email: data.userEmail,
          },
          theme: {
            color: '#4F46E5'
          },
          handler: async (response: any) => {
            try {
              // Verify payment on our server
              const { error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
                body: {
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  type: 'project'
                }
              });

              if (verifyError) throw verifyError;

              toast({
                title: "Payment Successful!",
                description: "Your project purchase was completed successfully."
              });
              
              // Refresh the page to show download button
              window.location.reload();
            } catch (error) {
              console.error('Payment verification error:', error);
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support if money was deducted.",
                variant: "destructive"
              });
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessingPayment(false);
            }
          }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
        setIsProcessingPayment(false);
      };
      document.head.appendChild(script);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessingPayment(false);
    }
  };

  const handleDownload = () => {
    if (project?.zip_file_url) {
      window.open(project.zip_file_url, '_blank');
      toast({
        title: "Download Started",
        description: "Your project download has started."
      });
    } else {
      toast({
        title: "Download Unavailable",
        description: "Download file is not available for this project.",
        variant: "destructive"
      });
    }
  };

  if (projectLoading || purchaseLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading project details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <Link to="/projects">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isPurchased = !!userPurchase;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/projects">
            <Button variant="ghost" className="mb-4 hover:bg-blue-50 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&crop=entropy&auto=format'} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <p className="text-gray-600">by {project.author}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        {project.stars} stars
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {project.contributors} contributors
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(project.github_url, '_blank')}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(project.demo_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   <div className="text-center">
                     <div className="text-3xl font-bold text-gray-900">₹2,999</div>
                     <p className="text-sm text-gray-600">One-time purchase</p>
                   </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Complete source code
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Documentation included
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Lifetime access
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Commercial license
                    </div>
                  </div>

                  {isPurchased ? (
                    <div className="space-y-2">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                        <p className="text-sm text-green-800 font-medium">Already Purchased</p>
                      </div>
                      <Button 
                        onClick={handleDownload}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Project
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={handlePurchase}
                      disabled={isProcessingPayment}
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isProcessingPayment ? 'Processing...' : 'Purchase & Download'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <Badge variant="secondary" className="ml-2">
                      {project.category}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Last Updated:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
