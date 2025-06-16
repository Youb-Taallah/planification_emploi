import axios, { AxiosResponse } from 'axios';
import { Historique } from '../types/entities';
import { getAccessToken } from '../Auth/AuthUtils';
const API_URL = 'http://localhost:8081/api/historique';

// Interface for the update état request body
interface UpdateEtatRequest {
  id: number;
  etat: string;
}

// Interface for counting hours request
interface CountRequest {
  profId: number;
  month: number;
  year: number;
}

export const HistoriqueService = {
  
  getHistoriqueByProfId: async (profId: number): Promise<Historique[]> => {
    const token = getAccessToken();

    try {
      const response: AxiosResponse<Historique[]> = await axios.get(`${API_URL}/${profId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch historical data for professor ID ${profId}:`, error);
      return [];
    }
  },

  updateHistoriqueEtat: async (id: number, etat: string): Promise<boolean> => {
    const token = getAccessToken();
    
    try {
      const requestBody: UpdateEtatRequest = {
        id,
        etat
      };
      
      const response: AxiosResponse = await axios.put(
        `${API_URL}/updateEtat`, 
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.status === 200;
    } catch (error) {
      console.error(`Failed to update état for historique ID ${id}:`, error);
      return false;
    }
  },

  // Add a session to history (for today or tomorrow)
  addHistorique: async (day: string): Promise<boolean> => {
    const token = getAccessToken();
    
    try {
      const response: AxiosResponse = await axios.post(
        API_URL,
        day,
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.status === 200;
    } catch (error) {
      console.error(`Failed to add historique for day ${day}:`, error);
      return false;
    }
  },

  // Delete a session from history
  deleteHistorique: async (historiqueId: number): Promise<boolean> => {
    const token = getAccessToken();
    
    try {
      const response: AxiosResponse = await axios.delete(
        `${API_URL}/delete/${historiqueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.status === 200;
    } catch (error) {
      console.error(`Failed to delete historique ID ${historiqueId}:`, error);
      return false;
    }
  },

  // Count hours for a professor in a given month
  countHours: async (profId: number, month: number, year: number): Promise<any> => {
    const token = getAccessToken();
    
    try {
      const requestBody: CountRequest = {
        profId,
        month,
        year
      };
      
      const response: AxiosResponse = await axios.post(
        `${API_URL}/countHours`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error(`Failed to count hours for professor ID ${profId}:`, error);
      return { error: 'Failed to count hours' };
    }
  },


};

export default HistoriqueService;