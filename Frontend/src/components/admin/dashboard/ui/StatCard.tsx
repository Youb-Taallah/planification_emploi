import React from 'react';
import { UserCircle, Building, GraduationCap, BookOpen } from 'lucide-react';

type StatCardType = 'students' | 'professors' | 'sections' | 'rooms';

interface StatCardProps {
  type: StatCardType;
  count: number | null;
}

const StatCard: React.FC<StatCardProps> = ({ type, count }) => {
  const getIcon = () => {
    switch (type) {
      case 'students':
        return <UserCircle className="w-7 h-7" />;
      case 'professors':
        return <GraduationCap className="w-7 h-7" />;
      case 'sections': 
        return <BookOpen className="w-7 h-7" />;
      case 'rooms':
        return <Building className="w-7 h-7" />;
      default:
        return <UserCircle className="w-7 h-7" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'students':
        return 'Nombre d\'étudiants';
      case 'professors':
        return 'Nombre d\'enseignants';
      case 'sections': 
        return 'Sections académiques';
      case 'rooms':
        return 'Salles disponibles';
      default:
        return 'Total';
    }
  };

  return (
    <div className={`rounded-xl p-6 text-white bg-black-900/60 shadow-card transition-all duration-300 transform hover:-translate-y-1 animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{getTitle()}</h3>
        <div className="p-2 bg-white/10 rounded-lg">
          {getIcon()}
        </div>
      </div>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-sm mt-2 text-white/80">À l'échelle de l'université</p>
    </div>
  );
};

export default StatCard;
