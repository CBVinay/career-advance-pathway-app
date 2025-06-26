
import React, { useState } from 'react';
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
          <p className="text-lg text-gray-600">Discover your next career move with our real-time job listings</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              onClick={() => setFilter(f.key)}
              className={filter === f.key ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow duration-200 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-lg text-blue-600 font-medium">{job.company}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
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

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{job.type}</Badge>
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
