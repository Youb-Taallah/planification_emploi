import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Calendar, Users, LogOut } from 'lucide-react';
import { cn } from '../../utils';
import { SidebarItem } from './sidebar-item';
import { getInitials } from '../../utils';
import { Link } from 'react-router-dom';
import { Avatar } from '../../ui/avatar';
import { UseAuthStore } from '../../../Auth/AuthStore';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
  onLogoutClick?: () => void;
}

export function Sidebar({ onCollapse, onLogoutClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const username = UseAuthStore(state => state.username);


  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 1024; 
      setIsSmallScreen(isSmall);
      
      // If screen is small, force expanded sidebar
      if (isSmall && isCollapsed) {
        setIsCollapsed(false);
        onCollapse?.(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed, onCollapse]);

  const toggleSidebar = () => {
    // Only allow collapsing if not on a small screen
    if (isSmallScreen) return;
    
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen bg-gradient-to-t from-primary-900/90 to-black-900 backdrop-blur-sm",
        "border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col",
        "shadow-xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between h-24 px-4 border-b border-white/10">
        {
          <Link to="/" className="flex items-center ml-2 transition-all duration-300 ease-in-out">
            <span className={cn(
              "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              Dashboard
            </span>
          </Link>
        }
        {!isSmallScreen && (
          <button 
            onClick={toggleSidebar}
            className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 transform hover:scale-105"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? 
              <ChevronRight size={18} className="animate-pulse-subtle" /> : 
              <ChevronLeft size={18} />
            }
          </button>
        )}
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 sidebar-content">
        <nav className="space-y-2">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Accueil" 
            to="/admin" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<Calendar size={20} />} 
            label="Emplois du temps" 
            to="/admin/emploi-du-temps" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Professeurs" 
            to="/admin/professeurs" 
            isCollapsed={isCollapsed} 
          />
        </nav>
      </div>

      {/* User profile */}
      <div className={cn(
        "border-t border-white/10 p-4 backdrop-blur-sm",
        "flex flex-col",
        isCollapsed ? "items-center gap-3" : "items-stretch"
      )}>
        {/* User info */}
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3">
            <Avatar 
              src={""}
              initials={getInitials(username)}
              className={cn(
                "w-10 h-10 text-xs border-2 border-white/20 shadow-purple-glow transform transition-all duration-300",
                isCollapsed ? "hover:scale-110" : "hover:scale-105"
              )}
            />
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              <p className="text-sm font-medium text-white truncate">
                {username}
              </p>
              <p className="text-xs text-white/60 truncate">
                Administrateur
              </p>
            </div>
          </div>
          
          {/* Logout button (expanded view) */}
          {!isCollapsed && (
            <button
              onClick={onLogoutClick}
              className="rounded-full p-2 text-white/80 hover:text-white hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/30 transition-all duration-200 transform hover:scale-105 hover:text-red-400"
              aria-label="Déconnexion"
              title="Déconnexion"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
        
        {/* Logout button (collapsed view) */}
        {isCollapsed && (
          <button
            onClick={onLogoutClick}
            className="mt-2 flex items-center justify-center w-full py-2 px-3 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/30 transition-all duration-200 transform hover:scale-105"
            aria-label="Déconnexion"
            title="Déconnexion"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </div>
  );
}