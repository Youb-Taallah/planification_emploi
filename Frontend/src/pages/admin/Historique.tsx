import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProfesseurProfile from '../../components/admin/Historique/ProfesseurProfile';
import MonthFilter from '../../components/admin/Historique/MonthFilter';
import HistoriqueTable from '../../components/admin/Historique/HistoriqueTable';
import { Historique, Professeur } from '../../types/entities';
import HistoriqueService from '../../services/HistoriqueService';
import ProfessorService from '../../services/ProfessorService';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications
import { Calendar, Clock, UserCheck, UserX } from 'lucide-react';

const HistoriquePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentCustomMonthValue);
  const [professeur, setProfesseur] = useState<Professeur | null>(null);
  const [historiques, setHistoriques] = useState<Historique[]>([]);
  const [filteredHistoriques, setFilteredHistoriques] = useState<Historique[]>([]);
  const [professorLoading, setProfessorLoading] = useState<boolean>(true);
  const [historiquesLoading, setHistoriquesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch professor details
  useEffect(() => {
    if (id) {
      fetchProfessor(id);
    }
  }, [id]);

  // Fetch historiques when professor is loaded
  useEffect(() => {
    if (professeur) {
      fetchHistoriques(professeur.id);
    }
  }, [professeur]);

  // Filter historiques by month when selectedMonth changes
  useEffect(() => {
    if (historiques.length > 0) {
      if (selectedMonth) {
        const filtered = historiques.filter(historique => {
          const date = new Date(historique.date);
          const jsMonth = date.getMonth(); // 0 (Jan) to 11 (Dec)
  
          // Convert to custom academic month: Sept (8) => "01", Oct (9) => "02", ..., May (4) => "09"
          const customMonthIndex = (jsMonth + 4) % 12; // Sept becomes 0
          const customMonthValue = (customMonthIndex + 1).toString().padStart(2, '0');
  
          return customMonthValue === selectedMonth;
        });
        setFilteredHistoriques(filtered);
      } else {
        // If no month selected, show all historiques
        setFilteredHistoriques(historiques);
      }
    }
  }, [selectedMonth, historiques]);

  const fetchProfessor = async (id: string) => {
    if (!id) return;
    
    try {
      setProfessorLoading(true);
      const professorId = parseInt(id, 10);
      
      if (isNaN(professorId)) {
        throw new Error('Invalid professor ID');
      }
      
      const professorData = await ProfessorService.getProfessorById(professorId);
      
      if (!professorData) {
        throw new Error('Professor not found');
      }
      
      setProfesseur(professorData);
    } catch (err) {
      console.error('Error fetching professor:', err);
      setError(err instanceof Error ? err.message : 'Failed to load professor data');
      toast.error("Impossible de charger les données du professeur");
    } finally {
      setProfessorLoading(false);
    }
  };

  const fetchHistoriques = async (professorId: number) => {
    try {
      setHistoriquesLoading(true);
      const data = await HistoriqueService.getHistoriqueByProfId(professorId);
      setHistoriques(data);
      setFilteredHistoriques(data); // Initially show all data
      setError(null);
    } catch (err) {
      setError("Failed to load historique data");
      console.error(err);
      toast.error("Impossible de charger l'historique des séances");
    } finally {
      setHistoriquesLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      // Call API to update the status in the backend
      const success = await HistoriqueService.updateHistoriqueEtat(id, newStatus);
      
      if (success) {
        // Update the local state if API call was successful
        setHistoriques(prevHistoriques =>
          prevHistoriques.map(historique =>
            historique.id === id ? { ...historique, etat: newStatus } : historique
          )
        );
        
        // Also update the filtered historiques
        setFilteredHistoriques(prevHistoriques =>
          prevHistoriques.map(historique =>
            historique.id === id ? { ...historique, etat: newStatus } : historique
          )
        );
        
        toast.success("Statut mis à jour avec succès");
      } else {
        toast.error("Échec de la mise à jour du statut");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Une erreur s'est produite lors de la mise à jour du statut");
    }
  };

  function getCurrentCustomMonthValue(): string {
    const date = new Date();
    const jsMonth = date.getMonth(); // 0 (Jan) to 11 (Dec)
  
    // If it's June (5), July (6), or August (7), return "09" (Mai)
    if (jsMonth >= 5 && jsMonth <= 7) {
      return "09";
    }
  
    // Align September (8) to "01", October (9) to "02", ..., May (4) to "09"
    const customMonthIndex = (jsMonth + 4) % 12;
    return (customMonthIndex + 1).toString().padStart(2, "0");
  }

  // Format time as "2H30Min" instead of "2.5h"
  const calculateTimeFormat = (hours: number) => {
    // Convert to hours and Mins
    const wholePart = Math.floor(hours);
    const minutesPart = Math.round((hours - wholePart) * 60);
    
    // Format the string as "2H30Min"
    if (wholePart === 0 && minutesPart === 0) {
      return "0h";
    } else if (wholePart === 0) {
      return `${minutesPart}min`;
    } else if (minutesPart === 0) {
      return `${wholePart}h`;
    } else {
      return `${wholePart}h ${minutesPart}min`;
    }
  };

  // Calculate total hours from historiques
  const calculateTotalHours = (historiques: Historique[]) => {
    return historiques.reduce((total, historique) => {
      // Assuming duree is in hours format (e.g., "2.5" for 2.5 hours)
      const hours = parseFloat(historique.duree.toString()) || 0;
      return total + hours;
    }, 0);
  };

  // Calculate expected hours based on professor grade
  const calculateExpectedHours = (grade: string ) => {
    // Define weekly hours by grade
    const weeklyHoursByGrade: Record<string, number> = {
      'Professeur': 4,
      'Maître de Conférences': 8,
      'Maître Assistant': 14
    };

    // Default to 0 if grade is not found
    const weeklyHours = weeklyHoursByGrade[grade] || 0;
    
    // If no month selected, assume a full month (4 weeks)
    return weeklyHours * 4;
  };

  // Calculate overtime hours
  const calculateOvertimeHours = (presentHours: number, expectedHours: number) => {
    // Only positive values (actual hours exceeding expected hours)
    return Math.max(0, presentHours - expectedHours);
  };

  // StatsCard component for the enhanced stats display
  interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    colorScheme: 'primary' | 'success' | 'danger' | 'warning';
    delay: number;
  }

  const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorScheme, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Color mappings
    const colorMappings = {
      primary: {
        gradient: 'from-primary-400/30 to-primary-600/10',
        border: 'border-primary-300/30',
        text: 'text-primary-400',
        iconBg: 'bg-primary-900/50',
        glow: 'shadow-primary-glow',
      },
      success: {
        gradient: 'from-green-400/30 to-green-600/10',
        border: 'border-green-300/30',
        text: 'text-green-400',
        iconBg: 'bg-green-900/50',
        glow: 'shadow-green-glow',
      },
      danger: {
        gradient: 'from-red-400/30 to-red-600/10',
        border: 'border-red-300/30',
        text: 'text-red-400',
        iconBg: 'bg-red-900/50',
        glow: 'shadow-red-glow',
      },
      warning: {
        gradient: 'from-yellow-400/30 to-yellow-600/10',
        border: 'border-yellow-300/30',
        text: 'text-yellow-400',
        iconBg: 'bg-yellow-900/50',
        glow: 'shadow-yellow-glow',
      }
    };
    
    const colors = colorMappings[colorScheme];
    
    // Effect for interactive background
    useEffect(() => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position percentage
        const posX = x / rect.width;
        const posY = y / rect.height;
        
        // Apply subtle gradient shift
        card.style.setProperty('--mouse-x', `${posX}`);
        card.style.setProperty('--mouse-y', `${posY}`);
      };
      
      card.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    return (
      <div 
        ref={cardRef}
        className="relative overflow-hidden rounded-xl animate-slide-in"
        style={{ 
          animationDelay: `${delay}ms`,
          background: 'linear-gradient(to right, rgba(23, 23, 23, 0.7), rgba(23, 23, 23, 0.6))',
        } as React.CSSProperties}
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black-900/10 to-black-800/20 backdrop-blur-sm"></div>
        
        {/* Top border */}
        <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${colors.gradient}`}></div>
        
        {/* Decorative elements */}
        <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${colors.gradient} blur-xl opacity-50`}></div>
        <div className={`absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-tl ${colors.gradient} blur-xl opacity-30`}></div>
        
        {/* Content */}
        <div className="relative z-10 p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 h-10 w-10 rounded-full ${colors.iconBg} ${colors.border} border flex items-center justify-center transition-all duration-300`}>
              <div className={colors.text}>
                {icon}
              </div>
            </div>
            
            {/* Text content */}
            <div className="flex-1">
              <h3 className={`text-sm font-medium uppercase tracking-wider ${colors.text} mb-1`}>
                {title}
              </h3>
              <p className="text-xl font-bold text-white">
                {value}
              </p>
            </div>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" 
          style={{
            background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255, 255, 255, 0.1), transparent 40%)`,
          }}
        ></div>
      </div>
    );
  };

  if (professorLoading || historiquesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-white">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error || !professeur) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
          <p className="text-red-600">{error || 'Données du professeur non disponibles'}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Filter historiques by status using the filtered historiques
  const presentHistoriques = filteredHistoriques.filter(h => h.etat.toLowerCase() === 'present');
  const absentHistoriques = filteredHistoriques.filter(h => h.etat.toLowerCase() === 'absent');
  
  // Calculate hours for each category
  const presentHours = calculateTotalHours(presentHistoriques);
  const absentHours = calculateTotalHours(absentHistoriques);
  // const totalHours = calculateTotalHours(filteredHistoriques);
  
  // Calculate expected hours based on professor's grade
  const expectedHours = calculateExpectedHours(professeur.grade);
  
  // Calculate overtime hours (present hours - expected hours)
  const overtimeHours = calculateOvertimeHours(presentHours, expectedHours);
  
  // Format times for display
  const formattedPresentTime = calculateTimeFormat(presentHours);
  const formattedAbsentTime = calculateTimeFormat(absentHours);
  const formattedOvertimeTime = calculateTimeFormat(overtimeHours);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Professeur Profile */}
          <div className="mb-8 animate-fade-in">
            <ProfesseurProfile professeur={professeur} />
          </div>
          
          {/* Title and Month Filter */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-slide-in" style={{ animationDelay: "100ms" }}>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Calendar size={22} className="text-primary-400" />
                Historique des Séances
              </h2>
              <p className="text-black-300 mt-1">Consultez l'historique des séances pour {professeur.nom}</p>
            </div>
            
            <MonthFilter 
              selectedMonth={selectedMonth} 
              onMonthChange={setSelectedMonth} 
            />
          </div>
          
          {/* Historique Table */}
          <div className="animate-slide-in" style={{ animationDelay: "200ms" }}>
            {historiquesLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                <p className="mt-2">Chargement de l'historique...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                <p>{error}</p>
                <button 
                  className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  onClick={() => fetchHistoriques(professeur.id)}
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <HistoriqueTable 
                historiques={filteredHistoriques}
                searchTerm="" // Not used anymore since we're filtering by month
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
          
          {/* Stats Summary */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in" style={{ animationDelay: "300ms" }}>
            <StatsCard 
              title="Heures de présence"
              value={formattedPresentTime}
              icon={<UserCheck size={20} />}
              colorScheme="success"
              delay={200}
            />

            <StatsCard 
              title="Heures d'absence"
              value={formattedAbsentTime}
              icon={<UserX size={20} />}
              colorScheme="danger"
              delay={300}
            />

            <StatsCard 
              title="Heures supplémentaires"
              value={formattedOvertimeTime}
              icon={<Clock size={20} />}
              colorScheme="warning"
              delay={400}
            />
          </div>
          
          {/* Expected Hours Info */}
          {professeur.grade && (
            <div className="mt-6 p-4 bg-black-800/50 rounded-lg border border-black-700 animate-slide-in" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center gap-2 text-white">
                <Clock size={16} className="text-primary-400" />
                <span className="text-sm">
                  Heures attendues pour ce {selectedMonth ? "mois" : "période"} ({professeur.grade}): 
                  <span className="font-semibold ml-1">{calculateTimeFormat(expectedHours)}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoriquePage;