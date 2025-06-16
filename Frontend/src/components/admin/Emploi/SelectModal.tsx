import React, { useState, useEffect, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { Professeur, TD } from '../../../types/entities';
import { useNavigate } from 'react-router-dom';

interface SelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  professeurs?: Professeur[];
  classes?: TD[];
  type: 'professor' | 'student';
}

const SelectModal: React.FC<SelectModalProps> = ({
  isOpen,
  onClose,
  title,
  professeurs,
  classes,
  type
}) => {
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProfesseurs = useMemo(() =>
    professeurs?.filter(prof =>
      prof.nom.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [],
    [searchTerm, professeurs]
  );
  
  const filteredClasses = useMemo(() =>
    classes?.filter(classe =>
      classe.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [],
    [searchTerm, classes]
  );
  
  const filteredOptions = type === 'professor' ? filteredProfesseurs : filteredClasses;
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  

  const handleSelect = (option: Professeur | TD) => {
    if (type === 'professor') {
      const id = (option as Professeur).id;
      navigate(`/admin/emploi-du-temps/professeur/${id}`);
    } else {
      const id = (option as TD).id;
      navigate(`/admin/emploi-du-temps/classe/${id}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black-900/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-black-800/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-slide-in border border-primary-500/20">
        <div className="flex justify-between items-center p-6 border-b border-primary-500/20">
          <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-200 to-primary-400">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary-400" />
            </div>
            <input
              type="text"
              placeholder={`Rechercher un ${type === 'professor' ? 'professeur' : 'classe'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black-700/50 border border-primary-500/20 rounded-xl text-white placeholder-primary-400/60 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {type === 'professor' ? (
              filteredProfesseurs.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => handleSelect(prof)}
                  className="w-full p-4 rounded-xl bg-gradient-to-r hover:from-primary-900/50 hover:to-primary-800/50 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 group text-left"
                >
                  <span className="text-white group-hover:text-primary-200 transition-colors">
                    {prof.nom}
                  </span>
                </button>
              ))
            ) : (
              filteredClasses.map((classe, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(classe)}
                  className="w-full p-4 rounded-xl bg-gradient-to-r hover:from-primary-900/50 hover:to-primary-800/50 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 group text-left"
                >
                  <span className="text-white group-hover:text-primary-200 transition-colors">
                    {classe.id}
                  </span>
                </button>
              ))
            )}
            
            {filteredOptions.length === 0 && (
              <div className="text-center py-8 text-primary-400">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
