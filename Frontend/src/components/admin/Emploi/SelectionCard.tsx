import React from 'react';

interface SelectionCardProps {
  type: 'professor' | 'student';
  image: string;
  hoverText: string;
  onClick: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ 
  type, 
  image, 
  hoverText, 
  onClick 
}) => {
  return (
    <div 
      className="relative w-72 h-96 perspective-1000 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative w-full h-full duration-500 preserve-3d group-hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute w-full h-full rounded-2xl shadow-card overflow-hidden backface-hidden">
          <div className="absolute inset-0">
            <img 
              src={image} 
              alt={type === 'professor' ? 'Professor' : 'Student'} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {type === 'professor' ? 'Enseignants' : 'Étudiants'}
            </h3>
            <p className="text-primary-100 text-sm">
              Cliquez pour {type === 'professor' ? 'sélectionner un enseignant' : 'sélectionner une classe'}
            </p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-950">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute -bottom-8 right-4 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-primary-800 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xl font-medium text-white leading-relaxed mb-8">
              {hoverText}
            </p>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-purple-glow">
              Sélectionner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionCard;