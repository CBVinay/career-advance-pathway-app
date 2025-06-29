
import jsPDF from 'jspdf';

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

export const generateResumePDF = (data: ResumeData, templateName: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with line breaks
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.personalInfo.fullName || 'Your Name', margin, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location
  ].filter(Boolean).join(' | ');
  
  if (contactInfo) {
    pdf.text(contactInfo, margin, yPosition);
    yPosition += 8;
  }

  if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
    const links = [data.personalInfo.linkedin, data.personalInfo.portfolio]
      .filter(Boolean).join(' | ');
    pdf.text(links, margin, yPosition);
    yPosition += 15;
  }

  // Professional Summary
  if (data.summary) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROFESSIONAL SUMMARY', margin, yPosition);
    yPosition += 10;
    
    yPosition = addText(data.summary, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Experience
  if (data.experience.some(exp => exp.company)) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPERIENCE', margin, yPosition);
    yPosition += 10;

    data.experience.filter(exp => exp.company).forEach(exp => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(exp.position, margin, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(exp.duration, pageWidth - margin - 50, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text(exp.company, margin, yPosition);
      yPosition += 8;

      if (exp.description) {
        pdf.setFont('helvetica', 'normal');
        yPosition = addText(exp.description, margin, yPosition, pageWidth - 2 * margin);
      }
      yPosition += 8;
    });
  }

  // Education
  if (data.education.some(edu => edu.institution)) {
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EDUCATION', margin, yPosition);
    yPosition += 10;

    data.education.filter(edu => edu.institution).forEach(edu => {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(edu.year, pageWidth - margin - 30, yPosition);
      yPosition += 8;

      pdf.setFont('helvetica', 'italic');
      pdf.text(edu.institution, margin, yPosition);
      if (edu.gpa) {
        pdf.text(`GPA: ${edu.gpa}`, pageWidth - margin - 50, yPosition);
      }
      yPosition += 10;
    });
  }

  // Skills
  if (data.skills.length > 0) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SKILLS', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(data.skills.join(', '), margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Projects
  if (data.projects.some(proj => proj.name)) {
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROJECTS', margin, yPosition);
    yPosition += 10;

    data.projects.filter(proj => proj.name).forEach(proj => {
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(proj.name, margin, yPosition);
      yPosition += 8;

      if (proj.technologies) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text(proj.technologies, margin, yPosition);
        yPosition += 6;
      }

      if (proj.description) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        yPosition = addText(proj.description, margin, yPosition, pageWidth - 2 * margin);
      }
      yPosition += 8;
    });
  }

  // Certificates
  if (data.certificates.some(cert => cert.name)) {
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CERTIFICATES', margin, yPosition);
    yPosition += 10;

    data.certificates.filter(cert => cert.name).forEach(cert => {
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(cert.name, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(cert.date, pageWidth - margin - 50, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text(cert.issuer, margin, yPosition);
      yPosition += 8;
    });
  }

  // Languages
  if (data.languages.some(lang => lang.name)) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LANGUAGES', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const languageText = data.languages.filter(lang => lang.name).map(lang => `${lang.name} (${lang.proficiency})`).join(', ');
    yPosition = addText(languageText, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Interests
  if (data.interests.length > 0) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INTERESTS', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(data.interests.join(', '), margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Declaration
  if (data.declaration) {
    if (yPosition > 200) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DECLARATION', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(data.declaration, margin, yPosition, pageWidth - 2 * margin);
  }

  // Download the PDF
  const fileName = `${data.personalInfo.fullName || 'Resume'}_${templateName}.pdf`;
  pdf.save(fileName);
};
