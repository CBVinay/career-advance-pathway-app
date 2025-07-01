import React from 'react';
import { Link } from 'react-router-dom';
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
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">Ready-to-Download Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your portfolio with our curated collection of projects. Each project comes with complete source code, 
            documentation, and step-by-step guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in group`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.level === 'Advanced' ? 'destructive' : project.level === 'Intermediate' ? 'default' : 'secondary'}
                    className="bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {project.level}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 group-hover:text-indigo-700 transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 relative z-10 group-hover:text-gray-700 transition-colors duration-300">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 hover:scale-105">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500 relative z-10">
                  <div className="flex items-center hover:text-indigo-600 transition-colors duration-300">
                    <Download className="h-4 w-4 mr-1" />
                    {project.downloads.toLocaleString()} downloads
                  </div>
                  <div className="flex items-center hover:text-yellow-600 transition-colors duration-300">
                    <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                    {project.rating}
                  </div>
                </div>
                
                <div className="flex gap-2 relative z-10">
                  <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 hover:scale-110">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:scale-110">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in delay-1000">
          <Link to="/projects">
            <Button variant="outline" size="lg" className="border-2 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              Explore All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
