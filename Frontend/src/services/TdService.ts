import axios, { AxiosResponse } from 'axios';
import { TD } from '../types/entities'; 
import { getAccessToken } from '../Auth/AuthUtils';

const API_URL = 'http://localhost:8081/api/tds';

export const TdService = {

  getAllTDs: async (): Promise<TD[]> => {
    const token = getAccessToken();

    try {
      const response: AxiosResponse<TD[]> = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all TDs:', error);
      return [];
    }
  },

  getTDById: async (id: string): Promise<TD | null> => {
    const token = getAccessToken();

    try {
      const response: AxiosResponse<TD> = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch TD with ID ${id}:`, error);
      throw error;
    }
  }
};

export default TdService;
