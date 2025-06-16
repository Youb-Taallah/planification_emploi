import axios, { AxiosResponse } from 'axios';
import { Seance } from '../types/entities';
import { getAccessToken } from '../Auth/AuthUtils';
import extractedSeance from '../types/extractedSeance';
import { SeanceWithTds } from '../types/tdo';

const API_URL = 'http://localhost:8081/api/seances';


const SeanceService = {
  getAllSeances: async (): Promise<Seance[]> => {
    try {
      const token = getAccessToken();
      const response: AxiosResponse<Seance[]> = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all seances:", error);
      return [];
    }
  },

  getSeanceById: async (id: number): Promise<Seance | null > => {
    try {
      const token = getAccessToken();
      const response: AxiosResponse<Seance> = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching seance with id ${id}:`, error);
      return null;
    }
  },

  addSeance: async (seanceRequest: Seance): Promise<Seance | null> => {
    try {
      const token = getAccessToken();
      const response: AxiosResponse<Seance> = await axios.post(API_URL, seanceRequest, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding seance:", error);
      return null;
    }
  },

  updateSeance: async (id: number, seanceRequest: Seance): Promise<Seance | null> => {
    try {
      const token = getAccessToken();
      const response: AxiosResponse<Seance> = await axios.put(`${API_URL}/${id}`, seanceRequest, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating seance with id ${id}:`, error);
      return null;
    }
  },

  deleteSeance: async (id: number): Promise<void> => {
    try {
      const token = getAccessToken();
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(`Error deleting seance with id ${id}:`, error);
    }
  },

  verifySeance: async (seances: extractedSeance[]): Promise<SeanceWithTds[] | null> => {
    try {
      const token = getAccessToken();      

      const response = await axios.post(`${API_URL}/Verify`, seances, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying seances:", error);
      return null;
    }
  },

  updateSchedule: async (seances: SeanceWithTds[]): Promise<void> => {
    try {
      const token = getAccessToken();      

      await axios.post(`${API_URL}/update-schedule`, seances, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      throw error;
    }
  },
  
  getSchedule: async (): Promise<SeanceWithTds[]> => {
    try {
      const token = getAccessToken();
      const response: AxiosResponse<SeanceWithTds[]> = await axios.get(`${API_URL}/schedule`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all seances:", error);
      throw error;
    }
  }
};

export default SeanceService;
