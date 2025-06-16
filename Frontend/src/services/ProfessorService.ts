import axios, { AxiosResponse } from 'axios';
import { Professeur ,Salle, Section, User} from '../types/entities';
import { getAccessToken } from '../Auth/AuthUtils';

const API_URL = 'http://localhost:8081/api/professeurs';

const API_URL_STATS = 'http://localhost:8081/api/stats';


export const ProfessorService = {

  // hedhom juste nest7a9oha fel stats mta3 dashboard khater 
  getAllStudents: async (): Promise<User[]> => {
    const token = getAccessToken();
    const response: AxiosResponse<User[]> = await axios.get(`${API_URL_STATS}/students`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  getAllRooms: async (): Promise<Salle[]> => {
    const token = getAccessToken();

    try {
      const response: AxiosResponse<Salle[]> = await axios.get(`${API_URL_STATS}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all rooms:', error);
      return [];
    }
  },

  getAllSections: async (): Promise<Section[]> => {
    const token = getAccessToken();
    const response: AxiosResponse<Section[]> = await axios.get(`${API_URL_STATS}/sections`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },





  
  getAllProfessors: async (): Promise<Professeur[]> => {
    const token = getAccessToken();

    try {
      const response: AxiosResponse<Professeur[]> = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all professors:', error);
      return [];
    }
  },

  getProfessorById: async (id: number): Promise<Professeur | null> => {
    const token = getAccessToken();
    try {
      const response: AxiosResponse<Professeur> = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch professor by ID:', error);
      return null;
    }
  }
};

export default ProfessorService;
