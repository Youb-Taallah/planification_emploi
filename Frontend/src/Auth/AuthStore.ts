import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  role: "GUEST" | "ADMIN" | "STUDENT" | "MANAGER" | "PROFESSOR";
  username: string;
  loading: boolean;
  setAuthStatus: (status: boolean) => void;
  setRole: (role: "GUEST" | "ADMIN" | "STUDENT" | "MANAGER" | "PROFESSOR") => void;
  setUsername: (username: string) => void;
  setLoading: (loading: boolean) => void;
};

export const UseAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: 'GUEST',
  username: '',
  loading: false,
  setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
  setRole: (role: "GUEST" | "ADMIN" | "STUDENT" | "MANAGER" | "PROFESSOR") => set({ role }),
  setUsername: (username: string) => set({ username }),
  setLoading: (loading: boolean) => set({ loading }),
}));
