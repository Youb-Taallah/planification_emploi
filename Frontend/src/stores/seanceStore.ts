import { create } from 'zustand';
import { Seance } from '../types/entities';
import { SeanceWithTds } from '../types/tdo';
import { useTdStore } from './tdStore';


interface SeanceState {
  // State
  seances: SeanceWithTds[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSeances: (seances: SeanceWithTds[]) => Promise<void>;
  getSeanceById: (id: number) => SeanceWithTds | undefined;
  
  // Filtering helpers
  getSeancesByProfesseur: (professeurId: number) => SeanceWithTds[];
  getSeancesByMatiere: (matiereId: string) => SeanceWithTds[];
  getSeancesByJour: (jour: Seance['jour']) => SeanceWithTds[];
  getSeancesByTD: (tdId: string) => SeanceWithTds[];
  getSeancesBySalle: (salleId: string) => SeanceWithTds[];
}

export const useSeanceStore = create<SeanceState>()((set, get) => ({
    // Initial state
    seances: [],
    isLoading: false,
    error: null,

    // Fetch all seances from API
    setSeances: async (seances: SeanceWithTds[]) => {
      set({ seances });
    },

    // Get a seance by ID
    getSeanceById: (id) => {
      return get().seances.find(seance => seance.seance.id === id);
    },

    // Helper methods for filtering
    getSeancesByProfesseur: (professeurId) => {
      return get().seances.filter(seance => seance.seance.professeur.id === professeurId);
    },

    getSeancesByMatiere: (matiereId) => {
          return get().seances.filter(seance => seance.seance.matiere.id === matiereId);
    },

    getSeancesByJour: (jour) => {
          return get().seances.filter(seance => seance.seance.jour === jour);
    },

    getSeancesByTD: (tdId) => {
      
      const td = useTdStore.getState().getTdById(tdId);
      
      return get().seances.filter(seance => {
        const sectionId = td?.section?.id;

        const secttionMatches = seance.seance.section?.id === sectionId;


        const tdMatches = seance.tds?.some(seance => {
          return seance.td.id === tdId;
        });
        const tpMatches = seance.tps?.some(seance => {
          return seance.tp.td.id === tdId;
        });
        return tdMatches || tpMatches || secttionMatches;
      });
    },

    getSeancesBySalle: (salleId) => {
          return get().seances.filter(seance => seance.seance.salle.id === salleId);
    }
  })
);