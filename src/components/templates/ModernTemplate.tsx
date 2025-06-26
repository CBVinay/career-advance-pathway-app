
import React from 'react';

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

const ModernTemplate = ({ data, isPreview = false }: { data: ResumeData; isPreview?: boolean }) => {
  const scale = isPreview ? 'scale-[0.3]' : 'scale-100';
  
  return (
    <div className={`bg-white ${scale} origin-top-left transition-transform duration-200`}>
      <div className="w-[210mm] min-h-[297mm] p-8 bg-white shadow-lg font-sans text-gray-800">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="text-blue-100 space-y-1">
            <p>{data.personalInfo.email || 'email@example.com'} | {data.personalInfo.phone || 'Phone'}</p>
            <p>{data.personalInfo.location || 'Location'}</p>
            {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
            {data.personalInfo.portfolio && <p>{data.personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">EXPERIENCE</h2>
            {data.experience.filter(exp => exp.company).map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <span className="text-gray-600 font-medium">{exp.duration}</span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.some(edu => edu.institution) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">EDUCATION</h2>
            {data.education.filter(edu => edu.institution).map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{edu.year}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.some(proj => proj.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">PROJECTS</h2>
            {data.projects.filter(proj => proj.name).map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">{proj.name}</h3>
                {proj.technologies && <p className="text-blue-600 text-sm mb-1">{proj.technologies}</p>}
                {proj.description && <p className="text-gray-700 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
