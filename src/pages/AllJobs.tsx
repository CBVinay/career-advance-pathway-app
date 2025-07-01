
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, DollarSign, Bookmark, ExternalLink, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'CloudTech Solutions',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$70,000-85,000',
      posted: '3 days ago',
      tags: ['Node.js', 'AWS', 'MongoDB'],
      description: 'Build scalable backend systems and APIs for our cloud-based applications.'
    },
    {
      id: 6,
      title: 'Product Manager Intern',
      company: 'InnovateCorp',
      location: 'Remote',
      type: 'Internship',
      salary: '$22-28/hr',
      posted: '4 days ago',
      tags: ['Product Strategy', 'Analytics', 'Agile'],
      description: 'Help shape product roadmaps and coordinate with cross-functional teams.'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Jobs' },
    { key: 'internship', label: 'Internships' },
    { key: 'full-time', label: 'Full-time' },
    { key: 'remote', label: 'Remote' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         job.type.toLowerCase() === selectedFilter ||
                         (selectedFilter === 'remote' && job.location.toLowerCase().includes('remote'));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Job Opportunities</h1>
          <p className="text-lg text-gray-600">Discover your next career move from our comprehensive job listings</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.key)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllJobs;
