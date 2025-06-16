import React from 'react';
import { GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="py-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shadow-purple-glow">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Gestion des Enseignants</h1>
            <p className="text-gray-400 text-sm">Département administratif</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-6">
          <p className="text-sm text-purple-300 capitalize">{today}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse-subtle"></span>
            <span>Système à jour</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header