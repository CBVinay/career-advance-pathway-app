
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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

export const useResumeData = () => {
  const { user } = useAuth();
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
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certificates: [],
    languages: [],
    interests: [],
    declaration: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchResumeData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setResumeData({
          personalInfo: {
            fullName: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.address || '',
            linkedin: data.linkedin_url || '',
            portfolio: data.portfolio_url || ''
          },
          summary: data.bio || '',
          experience: data.professional_experience || [],
          education: [{
            institution: data.university || '',
            degree: data.degree || '',
            year: data.graduation_year?.toString() || '',
            gpa: ''
          }].filter(edu => edu.institution),
          skills: data.skills || [],
          projects: data.projects || [],
          certificates: data.certificates || [],
          languages: data.languages || [],
          interests: data.interests || [],
          declaration: data.declaration || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, [user]);

  return { resumeData, loading, refetch: fetchResumeData };
};
