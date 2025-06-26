
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Eye, FileText, Sparkles } from 'lucide-react';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech roles',
    color: 'bg-gradient-to-br from-blue-500 to-purple-600'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional layout ideal for corporate positions',
    color: 'bg-gradient-to-br from-gray-700 to-gray-900'
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and artistic layout for creative professionals',
    color: 'bg-gradient-to-br from-pink-500 to-orange-500'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant design that highlights content',
    color: 'bg-gradient-to-br from-green-500 to-teal-600'
  }
];

const ResumeBuilderPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '', gpa: '' }],
    skills: [],
    projects: [{ name: '', description: '', technologies: '' }]
  });
  const [activeTab, setActiveTab] = useState('template');

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', gpa: '' }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '' }]
    }));
  };

  const updateProject = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const updateSkills = (skillsText: string) => {
    const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Resume Builder</h1>
          <p className="text-gray-600">Create a professional resume in minutes with our smart templates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Builder Panel */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="template" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedTemplate === template.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className={`h-32 ${template.color} rounded-lg mb-3 flex items-center justify-center`}>
                            <FileText className="h-12 w-12 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio</Label>
                        <Input
                          id="portfolio"
                          value={resumeData.personalInfo.portfolio}
                          onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                          placeholder="johndoe.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Write a brief professional summary..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Experience Section */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Work Experience</CardTitle>
                      <Button onClick={addExperience} size="sm">Add Experience</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="Company Name"
                            />
                          </div>
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                            placeholder="Jan 2023 - Present"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Education Section */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Education</CardTitle>
                      <Button onClick={addEducation} size="sm">Add Education</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                              placeholder="University Name"
                            />
                          </div>
                          <div>
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div>
                            <Label>Year</Label>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              placeholder="2024"
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa || ''}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              placeholder="3.8"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label>Skills (comma-separated)</Label>
                    <Textarea
                      value={resumeData.skills.join(', ')}
                      onChange={(e) => updateSkills(e.target.value)}
                      placeholder="JavaScript, React, Node.js, Python, SQL"
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Projects Section */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Projects</CardTitle>
                      <Button onClick={addProject} size="sm">Add Project</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((proj, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div>
                          <Label>Project Name</Label>
                          <Input
                            value={proj.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                            placeholder="Project Name"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={proj.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder="Describe your project..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Technologies</Label>
                          <Input
                            value={proj.technologies}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review">
                <Card>
                  <CardHeader>
                    <CardTitle>Review & Download</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-green-800">Resume Score: 95%</p>
                            <p className="text-sm text-green-600">Excellent! Your resume is optimized for ATS systems.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button size="lg" className="flex-1">
                          <Download className="h-5 w-5 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="lg">
                          <Eye className="h-5 w-5 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-h-96">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{resumeData.personalInfo.fullName || 'Your Name'}</h3>
                      <p className="text-sm text-gray-600">
                        {resumeData.personalInfo.email || 'email@example.com'} | {resumeData.personalInfo.phone || 'Phone'}
                      </p>
                      <p className="text-sm text-gray-600">{resumeData.personalInfo.location || 'Location'}</p>
                    </div>
                    
                    {resumeData.summary && (
                      <div>
                        <h4 className="font-semibold text-sm border-b border-gray-300 pb-1">SUMMARY</h4>
                        <p className="text-xs mt-2">{resumeData.summary}</p>
                      </div>
                    )}
                    
                    {resumeData.experience.some(exp => exp.company) && (
                      <div>
                        <h4 className="font-semibold text-sm border-b border-gray-300 pb-1">EXPERIENCE</h4>
                        {resumeData.experience.filter(exp => exp.company).map((exp, index) => (
                          <div key={index} className="mt-2">
                            <p className="text-xs font-medium">{exp.position}</p>
                            <p className="text-xs text-gray-600">{exp.company} | {exp.duration}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm border-b border-gray-300 pb-1">SKILLS</h4>
                        <p className="text-xs mt-2">{resumeData.skills.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
