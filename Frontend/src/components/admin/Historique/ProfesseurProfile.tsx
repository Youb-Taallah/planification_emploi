import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Award, Building, Circle } from 'lucide-react';
import { Professeur } from '../../../types/entities';

interface ProfesseurProfileProps {
  professeur: Professeur;
}

const ProfesseurProfile: React.FC<ProfesseurProfileProps> = ({ professeur }) => {
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(name => name[0]).join('');
  };

  // Effect for interactive background
  useEffect(() => {
    if (!profileRef.current) return;
    
    const card = profileRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position percentage
      const posX = x / rect.width;
      const posY = y / rect.height;
      
      // Apply subtle gradient shift
      card.style.setProperty('--mouse-x', `${posX}`);
      card.style.setProperty('--mouse-y', `${posY}`);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={profileRef}
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(to right, rgba(147, 51, 234, 0.07), rgba(124, 58, 237, 0.05))',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-black-900/20 backdrop-blur-[2px]"></div>
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-400/70 via-primary-600/40 to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary-400/30 to-primary-600/10 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tl from-primary-600/20 to-primary-800/5 blur-xl"></div>
      
      {/* Diagonal divider */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-bl from-primary-900/10 to-transparent transform -skew-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Avatar section (3/12) */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <div className="relative group">
              {/* Pulsing background effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 opacity-70 group-hover:opacity-90 blur-md group-hover:blur-lg transform scale-110 group-hover:scale-125 transition-all duration-500"></div>
              
              {/* Main avatar circle */}
              <div className="relative h-32 w-32 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary-300/50">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 opacity-90"></div>
                
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <Circle 
                      key={i} 
                      size={10 + i * 10} 
                      className="absolute text-white/20"
                      style={{
                        top: `${20 + i * 10}%`,
                        left: `${20 + i * 8}%`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Initials */}
                <span className="relative z-10 text-3xl font-bold text-white tracking-wider">
                  {getInitials(professeur.nom)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content section (9/12) */}
          <div className="md:col-span-9">
            <div className="space-y-6">
              {/* Name and title */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {professeur.nom}
                  </h1>
                  <div className="text-primary-400 text-sm font-medium tracking-wider uppercase">
                    {professeur.grade}
                  </div>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full mt-2 mb-3"></div>
                <p className="text-black-300 text-sm">{professeur.departement}</p>
              </div>
              
              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Contact Information */}
                <ContactItem
                  icon={<Mail size={18} className="text-primary-400" />}
                  label="Email"
                  value={professeur.mail}
                />
                
                <ContactItem
                  icon={<Phone size={18} className="text-primary-400" />}
                  label="Téléphone"
                  value={professeur.numTel}
                />
                
                <ContactItem
                  icon={<Award size={18} className="text-primary-400" />}
                  label="Grade"
                  value={professeur.grade}
                />
                
                <ContactItem
                  icon={<Building size={18} className="text-primary-400" />}
                  label="Département"
                  value={professeur.departement}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Extracted ContactItem component
const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value }) => {
  return (
    <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-black-800/50 flex items-center justify-center group-hover:bg-primary-900/50 group-hover:shadow-purple-glow transition-all duration-300">
        {icon}
      </div>
      <div>
        <div className="text-xs text-black-400 font-medium uppercase tracking-wider">
          {label}
        </div>
        <div className="text-black-200 group-hover:text-white transition-colors duration-300">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ProfesseurProfile;