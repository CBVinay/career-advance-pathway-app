
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import { generateResumePDF } from '@/utils/pdfGenerator';

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
  certificates: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  interests: string[];
  declaration: string;
}

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  templateId: string;
}

const templates = {
  modern: { component: ModernTemplate, name: 'Modern Professional' },
  classic: { component: ClassicTemplate, name: 'Classic Executive' },
  creative: { component: CreativeTemplate, name: 'Creative Designer' },
  minimal: { component: MinimalTemplate, name: 'Minimal Clean' }
};

const ResumePreviewModal = ({ isOpen, onClose, data, templateId }: ResumePreviewModalProps) => {
  const selectedTemplate = templates[templateId as keyof typeof templates] || templates.modern;
  const TemplateComponent = selectedTemplate.component;

  const handleDownloadPDF = () => {
    generateResumePDF(data, selectedTemplate.name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Resume Preview - {selectedTemplate.name}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button onClick={handleDownloadPDF} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
              <TemplateComponent data={data} isPreview={false} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;
