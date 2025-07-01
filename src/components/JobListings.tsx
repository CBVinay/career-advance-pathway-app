import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Bookmark, ExternalLink } from 'lucide-react';

const JobListings = () => {
  const [filter, setFilter] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$25-30/hr',
      posted: '2 hours ago',
      tags: ['React', 'JavaScript', 'CSS'],
      description: 'Join our dynamic team to build modern web applications using React and modern JavaScript frameworks.'
    },
    {
      id: 2,
      title: 'Junior Data Analyst',
      company: 'DataDriven LLC',
      location: 'Remote',
      type: 'Full-time',
      salary: '$55,000-65,000',
      posted: '5 hours ago',
      tags: ['Python', 'SQL', 'Analytics'],
      description: 'Analyze complex datasets and provide insights to drive business decisions.'
    },
    {
      id: 3,
      title: 'UX/UI Design Intern',
      company: 'Creative Studios',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$20-25/hr',
      posted: '1 day ago',
      tags: ['Figma', 'Prototyping', 'User Research'],
      description: 'Create intuitive user experiences and beautiful interfaces for our client projects.'
    },
    {
      id: 4,
      title: 'Marketing Coordinator',
      company: 'GrowthCo',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$45,000-50,000',
      posted: '2 days ago',
      tags: ['Digital Marketing', 'Content', 'Social Media'],
      description: 'Develop and execute marketing campaigns across multiple digital channels.'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Jobs' },
    { key: 'internship', label: 'Internships' },
    { key: 'full-time', label: 'Full-time' },
    { key: 'remote', label: 'Remote' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">Latest Job Opportunities</h2>
          <p className="text-lg text-gray-600">Discover your next career move with our real-time job listings</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center animate-slide-in-right">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
              className={`transition-all duration-300 hover:scale-105 ${
                filter === f.key 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" 
                  : "hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <Card 
              key={job.id} 
              className={`p-6 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:transform hover:scale-105 animate-fade-in group`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{job.title}</h3>
                  <p className="text-lg text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">{job.company}</p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 relative z-10">
                <div className="flex items-center hover:text-blue-600 transition-colors duration-300">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center hover:text-green-600 transition-colors duration-300">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.posted}
                </div>
                <div className="flex items-center hover:text-purple-600 transition-colors duration-300">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
              </div>

              <p className="text-gray-700 mb-4 relative z-10 group-hover:text-gray-800 transition-colors duration-300">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 hover:shadow-md transition-all duration-300">
                  {job.type}
                </Badge>
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="hover:bg-gray-100 hover:shadow-sm transition-all duration-300 hover:scale-105">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 relative z-10">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Apply Now
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-110">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 animate-fade-in delay-1000">
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All Jobs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
