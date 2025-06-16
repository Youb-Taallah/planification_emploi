import React from 'react';

interface StatisticsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, count, icon }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black-900/40 backdrop-blur-sm p-6 
      border border-purple-500/20 shadow-card hover:shadow-card-hover transition-all duration-300 
      group hover:-translate-y-1 hover:bg-black-900/60 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{count}</h3>
        </div>
        <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 
          group-hover:bg-purple-500/30 group-hover:shadow-purple-glow transition-all duration-300">
          {icon}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r 
        from-transparent via-purple-500 to-transparent opacity-70"></div>
    </div>
  );
};

export default StatisticsCard