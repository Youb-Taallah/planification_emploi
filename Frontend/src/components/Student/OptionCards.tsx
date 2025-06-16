import React from 'react';
import { Calendar, FileEdit } from 'lucide-react';
import Card from '../ui/Card2';
import { Link } from 'react-router-dom';

export interface OptionCard {
    id: string;
    title: string;
    description: string;
    icon: string;
    link?: string;
  }

interface OptionCardsProps {
  options: OptionCard[];
}

const OptionCards: React.FC<OptionCardsProps> = ({ options }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar className="h-8 w-8 text-primary-400" />;
      case 'file-edit':
        return <FileEdit className="h-8 w-8 text-primary-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-medium text-primary-100 mb-6">What would you like to do?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option) => (
            <Card 
              key={option.id}
              hoverable
              className="animate-slide-in"
            >
              <div className="flex items-start">
                <div className="p-3 rounded-lg bg-primary-500/10 mr-4">
                  {renderIcon(option.icon)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary-100 mb-2">{option.title}</h4>
                  <p className="text-sm text-primary-200/80">{option.description}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
              <Link to={option.link || ''}>
              <button className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center transition-colors">
                  Select
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
                
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionCards;