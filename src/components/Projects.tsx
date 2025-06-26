
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Star, Eye, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce React App',
      description: 'Full-stack e-commerce application with cart functionality, payment integration, and user authentication.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['React', 'Node.js', 'MongoDB'],
      level: 'Intermediate',
      downloads: 1240,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard showcasing various data visualization techniques using D3.js and modern web technologies.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['JavaScript', 'D3.js', 'Charts'],
      level: 'Advanced',
      downloads: 890,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Mobile Task Manager',
      description: 'Cross-platform mobile application for task management with offline capabilities and cloud sync.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['React Native', 'Firebase', 'Redux'],
      level: 'Intermediate',
      downloads: 2150,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Python ML Portfolio',
      description: 'Collection of machine learning projects demonstrating various algorithms and real-world applications.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop&crop=entropy&auto=format',
      tags: ['Python', 'TensorFlow', 'Jupyter'],
      level: 'Advanced',
      downloads: 760,
      rating: 4.6
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready-to-Download Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your portfolio with our curated collection of projects. Each project comes with complete source code, 
            documentation, and step-by-step guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.level === 'Advanced' ? 'destructive' : project.level === 'Intermediate' ? 'default' : 'secondary'}
                    className="bg-white/90 text-gray-800"
                  >
                    {project.level}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {project.downloads.toLocaleString()} downloads
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    {project.rating}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-2 border-indigo-300 hover:border-indigo-500">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
