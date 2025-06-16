import { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, Info } from 'lucide-react';
import StatisticsCard from '../../components/admin/Professors/StaticsCard';
import SearchBar from '../../components/admin/Professors/SearchBar';
import ProfesseurTable from '../../components/admin/Professors/ProfesseurTable';
import Header from '../../components/admin/Professors/Header';
import { filterProfesseurs, countByGrade } from '../../utils/filterProfesseurs';
import { GradeCount, Professeur } from '../../types/entities';
import ProfessorService from '../../services/ProfessorService';

function Enseignants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [filteredProfesseurs, setFilteredProfesseurs] = useState<Professeur[]>([]);
  const [gradeCounts, setGradeCounts] = useState<GradeCount>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showHint, setShowHint] = useState(true);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedProfesseurs, setPaginatedProfesseurs] = useState<Professeur[]>([]);

  // Fetch professors from API using service
  useEffect(() => {
    const fetchProfesseurs = async () => {
      try {
        const data = await ProfessorService.getAllProfessors();
        setProfesseurs(data);
        setFilteredProfesseurs(data);
        const counts = countByGrade(data);
        setGradeCounts(counts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching professors:', error);
        setIsLoading(false);
      }
    };

    fetchProfesseurs();

    // Hide hint after 10 seconds
    const timer = setTimeout(() => setShowHint(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filtered = filterProfesseurs(professeurs, searchTerm);
    setFilteredProfesseurs(filtered);
    setCurrentPage(1); // Reset to first page when search changes
    const counts = countByGrade(professeurs);
    setGradeCounts(counts);
  }, [searchTerm, professeurs]);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProfesseurs(filteredProfesseurs.slice(startIndex, endIndex));
  }, [filteredProfesseurs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProfesseurs.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <GraduationCap size={48} className="text-purple-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-semibold text-white mb-2">Chargement des données</h2>
          <p className="text-gray-400">Veuillez patienter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200 w-full">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <StatisticsCard 
              title="Professeurs" 
              count={gradeCounts['Professeur'] || 0} 
              icon={<GraduationCap className="animate-pulse" size={24} />}
            />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300 delay-75">
            <StatisticsCard 
              title="Maîtres de Conférences" 
              count={gradeCounts['Maître de Conférences'] || 0} 
              icon={<BookOpen className="animate-pulse" size={24} />}
            />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300 delay-150">
            <StatisticsCard 
              title="Assistants" 
              count={gradeCounts['Assistant'] || 0} 
              icon={<Users className="animate-pulse" size={24} />}
            />
          </div>
        </div>
        
        <div className="mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
        
        <div className="mb-8 transform  w-full">
          {showHint && (
            <div className="mb-4 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 shadow-lg animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Info size={20} className="text-purple-400" />
                </div>
                <p className="text-sm text-purple-200">
                  <span className="font-medium">Pro Tip:</span> Cliquez sur un professeur pour consulter son historique détaillé des séances et des présences
                </p>
                <button 
                  onClick={() => setShowHint(false)}
                  className="ml-auto text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Compris
                </button>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Liste des Enseignants</h2>
            <div className="text-sm text-purple-400">
              {filteredProfesseurs.length} sur {professeurs.length} enseignants
            </div>
          </div>
          <ProfesseurTable 
            professeurs={paginatedProfesseurs}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredProfesseurs.length}
          />
        </div>
      </div>
    </div>
  );
}

export default Enseignants;