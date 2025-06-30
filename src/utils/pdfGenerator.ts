
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
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper functions
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 11, align: 'left' | 'center' | 'right' = 'left') => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    
    if (align === 'center') {
      lines.forEach((line: string, index: number) => {
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, x - textWidth / 2, y + (index * fontSize * 0.4));
      });
    } else if (align === 'right') {
      lines.forEach((line: string, index: number) => {
        const textWidth = pdf.getTextWidth(line);
        pdf.text(line, x - textWidth, y + (index * fontSize * 0.4));
      });
    } else {
      pdf.text(lines, x, y);
    }
    
    return y + (lines.length * fontSize * 0.4);
  };

  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  const addSectionHeader = (title: string, x: number, color: number[] = [0, 0, 0]) => {
    checkPageBreak(25);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(title, x, yPosition);
    yPosition += 15;
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
  };

  // Template-specific generators
  if (templateName === 'Modern Professional') {
    generateModernPDF();
  } else if (templateName === 'Classic Executive') {
    generateClassicPDF();
  } else if (templateName === 'Creative Designer') {
    generateCreativePDF();
  } else if (templateName === 'Minimal Clean') {
    generateMinimalPDF();
  } else {
    generateModernPDF(); // Default
  }

  function generateModernPDF() {
    // Header with gradient background effect
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Name in white
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', 20, 30);
    
    // Contact info
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(191, 219, 254);
    const contactLine1 = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(' | ');
    pdf.text(contactLine1, 20, 42);
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const contactLine2 = [data.personalInfo.linkedin, data.personalInfo.portfolio].filter(Boolean).join(' | ');
      pdf.text(contactLine2, 20, 52);
    }
    
    yPosition = 75;
    pdf.setTextColor(0, 0, 0);

    // Professional Summary
    if (data.summary) {
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('PROFESSIONAL SUMMARY', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;
      
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      yPosition = addText(data.summary, 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Experience
    if (data.experience.some(exp => exp.company)) {
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('EXPERIENCE', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      data.experience.filter(exp => exp.company).forEach(exp => {
        checkPageBreak(50);
        
        // Position and duration
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const durationWidth = pdf.getTextWidth(exp.duration);
        pdf.text(exp.duration, pageWidth - 20 - durationWidth, yPosition);
        yPosition += 12;

        // Company
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(37, 99, 235);
        pdf.text(exp.company, 20, yPosition);
        yPosition += 10;

        // Description
        if (exp.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          yPosition = addText(exp.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 12;
      });
    }

    // Education
    if (data.education.some(edu => edu.institution)) {
      checkPageBreak(40);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('EDUCATION', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      data.education.filter(edu => edu.institution).forEach(edu => {
        checkPageBreak(25);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.degree, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, pageWidth - 20 - yearWidth, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setTextColor(37, 99, 235);
        pdf.text(edu.institution, 20, yPosition);
        
        if (edu.gpa) {
          const gpaText = `GPA: ${edu.gpa}`;
          const gpaWidth = pdf.getTextWidth(gpaText);
          pdf.setTextColor(0, 0, 0);
          pdf.text(gpaText, pageWidth - 20 - gpaWidth, yPosition);
        }
        yPosition += 15;
      });
    }

    // Skills
    if (data.skills.length > 0) {
      checkPageBreak(30);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('SKILLS', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      // Skills as pills simulation
      let currentX = 20;
      let currentY = yPosition;
      
      data.skills.forEach((skill, index) => {
        pdf.setFontSize(10);
        const skillWidth = pdf.getTextWidth(skill) + 12;
        
        if (currentX + skillWidth > pageWidth - 20) {
          currentX = 20;
          currentY += 20;
        }
        
        // Draw pill background
        pdf.setFillColor(219, 234, 254);
        pdf.roundedRect(currentX, currentY - 8, skillWidth, 14, 7, 7, 'F');
        
        // Draw skill text
        pdf.setTextColor(37, 99, 235);
        pdf.text(skill, currentX + 6, currentY);
        
        currentX += skillWidth + 8;
      });
      
      yPosition = currentY + 20;
    }

    // Add remaining sections
    addRemainingModernSections();
  }

  function generateClassicPDF() {
    // Centered header
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    yPosition = addText(data.personalInfo.fullName || 'Your Name', pageWidth/2, yPosition, pageWidth - 40, 22, 'center');
    
    // Underline
    pdf.setLineWidth(2);
    pdf.setDrawColor(0, 0, 0);
    pdf.line(20, yPosition + 5, pageWidth - 20, yPosition + 5);
    yPosition += 20;
    
    // Contact info centered
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(' | ');
    yPosition = addText(contactInfo, pageWidth/2, yPosition, pageWidth - 40, 11, 'center');
    yPosition += 8;
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const links = [data.personalInfo.linkedin, data.personalInfo.portfolio].filter(Boolean).join(' | ');
      yPosition = addText(links, pageWidth/2, yPosition, pageWidth - 40, 11, 'center');
    }
    yPosition += 20;

    // Sections with classic styling
    const classicSectionHeader = (title: string) => {
      checkPageBreak(25);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title.toUpperCase(), 20, yPosition);
      pdf.setLineWidth(2);
      pdf.line(20, yPosition + 3, pageWidth - 20, yPosition + 3);
      yPosition += 18;
      pdf.setFont('helvetica', 'normal');
    };

    // Professional Summary
    if (data.summary) {
      classicSectionHeader('Professional Summary');
      pdf.setFontSize(11);
      yPosition = addText(data.summary, 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Experience
    if (data.experience.some(exp => exp.company)) {
      classicSectionHeader('Experience');
      
      data.experience.filter(exp => exp.company).forEach(exp => {
        checkPageBreak(50);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position, 20, yPosition);
        
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(10);
        const durationWidth = pdf.getTextWidth(exp.duration);
        pdf.text(exp.duration, pageWidth - 20 - durationWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(exp.company, 20, yPosition);
        yPosition += 12;

        if (exp.description) {
          pdf.setFontSize(10);
          yPosition = addText(exp.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 15;
      });
    }

    // Add remaining classic sections
    addRemainingClassicSections(classicSectionHeader);
  }

  function generateCreativePDF() {
    // Two-column layout simulation
    const leftWidth = pageWidth * 0.35;
    const rightX = leftWidth + 10;
    const rightWidth = pageWidth - rightX - 20;

    // Left column background
    pdf.setFillColor(236, 72, 153);
    pdf.rect(0, 0, leftWidth, pageHeight, 'F');

    // Header in left column
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', 15, 30);
    
    // Contact info
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(252, 231, 243);
    let leftY = 50;
    
    [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location, data.personalInfo.linkedin, data.personalInfo.portfolio]
      .filter(Boolean).forEach(info => {
        pdf.text(info, 15, leftY);
        leftY += 12;
      });

    // Skills in left column
    if (data.skills.length > 0) {
      leftY += 20;
      pdf.setTextColor(254, 240, 138);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SKILLS', 15, leftY);
      leftY += 15;
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      data.skills.forEach(skill => {
        pdf.setFillColor(255, 255, 255, 0.2);
        pdf.roundedRect(15, leftY - 8, leftWidth - 25, 12, 6, 6, 'F');
        pdf.text(skill, 20, leftY);
        leftY += 18;
      });
    }

    // Education in left column
    if (data.education.some(edu => edu.institution)) {
      leftY += 20;
      pdf.setTextColor(254, 240, 138);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCATION', 15, leftY);
      leftY += 15;
      
      data.education.filter(edu => edu.institution).forEach(edu => {
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.degree, 15, leftY);
        leftY += 10;
        
        pdf.setTextColor(252, 231, 243);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.text(edu.institution, 15, leftY);
        leftY += 8;
        pdf.text(edu.year, 15, leftY);
        leftY += 15;
      });
    }

    // Right column content
    yPosition = 30;
    pdf.setTextColor(0, 0, 0);

    const creativeSectionHeader = (title: string) => {
      checkPageBreak(25);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(236, 72, 153);
      pdf.text(title, rightX, yPosition);
      pdf.setFillColor(236, 72, 153);
      pdf.rect(rightX, yPosition + 3, 25, 2, 'F');
      yPosition += 20;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
    };

    // Professional Summary
    if (data.summary) {
      creativeSectionHeader('ABOUT ME');
      pdf.setFontSize(11);
      yPosition = addText(data.summary, rightX, yPosition, rightWidth);
      yPosition += 15;
    }

    // Experience
    if (data.experience.some(exp => exp.company)) {
      creativeSectionHeader('EXPERIENCE');
      
      data.experience.filter(exp => exp.company).forEach(exp => {
        checkPageBreak(50);
        
        // Bullet point
        pdf.setFillColor(236, 72, 153);
        pdf.circle(rightX + 5, yPosition - 3, 2, 'F');
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(exp.position, rightX + 15, yPosition);
        
        // Duration in box
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        const durationWidth = pdf.getTextWidth(exp.duration);
        pdf.setFillColor(243, 244, 246);
        pdf.rect(rightX + rightWidth - durationWidth - 12, yPosition - 8, durationWidth + 10, 12, 'F');
        pdf.text(exp.duration, rightX + rightWidth - durationWidth - 7, yPosition);
        yPosition += 12;

        pdf.setFontSize(11);
        pdf.setTextColor(236, 72, 153);
        pdf.text(exp.company, rightX + 15, yPosition);
        yPosition += 10;

        if (exp.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          yPosition = addText(exp.description, rightX + 15, yPosition, rightWidth - 15);
        }
        yPosition += 15;
      });
    }

    // Add remaining creative sections
    addRemainingCreativeSections(creativeSectionHeader, rightX, rightWidth);
  }

  function generateMinimalPDF() {
    // Large thin name
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'thin');
    pdf.setTextColor(17, 24, 39);
    pdf.text(data.personalInfo.fullName || 'Your Name', 20, yPosition);
    yPosition += 25;
    
    // Contact info with dots
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(107, 114, 128);
    const contactInfo = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean).join(' • ');
    pdf.text(contactInfo, 20, yPosition);
    yPosition += 12;
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const links = [data.personalInfo.linkedin, data.personalInfo.portfolio].filter(Boolean).join(' • ');
      pdf.text(links, 20, yPosition);
    }
    yPosition += 25;
    pdf.setTextColor(0, 0, 0);

    const minimalSectionHeader = (title: string) => {
      checkPageBreak(25);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'medium');
      pdf.setTextColor(17, 24, 39);
      pdf.text(title.toUpperCase(), 20, yPosition);
      pdf.setFillColor(34, 197, 94);
      pdf.rect(20, yPosition + 3, 12, 1, 'F');
      yPosition += 20;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'thin');
    };

    // Professional Summary
    if (data.summary) {
      minimalSectionHeader('Summary');
      pdf.setFontSize(11);
      yPosition = addText(data.summary, 20, yPosition, pageWidth - 40);
      yPosition += 20;
    }

    // Experience
    if (data.experience.some(exp => exp.company)) {
      minimalSectionHeader('Experience');
      
      data.experience.filter(exp => exp.company).forEach(exp => {
        checkPageBreak(50);
        
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'thin');
        pdf.text(exp.position, 20, yPosition);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const durationWidth = pdf.getTextWidth(exp.duration);
        pdf.text(exp.duration, pageWidth - 20 - durationWidth, yPosition);
        yPosition += 15;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'thin');
        pdf.setTextColor(34, 197, 94);
        pdf.text(exp.company, 20, yPosition);
        yPosition += 12;

        if (exp.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(11);
          yPosition = addText(exp.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 20;
      });
    }

    // Add remaining minimal sections
    addRemainingMinimalSections(minimalSectionHeader);
  }

  // Helper functions for remaining sections
  function addRemainingModernSections() {
    // Projects
    if (data.projects.some(proj => proj.name)) {
      checkPageBreak(40);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('PROJECTS', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      data.projects.filter(proj => proj.name).forEach(proj => {
        checkPageBreak(35);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(proj.name, 20, yPosition);
        yPosition += 12;

        if (proj.technologies) {
          pdf.setFontSize(10);
          pdf.setTextColor(37, 99, 235);
          pdf.setFont('helvetica', 'italic');
          pdf.text(proj.technologies, 20, yPosition);
          yPosition += 10;
        }

        if (proj.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          yPosition = addText(proj.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 15;
      });
    }

    // Certificates
    if (data.certificates && data.certificates.some(cert => cert.name)) {
      checkPageBreak(30);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('CERTIFICATES', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      data.certificates.filter(cert => cert.name).forEach(cert => {
        checkPageBreak(25);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cert.name, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const dateWidth = pdf.getTextWidth(cert.date);
        pdf.text(cert.date, pageWidth - 20 - dateWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(11);
        pdf.setTextColor(37, 99, 235);
        pdf.text(cert.issuer, 20, yPosition);
        yPosition += 15;
      });
    }

    // Languages
    if (data.languages && data.languages.some(lang => lang.name)) {
      checkPageBreak(20);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('LANGUAGES', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const languageText = data.languages.filter(lang => lang.name)
        .map(lang => `${lang.name} (${lang.proficiency})`)
        .join(' • ');
      yPosition = addText(languageText, 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Interests
    if (data.interests.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(37, 99, 235);
      pdf.text('INTERESTS', 20, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(20, yPosition + 3, 80, yPosition + 3);
      yPosition += 15;

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPosition = addText(data.interests.join(' • '), 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Declaration
    checkPageBreak(30);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text('DECLARATION', 20, yPosition);
    pdf.setLineWidth(2);
    pdf.setDrawColor(37, 99, 235);
    pdf.line(20, yPosition + 3, 80, yPosition + 3);
    yPosition += 15;

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
    yPosition = addText(declarationText, 20, yPosition, pageWidth - 40);
  }

  function addRemainingClassicSections(sectionHeader: (title: string) => void) {
    // Education
    if (data.education.some(edu => edu.institution)) {
      sectionHeader('Education');
      
      data.education.filter(edu => edu.institution).forEach(edu => {
        checkPageBreak(25);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.degree, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, pageWidth - 20 - yearWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'italic');
        pdf.text(edu.institution, 20, yPosition);
        
        if (edu.gpa) {
          const gpaText = `GPA: ${edu.gpa}`;
          const gpaWidth = pdf.getTextWidth(gpaText);
          pdf.text(gpaText, pageWidth - 20 - gpaWidth, yPosition);
        }
        yPosition += 18;
      });
    }

    // Skills
    if (data.skills.length > 0) {
      sectionHeader('Skills');
      pdf.setFontSize(11);
      yPosition = addText(data.skills.join(' • '), 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Projects
    if (data.projects.some(proj => proj.name)) {
      sectionHeader('Projects');
      
      data.projects.filter(proj => proj.name).forEach(proj => {
        checkPageBreak(35);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(proj.name, 20, yPosition);
        yPosition += 12;

        if (proj.technologies) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.text(proj.technologies, 20, yPosition);
          yPosition += 10;
        }

        if (proj.description) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          yPosition = addText(proj.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 15;
      });
    }

    // Certificates
    if (data.certificates && data.certificates.some(cert => cert.name)) {
      sectionHeader('Certificates');
      
      data.certificates.filter(cert => cert.name).forEach(cert => {
        checkPageBreak(25);
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cert.name, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        const dateWidth = pdf.getTextWidth(cert.date);
        pdf.text(cert.date, pageWidth - 20 - dateWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'italic');
        pdf.text(cert.issuer, 20, yPosition);
        yPosition += 15;
      });
    }

    // Languages
    if (data.languages && data.languages.some(lang => lang.name)) {
      sectionHeader('Languages');
      pdf.setFontSize(11);
      const languageText = data.languages.filter(lang => lang.name)
        .map(lang => `${lang.name} (${lang.proficiency})`)
        .join(' • ');
      yPosition = addText(languageText, 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Interests
    if (data.interests.length > 0) {
      sectionHeader('Interests');
      pdf.setFontSize(11);
      yPosition = addText(data.interests.join(' • '), 20, yPosition, pageWidth - 40);
      yPosition += 15;
    }

    // Declaration
    sectionHeader('Declaration');
    pdf.setFontSize(11);
    const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
    yPosition = addText(declarationText, 20, yPosition, pageWidth - 40);
  }

  function addRemainingCreativeSections(sectionHeader: (title: string) => void, rightX: number, rightWidth: number) {
    // Projects
    if (data.projects.some(proj => proj.name)) {
      sectionHeader('PROJECTS');
      
      data.projects.filter(proj => proj.name).forEach(proj => {
        checkPageBreak(40);
        
        // Project card background
        pdf.setFillColor(249, 250, 251);
        pdf.rect(rightX, yPosition - 10, rightWidth, 35, 'F');
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(proj.name, rightX + 10, yPosition);
        yPosition += 12;

        if (proj.technologies) {
          pdf.setFontSize(10);
          pdf.setTextColor(236, 72, 153);
          pdf.setFont('helvetica', 'normal');
          pdf.text(proj.technologies, rightX + 10, yPosition);
          yPosition += 10;
        }

        if (proj.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(9);
          yPosition = addText(proj.description, rightX + 10, yPosition, rightWidth - 20);
        }
        yPosition += 20;
      });
    }

    // Certificates
    if (data.certificates && data.certificates.some(cert => cert.name)) {
      sectionHeader('CERTIFICATES');
      
      data.certificates.filter(cert => cert.name).forEach(cert => {
        checkPageBreak(30);
        
        // Certificate card background
        pdf.setFillColor(249, 250, 251);
        pdf.rect(rightX, yPosition - 10, rightWidth, 25, 'F');
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cert.name, rightX + 10, yPosition);
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setTextColor(236, 72, 153);
        pdf.text(cert.issuer, rightX + 10, yPosition);
        yPosition += 8;

        pdf.setTextColor(107, 114, 128);
        pdf.text(cert.date, rightX + 10, yPosition);
        yPosition += 15;
      });
    }

    // Declaration
    sectionHeader('DECLARATION');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
    yPosition = addText(declarationText, rightX, yPosition, rightWidth);
  }

  function addRemainingMinimalSections(sectionHeader: (title: string) => void) {
    // Education
    if (data.education.some(edu => edu.institution)) {
      sectionHeader('Education');
      
      data.education.filter(edu => edu.institution).forEach(edu => {
        checkPageBreak(25);
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'thin');
        pdf.text(edu.degree, 20, yPosition);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const yearWidth = pdf.getTextWidth(edu.year);
        pdf.text(edu.year, pageWidth - 20 - yearWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'thin');
        pdf.setTextColor(34, 197, 94);
        pdf.text(edu.institution, 20, yPosition);
        
        if (edu.gpa) {
          pdf.setTextColor(107, 114, 128);
          const gpaText = `GPA: ${edu.gpa}`;
          const gpaWidth = pdf.getTextWidth(gpaText);
          pdf.text(gpaText, pageWidth - 20 - gpaWidth, yPosition);
        }
        yPosition += 20;
        pdf.setTextColor(0, 0, 0);
      });
    }

    // Skills
    if (data.skills.length > 0) {
      sectionHeader('Skills');
      pdf.setFontSize(11);
      yPosition = addText(data.skills.join('  •  '), 20, yPosition, pageWidth - 40);
      yPosition += 20;
    }

    // Projects
    if (data.projects.some(proj => proj.name)) {
      sectionHeader('Projects');
      
      data.projects.filter(proj => proj.name).forEach(proj => {
        checkPageBreak(35);
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'thin');
        pdf.text(proj.name, 20, yPosition);
        yPosition += 12;

        if (proj.technologies) {
          pdf.setFontSize(10);
          pdf.setTextColor(34, 197, 94);
          pdf.text(proj.technologies, 20, yPosition);
          yPosition += 10;
        }

        if (proj.description) {
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(11);
          yPosition = addText(proj.description, 20, yPosition, pageWidth - 40);
        }
        yPosition += 20;
      });
    }

    // Certificates
    if (data.certificates && data.certificates.some(cert => cert.name)) {
      sectionHeader('Certificates');
      
      data.certificates.filter(cert => cert.name).forEach(cert => {
        checkPageBreak(25);
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'thin');
        pdf.text(cert.name, 20, yPosition);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const dateWidth = pdf.getTextWidth(cert.date);
        pdf.text(cert.date, pageWidth - 20 - dateWidth, yPosition);
        yPosition += 12;

        pdf.setFontSize(12);
        pdf.setTextColor(34, 197, 94);
        pdf.text(cert.issuer, 20, yPosition);
        yPosition += 20;
        pdf.setTextColor(0, 0, 0);
      });
    }

    // Languages
    if (data.languages && data.languages.some(lang => lang.name)) {
      sectionHeader('Languages');
      pdf.setFontSize(11);
      const languageText = data.languages.filter(lang => lang.name)
        .map(lang => `${lang.name} (${lang.proficiency})`)
        .join('  •  ');
      yPosition = addText(languageText, 20, yPosition, pageWidth - 40);
      yPosition += 20;
    }

    // Interests
    if (data.interests.length > 0) {
      sectionHeader('Interests');
      pdf.setFontSize(11);
      yPosition = addText(data.interests.join('  •  '), 20, yPosition, pageWidth - 40);
      yPosition += 20;
    }

    // Declaration
    sectionHeader('Declaration');
    pdf.setFontSize(11);
    const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
    yPosition = addText(declarationText, 20, yPosition, pageWidth - 40);
  }

  // Download the PDF
  const fileName = `${data.personalInfo.fullName || 'Resume'}_${templateName.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
};
