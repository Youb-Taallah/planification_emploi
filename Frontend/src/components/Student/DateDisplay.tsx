import React from 'react';
import { Calendar } from 'lucide-react';

const DateDisplay: React.FC = () => {
  const today = new Date();
  
  // Format date in French
  const formattedDate = formatDateFrench(today);
  
  return (
    <div className="flex items-center">
      <Calendar className="h-5 w-5 text-black-400 mr-2" />
      <span className="text-sm font-medium text-black-400">{formattedDate}</span>
    </div>
  );
};

const formatDateFrench = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  // First letter uppercase for weekday and month
  const formatter = new Intl.DateTimeFormat('fr-FR', options);
  let formattedDate = formatter.format(date);
  
  // In French, first letter of days and months should be capitalized
  formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return formattedDate;
};

export default DateDisplay;