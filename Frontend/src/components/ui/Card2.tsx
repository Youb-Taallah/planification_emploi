import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false 
}) => {
  return (
    <div 
      className={`
        bg-black-800/40 backdrop-blur-md rounded-xl
        border border-primary-500/10 p-6
        shadow-card transition-all duration-300
        ${hoverable ? 'hover:shadow-card-hover hover:scale-[1.02] hover:bg-black-700/40 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;