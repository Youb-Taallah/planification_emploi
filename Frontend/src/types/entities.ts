export interface TP {
  id: string;
  nbEtudiants: number;
  td: TD;
};


export interface TD {
  id: string;
  nbEtudiants: number;
  section: Section;
};


export interface Salle {
  id: string;
  capacite: number;
  etage: number;
};


export type Professeur = {
  id: number;
  nom: string;
  mail: string;
  numTel: string;
  grade: string;
  departement: string;
};


export interface Section {
  id: string;
  nom: string;
  niveau: number;
};


export type Matiere = {
  id: string;
  nom: string;
};


export interface Etude {
  id: number; 
  coefficient: number; 
  section: Section; 
  matiere: Matiere; 
};


export interface Historique {
  id: number;  
  date: Date;
  temps: string;
  duree: number; 
  type: string;
  etat: string;
  matiere: Matiere;
  salle: Salle;
  professeur: Professeur;
};


export interface Seance {
  id: number;
  jour: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  temps: string;
  duree: number;
  type: string;
  nature: string;
  section?: Section;
  matiere: Matiere;
  salle: Salle;         
  professeur: Professeur; 
};


export interface TDConcernes {
  id: number;       
  td: TD;
  seance: Seance;
};

export interface TPConcernes {
  id: number;       
  tp: TP;          
  seance: Seance;
};


export interface User {
  id: number;
  username: string;
  email: string;  
  password: string;
  role: string;
};

export type GradeCount = {
  [key: string]: number;
};