import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed?: boolean;
}

export function SidebarItem({ icon, label, to, isCollapsed = false }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-3 rounded-xl transition-all duration-200",
        "hover:bg-white/10  group relative overflow-hidden",
        isActive 
          ? "bg-white/15 text-white" 
          : "text-white/70",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      {/* Animated background for hover effect */}
      <span className="absolute inset-0 w-full h-full bg-primary-600/0 group-hover:bg-primary-600/10 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 rounded-xl"></span>
      
      {/* Glow effect for active item */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-white rounded-r-full transform transition-all duration-300 ease-in-out"></span>
      )}
      
      {/* Icon */}
      <span className={cn(
        "inline-flex items-center justify-center relative z-10",
        "transition-all duration-200 ease-in-out",
        isActive ? "text-white" : "text-white/70 group-hover:text-white", 
        isCollapsed ? "w-8 h-6" : "mr-3 w-6 h-6"
      )}>
        {icon}
      </span>
      
      {/* Label */}
      <span className={cn(
        "text-sm font-medium whitespace-nowrap relative z-10",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-0 opacity-0 absolute" : "w-auto opacity-100"
      )}>
        {label}
      </span>
    </Link>
  );
}