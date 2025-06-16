import React, { useState } from 'react';
import { logout } from '../../Auth/AuthService';
import { getInitials } from '../utils';
import { Avatar } from '../ui/avatar';
import { cn } from '../../lib/utils';


interface ProfileIconProps {
  student: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ student }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };
  
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="relative flex items-center justify-center group"
        aria-expanded={isOpen}
      >
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-300 bg-black-100 flex items-center justify-center transition-all duration-300 group-hover:border-primary-500 group-hover:shadow-md">
        <Avatar 
            src={""}
            initials={getInitials(student)}
            className={cn(
              "w-10 h-10 text-xs border-2 border-white/20 shadow-purple-glow transform transition-all duration-300",
            )}
          />
        </div>
        
        {/* Active indicator */}
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white transition-transform duration-300 group-hover:scale-110" />
        

      </button>
      
      {/* Dropdown menu with enhanced hover effects */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black-200 animate-fade-in z-50 overflow-hidden">
          <div className="p-3 border-b border-black-100 bg-primary-50/30">
            <p className="text-sm font-medium text-black-900">{student}</p>
            <p className="text-xs text-black-500">Étudiant</p>
          </div>
          <div className="py-1">
            <a 
              href="#" 
              className="block px-4 py-2 text-sm text-black-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <span className="w-5 h-5 mr-2 inline-flex items-center justify-center rounded-full bg-primary-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              Profil
            </a>
            <a 
              href="#" 
              className="block px-4 py-2 text-sm text-black-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 flex items-center"
            >
              <span className="w-5 h-5 mr-2 inline-flex items-center justify-center rounded-full bg-primary-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </span>
              Paramètres
            </a>
            <div className="border-t border-black-100 my-1"></div>
            <a 
              href="#" 
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 flex items-center"
            >
              <span className="w-5 h-5 mr-2 inline-flex items-center justify-center rounded-full bg-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              </span>
              Déconnexion
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;