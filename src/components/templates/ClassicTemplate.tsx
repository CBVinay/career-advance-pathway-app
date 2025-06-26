
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

const ClassicTemplate = ({ data, isPreview = false }: { data: ResumeData; isPreview?: boolean }) => {
  const scale = isPreview ? 'scale-[0.3]' : 'scale-100';
  
  return (
    <div className={`bg-white ${scale} origin-top-left transition-transform duration-200`}>
      <div className="w-[210mm] min-h-[297mm] p-8 bg-white shadow-lg font-serif text-gray-900">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-4xl font-bold mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="text-gray-700 space-y-1">
            <p>{data.personalInfo.email || 'email@example.com'} | {data.personalInfo.phone || 'Phone'}</p>
            <p>{data.personalInfo.location || 'Location'}</p>
            {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
            {data.personalInfo.portfolio && <p>{data.personalInfo.portfolio}</p>}
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.some(exp => exp.company) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">Experience</h2>
            {data.experience.filter(exp => exp.company).map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <span className="text-gray-600 font-medium italic">{exp.duration}</span>
                </div>
                <p className="text-gray-800 font-medium mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700 leading-relaxed text-justify">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.some(edu => edu.institution) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">Education</h2>
            {data.education.filter(edu => edu.institution).map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-700 italic">{edu.institution}</p>
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
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">Skills</h2>
            <p className="text-gray-700 leading-relaxed">{data.skills.join(' • ')}</p>
          </div>
        )}

        {/* Projects */}
        {data.projects.some(proj => proj.name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">Projects</h2>
            {data.projects.filter(proj => proj.name).map((proj, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-lg">{proj.name}</h3>
                {proj.technologies && <p className="text-gray-600 italic text-sm mb-1">{proj.technologies}</p>}
                {proj.description && <p className="text-gray-700 leading-relaxed text-justify">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
