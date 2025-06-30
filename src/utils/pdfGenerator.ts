
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
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with line breaks
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4);
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Template-specific styling
  const isModern = templateName === 'Modern Professional';
  const isCreative = templateName === 'Creative Designer';
  const isMinimal = templateName === 'Minimal Clean';
  const isClassic = templateName === 'Classic Executive';

  // MODERN TEMPLATE STYLING
  if (isModern) {
    // Blue gradient header background
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, pageWidth, 50, 'F');
    
    // Name in white
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', margin, 30);
    
    // Contact info in light blue
    pdf.setTextColor(191, 219, 254);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location
    ].filter(Boolean).join(' | ');
    pdf.text(contactInfo, margin, 40);
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const links = [data.personalInfo.linkedin, data.personalInfo.portfolio]
        .filter(Boolean).join(' | ');
      pdf.text(links, margin, 46);
    }
    
    yPosition = 65;
    pdf.setTextColor(0, 0, 0);
  }

  // CREATIVE TEMPLATE STYLING (Two-column layout simulation)
  else if (isCreative) {
    // Header with pink gradient effect
    pdf.setFillColor(236, 72, 153);
    pdf.rect(0, 0, pageWidth * 0.35, pageHeight, 'F');
    
    // Name in white on pink background
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', 15, 30);
    
    // Contact info in light pink
    pdf.setTextColor(252, 231, 243);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    let leftYPos = 45;
    
    [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
      .filter(Boolean).forEach(info => {
        pdf.text(info, 15, leftYPos);
        leftYPos += 8;
      });
    
    if (data.personalInfo.linkedin) {
      pdf.text(data.personalInfo.linkedin, 15, leftYPos);
      leftYPos += 8;
    }
    if (data.personalInfo.portfolio) {
      pdf.text(data.personalInfo.portfolio, 15, leftYPos);
      leftYPos += 8;
    }
    
    // Skills section on left
    if (data.skills.length > 0) {
      leftYPos += 10;
      pdf.setTextColor(254, 240, 138);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SKILLS', 15, leftYPos);
      leftYPos += 10;
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      data.skills.forEach(skill => {
        pdf.setFillColor(255, 255, 255, 0.2);
        pdf.text(skill, 15, leftYPos);
        leftYPos += 8;
      });
    }
    
    // Education on left
    if (data.education.some(edu => edu.institution)) {
      leftYPos += 10;
      pdf.setTextColor(254, 240, 138);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('EDUCATION', 15, leftYPos);
      leftYPos += 10;
      
      data.education.filter(edu => edu.institution).forEach(edu => {
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(edu.degree, 15, leftYPos);
        leftYPos += 6;
        
        pdf.setTextColor(252, 231, 243);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(edu.institution, 15, leftYPos);
        leftYPos += 5;
        pdf.text(edu.year, 15, leftYPos);
        leftYPos += 10;
      });
    }
    
    // Right column content starts here
    yPosition = 30;
    const rightColumnX = pageWidth * 0.4;
    pdf.setTextColor(0, 0, 0);
  }

  // MINIMAL TEMPLATE STYLING
  else if (isMinimal) {
    // Large thin name
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'thin');
    pdf.setTextColor(17, 24, 39);
    pdf.text(data.personalInfo.fullName || 'Your Name', margin, yPosition);
    yPosition += 20;
    
    // Contact info with dots
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(107, 114, 128);
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location
    ].filter(Boolean).join(' • ');
    pdf.text(contactInfo, margin, yPosition);
    yPosition += 8;
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const links = [data.personalInfo.linkedin, data.personalInfo.portfolio]
        .filter(Boolean).join(' • ');
      pdf.text(links, margin, yPosition);
    }
    
    yPosition += 20;
    pdf.setTextColor(0, 0, 0);
  }

  // CLASSIC TEMPLATE STYLING
  else {
    // Centered name with underline
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(data.personalInfo.fullName || 'Your Name', pageWidth/2, yPosition, { align: 'center' });
    
    // Underline
    pdf.setLineWidth(2);
    pdf.setDrawColor(0, 0, 0);
    pdf.line(margin, yPosition + 5, pageWidth - margin, yPosition + 5);
    yPosition += 20;
    
    // Centered contact info
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location
    ].filter(Boolean).join(' | ');
    pdf.text(contactInfo, pageWidth/2, yPosition, { align: 'center' });
    yPosition += 8;
    
    if (data.personalInfo.linkedin || data.personalInfo.portfolio) {
      const links = [data.personalInfo.linkedin, data.personalInfo.portfolio]
        .filter(Boolean).join(' | ');
      pdf.text(links, pageWidth/2, yPosition, { align: 'center' });
    }
    
    yPosition += 15;
  }

  // Section header styling function
  const addSectionHeader = (title: string, x: number = margin) => {
    checkPageBreak(20);
    
    pdf.setFontSize(isMinimal ? 9 : 14);
    pdf.setFont('helvetica', 'bold');
    
    if (isModern) {
      pdf.setTextColor(37, 99, 235);
      pdf.text(title, x, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.line(x, yPosition + 2, x + 40, yPosition + 2);
    } else if (isCreative) {
      pdf.setTextColor(236, 72, 153);
      pdf.text(title, x, yPosition);
      pdf.setFillColor(236, 72, 153);
      pdf.rect(x, yPosition + 2, 16, 1, 'F');
    } else if (isMinimal) {
      pdf.setTextColor(17, 24, 39);
      pdf.text(title.toUpperCase(), x, yPosition);
      pdf.setFillColor(34, 197, 94);
      pdf.rect(x, yPosition + 2, 8, 1, 'F');
    } else {
      pdf.setTextColor(0, 0, 0);
      pdf.text(title.toUpperCase(), x, yPosition);
      pdf.setLineWidth(2);
      pdf.setDrawColor(0, 0, 0);
      pdf.line(x, yPosition + 2, pageWidth - margin, yPosition + 2);
    }
    
    pdf.setTextColor(0, 0, 0);
    yPosition += isMinimal ? 8 : 12;
  };

  const contentX = isCreative ? pageWidth * 0.4 : margin;
  const contentWidth = isCreative ? pageWidth * 0.55 : pageWidth - 2 * margin;

  // Professional Summary
  if (data.summary) {
    addSectionHeader(isCreative ? 'ABOUT ME' : 'PROFESSIONAL SUMMARY', contentX);
    
    if (isMinimal) {
      // Add green line for minimal
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }
    
    pdf.setFontSize(isMinimal ? 9 : 10);
    pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
    yPosition = addText(data.summary, contentX, yPosition, contentWidth);
    yPosition += 10;
  }

  // Experience
  if (data.experience.some(exp => exp.company)) {
    addSectionHeader('EXPERIENCE', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    data.experience.filter(exp => exp.company).forEach(exp => {
      checkPageBreak(40);

      // Position title and duration
      pdf.setFontSize(isMinimal ? 14 : 12);
      pdf.setFont('helvetica', isMinimal ? 'thin' : 'bold');
      pdf.text(exp.position, contentX, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      const durationText = isCreative ? exp.duration : exp.duration;
      if (isCreative) {
        // Creative template duration in a box
        pdf.setFillColor(243, 244, 246);
        const textWidth = pdf.getTextWidth(durationText);
        pdf.rect(contentX + contentWidth - textWidth - 8, yPosition - 6, textWidth + 6, 10, 'F');
      }
      pdf.text(durationText, contentX + contentWidth - pdf.getTextWidth(durationText), yPosition);
      yPosition += 8;

      // Company name
      pdf.setFontSize(10);
      pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
      if (isModern || isCreative) {
        pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
      } else if (isMinimal) {
        pdf.setTextColor(34, 197, 94);
      }
      pdf.text(exp.company, contentX, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 8;

      // Description
      if (exp.description) {
        pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
        yPosition = addText(exp.description, contentX, yPosition, contentWidth, isCreative ? 9 : 10);
      }
      yPosition += 10;
    });
  }

  // Skip Education for Creative template as it's already on the left
  if (!isCreative && data.education.some(edu => edu.institution)) {
    addSectionHeader('EDUCATION', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    data.education.filter(edu => edu.institution).forEach(edu => {
      checkPageBreak(25);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, contentX, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(edu.year, contentX + contentWidth - pdf.getTextWidth(edu.year), yPosition);
      yPosition += 8;

      pdf.setFont('helvetica', isMinimal ? 'thin' : 'italic');
      if (isModern) {
        pdf.setTextColor(37, 99, 235);
      } else if (isMinimal) {
        pdf.setTextColor(34, 197, 94);
      }
      pdf.text(edu.institution, contentX, yPosition);
      pdf.setTextColor(0, 0, 0);
      
      if (edu.gpa) {
        pdf.text(`GPA: ${edu.gpa}`, contentX + contentWidth - pdf.getTextWidth(`GPA: ${edu.gpa}`), yPosition);
      }
      yPosition += 12;
    });
  }

  // Skills (skip for Creative as it's on the left)
  if (!isCreative && data.skills.length > 0) {
    checkPageBreak(30);
    addSectionHeader('SKILLS', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
    
    if (isModern) {
      // Modern template shows skills as badges - simulate with text
      const skillText = data.skills.join(' • ');
      yPosition = addText(skillText, contentX, yPosition, contentWidth);
    } else {
      const separator = isMinimal ? '  •  ' : ', ';
      yPosition = addText(data.skills.join(separator), contentX, yPosition, contentWidth);
    }
    yPosition += 10;
  }

  // Projects
  if (data.projects.some(proj => proj.name)) {
    checkPageBreak(40);
    addSectionHeader('PROJECTS', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    data.projects.filter(proj => proj.name).forEach(proj => {
      checkPageBreak(30);

      pdf.setFontSize(isMinimal ? 12 : 11);
      pdf.setFont('helvetica', isMinimal ? 'thin' : 'bold');
      pdf.text(proj.name, contentX, yPosition);
      yPosition += 8;

      if (proj.technologies) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', isMinimal ? 'thin' : 'italic');
        if (isModern || isCreative) {
          pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
        } else if (isMinimal) {
          pdf.setTextColor(34, 197, 94);
        }
        pdf.text(proj.technologies, contentX, yPosition);
        pdf.setTextColor(0, 0, 0);
        yPosition += 6;
      }

      if (proj.description) {
        pdf.setFontSize(isCreative ? 9 : 10);
        pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
        yPosition = addText(proj.description, contentX, yPosition, contentWidth);
      }
      yPosition += 8;
    });
  }

  // Certificates
  if (data.certificates.some(cert => cert.name)) {
    checkPageBreak(30);
    addSectionHeader('CERTIFICATES', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    data.certificates.filter(cert => cert.name).forEach(cert => {
      checkPageBreak(25);

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(cert.name, contentX, yPosition);
      pdf.setFont('helvetica', 'normal');
      pdf.text(cert.date, contentX + contentWidth - pdf.getTextWidth(cert.date), yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', isMinimal ? 'thin' : 'italic');
      if (isModern || isCreative) {
        pdf.setTextColor(isModern ? 37 : 236, isModern ? 99 : 72, isModern ? 235 : 153);
      } else if (isMinimal) {
        pdf.setTextColor(34, 197, 94);
      }
      pdf.text(cert.issuer, contentX, yPosition);
      pdf.setTextColor(0, 0, 0);
      yPosition += 10;
    });
  }

  // Languages
  if (data.languages.some(lang => lang.name)) {
    checkPageBreak(20);
    addSectionHeader('LANGUAGES', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
    const languageText = data.languages.filter(lang => lang.name)
      .map(lang => `${lang.name} (${lang.proficiency})`)
      .join(isModern ? ' • ' : isMinimal ? '  •  ' : ', ');
    yPosition = addText(languageText, contentX, yPosition, contentWidth);
    yPosition += 10;
  }

  // Interests
  if (data.interests.length > 0) {
    checkPageBreak(20);
    addSectionHeader('INTERESTS', contentX);
    
    if (isMinimal) {
      pdf.setFillColor(34, 197, 94);
      pdf.rect(contentX, yPosition, 8, 0.5, 'F');
      yPosition += 8;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
    const separator = isModern ? ' • ' : isMinimal ? '  •  ' : ', ';
    yPosition = addText(data.interests.join(separator), contentX, yPosition, contentWidth);
    yPosition += 10;
  }

  // Declaration - Always show this section
  checkPageBreak(30);
  addSectionHeader('DECLARATION', contentX);
  
  if (isMinimal) {
    pdf.setFillColor(34, 197, 94);
    pdf.rect(contentX, yPosition, 8, 0.5, 'F');
    yPosition += 8;
  }

  pdf.setFontSize(10);
  pdf.setFont('helvetica', isMinimal ? 'thin' : 'normal');
  const declarationText = data.declaration || 'I hereby declare that all the information provided above is true to the best of my knowledge.';
  yPosition = addText(declarationText, contentX, yPosition, contentWidth);

  // Download the PDF
  const fileName = `${data.personalInfo.fullName || 'Resume'}_${templateName.replace(/\s+/g, '_')}.pdf`;
  pdf.save(fileName);
};
