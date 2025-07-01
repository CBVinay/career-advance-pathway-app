
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, MessageCircle, Search, Filter, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AllMentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Martinez',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      expertise: ['JavaScript', 'React', 'System Design', 'Career Development'],
      rating: 4.9,
      reviewCount: 127,
      price: '$80/hour',
      availability: 'Available',
      bio: 'With 10+ years in tech, I help junior developers advance their careers and master modern web technologies.',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Alex Thompson',
      title: 'Data Science Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      expertise: ['Python', 'Machine Learning', 'Data Analysis', 'Leadership'],
      rating: 4.8,
      reviewCount: 89,
      price: '$75/hour',
      availability: 'Available',
      bio: 'I mentor aspiring data scientists and help them transition from academia to industry.',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      title: 'UX Design Director',
      company: 'Adobe',
      location: 'San Francisco, CA',
      expertise: ['UI/UX Design', 'Product Strategy', 'Design Systems', 'User Research'],
      rating: 4.9,
      reviewCount: 156,
      price: '$90/hour',
      availability: 'Busy',
      bio: 'I help designers at all levels create impactful user experiences and advance their design careers.',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'David Chen',
      title: 'DevOps Engineer',
      company: 'Amazon',
      location: 'Austin, TX',
      expertise: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      rating: 4.7,
      reviewCount: 73,
      price: '$70/hour',
      availability: 'Available',
      bio: 'I specialize in cloud infrastructure and help teams implement efficient DevOps practices.',
      avatar: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Jennifer Kim',
      title: 'Product Manager',
      company: 'Meta',
      location: 'Menlo Park, CA',
      expertise: ['Product Management', 'Strategy', 'Analytics', 'Agile'],
      rating: 4.8,
      reviewCount: 112,
      price: '$85/hour',
      availability: 'Available',
      bio: 'I mentor product managers and help them build products that users love.',
      avatar: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Robert Johnson',
      title: 'Cybersecurity Specialist',
      company: 'Cisco',
      location: 'Remote',
      expertise: ['Cybersecurity', 'Penetration Testing', 'Risk Assessment', 'Compliance'],
      rating: 4.9,
      reviewCount: 94,
      price: '$95/hour',
      availability: 'Available',
      bio: 'I help professionals enter the cybersecurity field and advance their security expertise.',
      avatar: '/placeholder.svg'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Mentors' },
    { key: 'available', label: 'Available Now' },
    { key: 'software-engineering', label: 'Software Engineering' },
    { key: 'data-science', label: 'Data Science' },
    { key: 'design', label: 'Design' },
    { key: 'product', label: 'Product Management' },
    { key: 'devops', label: 'DevOps' }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (selectedFilter === 'available') {
      matchesFilter = mentor.availability === 'Available';
    } else if (selectedFilter !== 'all') {
      const filterMap = {
        'software-engineering': ['JavaScript', 'React', 'System Design'],
        'data-science': ['Python', 'Machine Learning', 'Data Analysis'],
        'design': ['UI/UX Design', 'Product Strategy', 'Design Systems'],
        'product': ['Product Management', 'Strategy', 'Analytics'],
        'devops': ['AWS', 'Docker', 'Kubernetes']
      };
      matchesFilter = mentor.expertise.some(skill => 
        filterMap[selectedFilter]?.some(filterSkill => 
          skill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-lg text-gray-600">Connect with industry experts who can guide your career journey</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search mentors by name, expertise, or company..."
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

        {/* Mentor Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-sm text-blue-600 font-medium">{mentor.company}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-gray-500">({mentor.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {mentor.location}
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={mentor.availability === 'Available' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {mentor.availability}
                    </Badge>
                    {mentor.expertise.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{mentor.expertise.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-gray-900">{mentor.price}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Session
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mentors found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllMentors;
