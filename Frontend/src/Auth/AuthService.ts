import axios from "axios";
import { UseAuthStore } from "./AuthStore";
import { removeTokens, saveTokens } from "./AuthUtils";
import { getAccessToken } from './AuthUtils';
import { User} from "../types/entities";


const API_URL = "http://localhost:8081/api/auth";
const { setAuthStatus, setUsername, setRole, setLoading } = UseAuthStore.getState();

// Validate the token and return true if it is valid, otherwise remove the tokens and return false
export const validateToken = async (): Promise<void> => {
  try {

    setLoading(true);
    const token = getAccessToken();
    const response = await axios.post<User>(`${API_URL}/validate-token`, { accessToken: token });
    setUsername(response.data.username);
    setRole(response.data.role as "ADMIN" | "STUDENT" | "MANAGER" | "PROFESSOR");
    setAuthStatus(true);
    setLoading(false);

  } catch (error) {
    removeTokens();
    setLoading(false);
    throw error;
  }
};


interface LoginResponse {
  token: string;
  refreshToken: string;
  role: string;
}

// Login the user and save the tokens and user details in the auth store
export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      username: email,
      password,
    });
    
    saveTokens(response.data.token, response.data.refreshToken);
    const { setAuthStatus, setUsername, setRole } = UseAuthStore.getState();
    setUsername(email);
    setRole(response.data.role as "ADMIN" | "STUDENT" | "MANAGER" | "PROFESSOR");
    setAuthStatus(true);

  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout the user and remove the tokens and user details from the auth store
export const logout = async (): Promise<void> => {
  removeTokens();
  const { setAuthStatus, setUsername, setRole } = UseAuthStore.getState();
  setAuthStatus(false);
  setUsername("");
  setRole("GUEST");
};

// Register a student
export const registerStudent = async (name: string, email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/register-student`, {
      username: name,
      email: email,
      password,
    });
  } catch (error) {
    console.error("Error during student registration:", error);
    throw error;
  }
};

// Register a professor
export const registerProfessor = async (name: string, email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/register-professor`, {
      username: name,
      email: email,
      password,
    });
  } catch (error) {
    console.error("Error during professor registration:", error);
    throw error;
  }
};