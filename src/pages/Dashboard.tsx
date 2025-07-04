
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your learning platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Projects
              </CardTitle>
              <CardDescription>
                Explore and download ready-to-use projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/projects">
                <Button className="w-full">View Projects</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mentorship
              </CardTitle>
              <CardDescription>
                Connect with experienced mentors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/mentors">
                <Button className="w-full" variant="outline">View Mentors</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Jobs
              </CardTitle>
              <CardDescription>
                Find your next career opportunity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/jobs">
                <Button className="w-full" variant="outline">View Jobs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
