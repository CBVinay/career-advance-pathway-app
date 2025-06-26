
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Star, MessageCircle, Calendar, Users } from 'lucide-react';

const Mentorship = () => {
  const mentors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      expertise: ['React', 'System Design', 'Career Growth'],
      rating: 4.9,
      sessions: 127,
      price: '$75/hour',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b84d4815?w=100&h=100&fit=crop&crop=face&auto=format'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Product Manager',
      company: 'Microsoft',
      expertise: ['Product Strategy', 'Leadership', 'Interview Prep'],
      rating: 4.8,
      sessions: 89,
      price: '$65/hour',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Data Science Lead',
      company: 'Netflix',
      expertise: ['Machine Learning', 'Python', 'Analytics'],
      rating: 4.9,
      sessions: 156,
      price: '$80/hour',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Guidance & Mentorship</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with industry experts who can guide your career journey. Get personalized advice, 
            interview preparation, and insights from professionals at top companies.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-gray-600">Expert Mentors</div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10k+</div>
            <div className="text-gray-600">Sessions Completed</div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="p-6 hover:shadow-lg transition-shadow duration-200 bg-white">
              <div className="text-center mb-6">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-gray-600 mb-1">{mentor.title}</p>
                <p className="text-blue-600 font-medium">{mentor.company}</p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                  {mentor.rating}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {mentor.sessions} sessions
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {mentor.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">{mentor.price}</div>
                <div className="text-gray-600 text-sm">per session</div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Session
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Mentors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
