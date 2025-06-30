
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

  // Template-specific styling
  const isModern = templateName === 'Modern Professional';
  const isCreative = templateName === 'Creative Designer';
  const isMinimal = templateName === 'Minimal Clean';

  // Header styling based on template
  if (isModern) {
    // Modern template with blue gradient header
    pdf.setFillColor(37, 99, 235); // Blue color
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', margin, 25);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location
    ].filter(Boolean).join(' | ');
    
    if (contactInfo) {
      pdf.text(contactInfo, margin, 35);
    }
    
    yPosition = 50;
    pdf.setTextColor(0, 0, 0); // Reset to black
  } else if (isCreative) {
    // Creative template with pink/orange styling
    pdf.setTextColor(236, 72, 153); // Pink color
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', margin, yPosition);
    yPosition += 15;

    pdf.setTextColor(0, 0, 0);
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
  } else {
    // Classic and Minimal templates
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
  }

  if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
    const links = [data.personalInfo.linkedin, data.personalInfo.portfolio]
      .filter(Boolean).join(' | ');
    pdf.text(links, margin, yPosition);
    yPosition += 15;
  }

  // Section header styling function
  const addSectionHeader = (title: string) => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    
    if (isModern) {
      pdf.setTextColor(37, 99, 235); // Blue
      pdf.text(title, margin, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(margin, yPosition + 2, margin + 40, yPosition + 2);
    } else if (isCreative) {
      pdf.setTextColor(236, 72, 153); // Pink
      pdf.text(title, margin, yPosition);
      pdf.setFillColor(236, 72, 153);
      pdf.rect(margin, yPosition + 2, 16, 1, 'F');
    } else if (isMinimal) {
      pdf.setTextColor(0, 0, 0);
      pdf.text(title, margin, yPosition);
      pdf.setFillColor(34, 197, 94); // Green
      pdf.rect(margin, yPosition + 2, 8, 1, 'F');
    } else {
      // Classic
      pdf.setTextColor(0, 0, 0);
      pdf.text(title, margin, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(0, 0, 0);
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
    }
    
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += 10;
  };

  // Professional Summary
  if (data.summary) {
    addSectionHeader('PROFESSIONAL SUMMARY');
    yPosition = addText(data.summary, margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Experience
  if (data.experience.some(exp => exp.company)) {
    addSectionHeader('EXPERIENCE');

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
      if (isModern || isCreative) {
        pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
      }
      pdf.text(exp.company, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
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
    addSectionHeader('EDUCATION');

    data.education.filter(edu => edu.institution).forEach(edu => {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, margin, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(edu.year, pageWidth - margin - 30, yPosition);
      yPosition += 8;

      pdf.setFont('helvetica', 'italic');
      if (isModern || isCreative) {
        pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
      }
      pdf.text(edu.institution, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
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

    addSectionHeader('SKILLS');
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

    addSectionHeader('PROJECTS');

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
        if (isModern || isCreative) {
          pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
        }
        pdf.text(proj.technologies, margin, yPosition);
        pdf.setTextColor(0, 0, 0);
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

    addSectionHeader('CERTIFICATES');

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
      if (isModern || isCreative) {
        pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
      }
      pdf.text(cert.issuer, margin, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 8;
    });
  }

  // Languages
  if (data.languages.some(lang => lang.name)) {
    if (yPosition > 240) {
      pdf.addPage();
      yPosition = margin;
    }

    addSectionHeader('LANGUAGES');
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

    addSectionHeader('INTERESTS');
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(data.interests.join(', '), margin, yPosition, pageWidth - 2 * margin);
    yPosition += 10;
  }

  // Declaration - Always show this section even if empty, with placeholder text
  if (yPosition > 200) {
    pdf.addPage();
    yPosition = margin;
  }

  addSectionHeader('DECLARATION');
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
  yPosition = addText(declarationText, margin, yPosition, pageWidth - 2 * margin);

  // Download the PDF
  const fileName = `${data.personalInfo.fullName || 'Resume'}_${templateName.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
};
