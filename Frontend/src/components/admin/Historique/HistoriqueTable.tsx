import React, { useState } from 'react';
import { Historique } from '../../../types/entities';
import { Calendar, Clock, Edit3, BookOpen, DoorOpen } from 'lucide-react';
import StatusModal from './StatusModel';

interface HistoriqueTableProps {
  historiques: Historique[];
  searchTerm: string;
  onStatusChange: (id: number, newStatus: string) => void;
}

const HistoriqueTable: React.FC<HistoriqueTableProps> = ({ 
  historiques, 
  searchTerm,
  onStatusChange 
}) => {
  const [selectedSeance, setSelectedSeance] = useState<Historique | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredHistoriques = historiques.filter(historique => {
    const searchLower = searchTerm.toLowerCase();
    return (
      historique.matiere.nom.toLowerCase().includes(searchLower) ||
      historique.salle.id.toLowerCase().includes(searchLower) ||
      historique.etat.toLowerCase().includes(searchLower) ||
      new Date(historique.date).toLocaleDateString().includes(searchTerm)
    );
  });

  const getStatusBadge = (etat: string) => {
    switch (etat.toLowerCase()) {
      case 'present':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
            Présent
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            Absent
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            En attente
          </span>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  const handleStatusClick = (historique: Historique) => {
    setSelectedSeance(historique);
    setIsModalOpen(true);
  };

  return (
    <>
    
      <div className="w-full overflow-hidden rounded-xl bg-black-900/40 border border-purple-500/20 backdrop-blur-sm animate-fade-in shadow-card">
        {filteredHistoriques.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-purple-500/20 mb-4 shadow-purple-glow">
              <Calendar size={32} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Aucune séance trouvée</h3>
            <p className="text-gray-500 max-w-md">
              {searchTerm ? "Aucun résultat pour cette recherche. Essayez d'autres termes." : "Aucune séance n'est enregistrée pour ce professeur."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left bg-black-900/60 border-b border-purple-500/20">
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Heure</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Durée</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Matière</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Salle</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-xs font-medium text-purple-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/20">
                {filteredHistoriques.map((historique) => (
                  <tr 
                    key={historique.id}
                    className="hover:bg-purple-500/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Calendar size={16} className="text-purple-400" />
                        </div>
                        <span className="text-sm text-gray-300">
                          {formatDate(historique.date)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Clock size={16} className="text-purple-400" />
                        </div>
                        <span className="text-sm text-gray-300">
                          {historique.temps}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Clock size={16} className="text-purple-400" />
                        </div>
                        <span className="text-sm text-gray-300">
                          {formatTime(historique.duree)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:flex">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <BookOpen size={16} className="text-purple-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {historique.matiere.nom}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <DoorOpen size={16} className="text-purple-400" />
                        </div>
                        <span className="text-sm text-gray-300">
                          {historique.salle.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(historique.etat)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusClick(historique)}
                        className="group p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-200"
                      >
                        <Edit3 size={16} className="text-purple-400 group-hover:text-purple-300" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedSeance && (
        <StatusModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          currentStatus={selectedSeance.etat}
          onStatusChange={(newStatus) => onStatusChange(selectedSeance.id, newStatus)}
          seanceInfo={{
            matiere: selectedSeance.matiere.nom,
            date: selectedSeance.date,
            temps: selectedSeance.temps,
          }}
        />
      )}
    </>
  );
};

export default HistoriqueTable;