import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthFilter: React.FC<MonthFilterProps> = ({ selectedMonth, onMonthChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const months = [
    { value: "01", label: "Septembre" },
    { value: "02", label: "Octobre" },
    { value: "03", label: "Novembre" },
    { value: "04", label: "Décembre" },
    { value: "05", label: "Janvier" },
    { value: "06", label: "Février" },
    { value: "07", label: "Mars" },
    { value: "08", label: "Avril" },
    { value: "09", label: "Mai" },
  ];

  const getSelectedMonthLabel = () => {
    const month = months.find(m => m.value === selectedMonth);
    return month ? month.label : "Tous les mois";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthSelect = (month: string) => {
    onMonthChange(month);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center gap-2 bg-black-50/80 backdrop-blur-sm text-black-800 
                  px-4 py-2.5 rounded-xl cursor-pointer border border-primary-200/30 
                  shadow-card hover:shadow-card-hover transition-shadow duration-200 
                  w-full md:w-auto min-w-[200px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={18} className="text-primary-500" />
        <span className="flex-1">{getSelectedMonthLabel()}</span>
        <ChevronDown 
          size={16} 
          className={`text-black-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full min-w-[200px] max-h-72 overflow-y-auto 
                      bg-black-50/95 backdrop-blur-md rounded-xl shadow-lg border border-primary-200/30 
                      py-1 animate-fade-in">
          {months.map((month) => (
            <div 
              key={month.value}
              className={`px-4 py-2.5 cursor-pointer transition-colors duration-150
                        ${selectedMonth === month.value ? 
                          'bg-primary-500 text-white' : 
                          'text-black-800 hover:bg-primary-100'}`}
              onClick={() => handleMonthSelect(month.value)}
            >
              {month.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MonthFilter;