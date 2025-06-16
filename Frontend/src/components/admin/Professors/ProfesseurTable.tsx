import React from 'react';
import { Professeur } from '../../../types/entities';
import { Mail, Phone, GraduationCap, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfesseurTableProps {
  professeurs: Professeur[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
}

const ProfesseurTable: React.FC<ProfesseurTableProps> = ({ 
  professeurs, 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Professeur':
        return 'bg-yellow-200/20 text-yellow-200 border-yellow-300/30';
      case 'Maître de Conférences':
        return 'bg-blue-400/20 text-blue-300 border-blue-500/30';
      case 'Maître Assistant':
        return 'bg-green-300/20 text-green-200 border-green-300/30';
      default:
        return 'bg-gray-700/20 text-gray-400 border-gray-700/30';
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full overflow-x-auto rounded-xl bg-black-900/40 border border-purple-500/20 
      backdrop-blur-sm animate-fade-in shadow-card">
      {professeurs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-purple-500/20 mb-4 shadow-purple-glow">
            <GraduationCap size={32} className="text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucun professeur trouvé</h3>
          <p className="text-gray-500 max-w-md">
            Aucun professeur ne correspond à votre recherche. Essayez avec des termes différents.
          </p>
        </div>
      ) : ( 
        <>
          <div className="min-w-full divide-y divide-purple-500/20">
            <div className="bg-black-900/60">
              <div className="grid grid-cols-6 gap-4 px-9 py-4">
                <div className="text-left text-xs font-medium text-purple-400 uppercase tracking-wider col-span-2">
                  Professeur
                </div>
                <div className="text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Grade
                </div>
                <div className="text-left text-xs font-medium text-purple-400 uppercase tracking-wider hidden md:block">
                  Département
                </div>
                <div className="text-left text-xs font-medium text-purple-400 uppercase tracking-wider hidden md:block">
                  Email
                </div>
                <div className="text-left text-xs font-medium text-purple-400 uppercase tracking-wider hidden md:block">
                  Téléphone
                </div>
              </div>
            </div>
            <div className="divide-y divide-purple-500/20 bg-black-900/20">
              {professeurs.map((professeur) => (
                <Link 
                  key={professeur.id}
                  to={`/admin/historique/${professeur.id}`}
                  className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-purple-500/5 transition-colors duration-200 cursor-pointer"
                >
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-500/20 
                        flex items-center justify-center shadow-purple-glow">
                        <span className="text-sm font-medium text-purple-300">
                          {professeur.nom.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-200">{professeur.nom}</div>
                        <div className="flex items-center mt-1 md:hidden">
                          <Building size={14} className="text-purple-400 mr-1" />
                          <div className="text-xs text-gray-400">{professeur.departement}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2.5 py-1 text-xs rounded-full border ${getGradeColor(professeur.grade)}`}>
                      {professeur.grade}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 md:flex">
                    <Building size={16} className="text-purple-400 mr-2" />
                    {professeur.departement}
                  </div>
                  <div className="flex items-center text-sm text-gray-300 md:flex">
                    <Mail size={16} className="text-purple-400 mr-2" />
                    <a href={`mailto:${professeur.mail}`} 
                      className="hover:text-purple-400 transition-colors">
                      {professeur.mail}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-300 md:flex">
                    <Phone size={16} className="text-purple-400 mr-2" />
                    <a href={`tel:${professeur.numTel}`} 
                      className="hover:text-purple-400 transition-colors">
                      {professeur.numTel}
                    </a>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Pagination Controls */}
          <div className="px-6 py-4 bg-black-900/60 border-t border-purple-500/20">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0 text-xs text-gray-400">
                Affichage de {startItem} à {endItem} sur {totalItems} enseignants
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={goToPreviousPage} 
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? 'bg-black-900/40 text-gray-500 cursor-not-allowed' : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/40'} focus:outline-none transition-colors duration-200`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="text-xs">
                  <span className="px-3 py-1 bg-purple-500/20 rounded-md text-purple-300">{currentPage}</span>
                  <span className="mx-1 text-gray-400">sur</span>
                  <span className="text-gray-300">{totalPages}</span>
                </div>
                
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`p-2 rounded-md ${currentPage === totalPages || totalPages === 0 ? 'bg-black-900/40 text-gray-500 cursor-not-allowed' : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/40'} focus:outline-none transition-colors duration-200`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                <label className="text-xs text-gray-400">Lignes par page:</label>
                <select 
                  value={itemsPerPage} 
                  onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                  className="bg-black-900/40 text-purple-300 border border-purple-500/30 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfesseurTable;
