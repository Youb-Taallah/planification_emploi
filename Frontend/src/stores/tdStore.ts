import { create } from 'zustand';
import { TD } from '../types/entities';

interface TdState {
  // State
  tds: TD[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTds: (tds: TD[]) => Promise<void>;
  getTdById: (id: string) => TD | undefined;
  
}

export const useTdStore = create<TdState>()((set, get) => ({
    // Initial state
    tds: [],
    isLoading: false,
    error: null,

    // Fetch all seances from API
    setTds: async (tds: TD[]) => {
      set({ tds });
    },

    // Get a seance by ID
    getTdById: (id) => {
      return get().tds.find(td => td.id === id);
    },
  })
);