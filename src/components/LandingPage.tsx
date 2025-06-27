
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Brain, Users, BookOpen, Briefcase, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Career Guidance",
      description: "Intelligent recommendations based on your skills and career goals"
    },
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description: "Tailored courses and skills development for your chosen career"
    },
    {
      icon: BookOpen,
      title: "Smart Resume Optimization",
      description: "ATS-friendly resumes that get past filters and impress recruiters"
    },
    {
      icon: Users,
      title: "Real-World Interview Prep",
      description: "Practice with AI simulations and get feedback on performance"
    }
  ];

  const challenges = [
    "Not knowing which skills are relevant for a particular job",
    "Choosing the wrong courses or certifications", 
    "Lacking real interview experience",
    "Submitting generic resumes that don't get past ATS filters",
    "Missing feedback on body language or communication"
  ];

  const targetAudience = [
    "College Students",
    "Fresh Graduates", 
    "Job Seekers and Career Switchers",
    "University Career Cells",
    "EdTech Mentorship Platforms"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AccuratePath
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6 animate-fade-in">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-800 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <Star className="h-4 w-4" />
                <span>A Learning Path That Adapts to You</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-scale-in">
              The Right Skills.
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The Right Time.
              </span>
              <span className="block text-gray-900">The Right Path.</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in delay-300">
              AccuratePath is a personalized learning and career development platform that uses AI to analyze your learning needs, job descriptions, and career goals to recommend tailored paths for success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-in-right delay-500">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Learn More
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`text-center animate-fade-in group hover:transform hover:scale-105 transition-all duration-300`}
                  style={{ animationDelay: `${700 + index * 200}ms` }}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About AccuratePath</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                AccuratePath is designed by Accurate Info Solution to help students and graduates confidently navigate their career journey. With the power of AI, we analyze individual learning needs, job descriptions, and career goals to recommend tailored learning paths, industry-relevant courses, and real-time interview preparation tools.
              </p>
              <p className="text-lg text-gray-600">
                We believe no two learners are the same, and neither should their learning paths be. AccuratePath adapts to your skills, aspirations, and strengths to help you build a meaningful and competitive future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and intelligent platform that empowers every student to make informed, skill-driven, and goal-oriented career decisions through adaptive learning and real-time career insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <Briefcase className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
              </div>
              <p className="text-gray-600 mb-4">
                To bridge the gap between education and employability by offering:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Personalized learning recommendations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  AI-powered career guidance
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Smart resume optimization
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Real-world interview simulations
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Non-technical readiness assessments
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why AccuratePath */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why AccuratePath?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              The transition from education to employment is often overwhelming. Students face challenges like:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Challenges</h3>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Who Is It For?</h3>
              <ul className="space-y-3">
                {targetAudience.map((audience, index) => (
                  <li key={index} className="flex items-start text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">
              AccuratePath solves all of this by offering an AI-based, end-to-end personalized guidance system that adapts to every student's individual path.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              AccuratePath
            </h3>
            <p className="text-gray-400 mb-6">
              Empowering students with personalized learning paths and AI-driven career guidance.
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Accurate Info Solution. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
