import { Professeur, Salle, Section, TD, Matiere, Historique } from '../types/entities';

// Mock Sections
export const mockSections: Section[] = [
  { id: '1', nom: 'Computer Science', niveau: 3 },
  { id: '2', nom: 'Mathematics', niveau: 2 },
  { id: '3', nom: 'Physics', niveau: 4 },
  { id: '4', nom: 'Chemistry', niveau: 1 },
  { id: '5', nom: 'Biology', niveau: 2 },
];

// Mock TDs
export const mockTDs: TD[] = [
  { id: 'TD1', nbEtudiants: 35, section: mockSections[0] },
  { id: 'TD2', nbEtudiants: 28, section: mockSections[0] },
  { id: 'TD3', nbEtudiants: 42, section: mockSections[1] },
  { id: 'TD4', nbEtudiants: 32, section: mockSections[2] },
  { id: 'TD5', nbEtudiants: 30, section: mockSections[3] },
  { id: 'TD6', nbEtudiants: 38, section: mockSections[4] },
];

// Mock Professors
export const mockProfessors: Professeur[] = [
  { id: 1, nom: 'Dr. Smith', mail: 'smith@university.edu', numTel: '123-456-7890', grade: 'Professor', departement: 'Computer Science' },
  { id: 2, nom: 'Dr. Johnson', mail: 'johnson@university.edu', numTel: '123-456-7891', grade: 'Associate Professor', departement: 'Mathematics' },
  { id: 3, nom: 'Dr. Williams', mail: 'williams@university.edu', numTel: '123-456-7892', grade: 'Assistant Professor', departement: 'Physics' },
  { id: 4, nom: 'Dr. Brown', mail: 'brown@university.edu', numTel: '123-456-7893', grade: 'Professor', departement: 'Chemistry' },
  { id: 5, nom: 'Dr. Jones', mail: 'jones@university.edu', numTel: '123-456-7894', grade: 'Professor', departement: 'Biology' },
];

// Mock Rooms
export const mockRooms: Salle[] = [
  { id: 'R101', capacite: 50, etage: 1 },
  { id: 'R102', capacite: 35, etage: 1 },
  { id: 'R201', capacite: 60, etage: 2 },
  { id: 'R202', capacite: 40, etage: 2 },
  { id: 'R301', capacite: 30, etage: 3 },
];

// Mock Subjects
export const mockSubjects: Matiere[] = [
  { id: 'CS101', nom: 'Introduction to Programming' },
  { id: 'MATH201', nom: 'Calculus II' },
  { id: 'PHYS301', nom: 'Quantum Mechanics' },
  { id: 'CHEM101', nom: 'General Chemistry' },
  { id: 'BIO201', nom: 'Cell Biology' },
];

// Mock History
export const mockHistory: Historique[] = [
  { 
    id: 1, 
    date: new Date('2025-05-15'), 
    temps: '10:00', 
    duree: 2, 
    type: 'Lecture', 
    etat: 'Completed', 
    matiere: mockSubjects[0], 
    salle: mockRooms[0], 
    professeur: mockProfessors[0] 
  },
  { 
    id: 2, 
    date: new Date('2025-05-16'), 
    temps: '14:00', 
    duree: 1.5, 
    type: 'Lab', 
    etat: 'Scheduled', 
    matiere: mockSubjects[1], 
    salle: mockRooms[1], 
    professeur: mockProfessors[1] 
  },
  { 
    id: 3, 
    date: new Date('2025-05-17'), 
    temps: '09:00', 
    duree: 2, 
    type: 'Seminar', 
    etat: 'Canceled', 
    matiere: mockSubjects[2], 
    salle: mockRooms[2], 
    professeur: mockProfessors[2] 
  },
];

// Stats helpers
export const getTotalStudents = (): number => {
  return mockTDs.reduce((total, td) => total + td.nbEtudiants, 0);
};

export const getTotalProfessors = (): number => {
  return mockProfessors.length;
};

export const getTotalSections = (): number => {
  return mockSections.length;
};

export const getTotalRooms = (): number => {
  return mockRooms.length;
};

export const getImportantDates = () => {
  return [
    {
      id: 1,
      title: 'Final Exams Week',
      date: 'May 15-20, 2025',
      type: 'exam',
      description: 'Final examinations for Spring semester 2025'
    },
    {
      id: 2,
      title: 'Summer Break',
      date: 'June 1-30, 2025',
      type: 'holiday',
      description: 'University closed for summer vacation'
    },
    {
      id: 3,
      title: 'Course Registration Deadline',
      date: 'April 30, 2025',
      type: 'deadline',
      description: 'Last day to register for Fall 2025 courses'
    },
    {
      id: 4,
      title: 'University Open Day',
      date: 'May 5, 2025',
      type: 'event',
      description: 'Annual university showcase for prospective students'
    },
    {
      id: 5,
      title: 'Mid-term Examinations',
      date: 'March 20-25, 2025',
      type: 'exam'
    },
    {
      id: 6,
      title: 'Spring Break',
      date: 'March 1-7, 2025',
      type: 'holiday'
    }
  ];
};