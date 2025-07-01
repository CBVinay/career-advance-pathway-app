
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Github, ExternalLink, Search, Filter, Star, Users, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AllProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with React and Node.js, featuring payment integration and inventory management.',
      author: 'Sarah Johnson',
      category: 'Web Development',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      stars: 142,
      contributors: 5,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Machine Learning Classifier',
      description: 'A Python-based image classification system using TensorFlow and OpenCV for automated quality control.',
      author: 'Alex Chen',
      category: 'Machine Learning',
      tags: ['Python', 'TensorFlow', 'OpenCV', 'Keras'],
      stars: 89,
      contributors: 3,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Mobile Fitness App',
      description: 'React Native fitness tracking app with workout plans, progress tracking, and social features.',
      author: 'Maria Rodriguez',
      category: 'Mobile Development',
      tags: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      stars: 67,
      contributors: 4,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for visualizing sales data with real-time updates and customizable charts.',
      author: 'David Kim',
      category: 'Data Science',
      tags: ['D3.js', 'React', 'Express', 'PostgreSQL'],
      stars: 156,
      contributors: 2,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'Cloud Infrastructure Tool',
      description: 'DevOps automation tool for managing cloud resources and deployments across multiple platforms.',
      author: 'Emily Watson',
      category: 'DevOps',
      tags: ['AWS', 'Docker', 'Kubernetes', 'Python'],
      stars: 203,
      contributors: 8,
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Secure voting platform built on Ethereum with smart contracts and decentralized architecture.',
      author: 'Michael Brown',
      category: 'Blockchain',
      tags: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      stars: 98,
      contributors: 6,
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web-development', label: 'Web Development' },
    { key: 'mobile-development', label: 'Mobile Development' },
    { key: 'machine-learning', label: 'Machine Learning' },
    { key: 'data-science', label: 'Data Science' },
    { key: 'devops', label: 'DevOps' },
    { key: 'blockchain', label: 'Blockchain' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         project.category.toLowerCase().replace(' ', '-') === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4 hover:bg-blue-50 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore All Projects</h1>
          <p className="text-lg text-gray-600">Discover innovative projects from our community of developers and creators</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects, technologies, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedFilter === category.key ? "default" : "outline"}
                onClick={() => setSelectedFilter(category.key)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Project Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                <p className="text-sm text-gray-600">by {project.author}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm">{project.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.contributors}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">View Project</Button>
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllProjects;
