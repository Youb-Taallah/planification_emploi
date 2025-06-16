import { Seance, Section, Matiere, Salle, Professeur } from '../types/entities';

// Sample section data
const infoSection: Section = {
  id: "ING1_INFO",
  nom: "Ingénierie Informatique 1ère année",
  niveau: 1
};

// Sample professors
const professor: Professeur = { id: 1, nom: "Sarra MEJRI", mail: "sara.mejri@example.com", numTel: "123456789", grade: "Professor", departement: "CS" };

// Sample courses
const matiere: Matiere ={ id: "ING1_INFO", nom: "Ingénierie et interopérabilité des systèmes" };

// Sample rooms
const rooms: Salle[] = [
  { id: "A-B", capacite: 60, etage: 1 },
  { id: "A-32", capacite: 40, etage: 3 },
  { id: "C-15", capacite: 30, etage: 2 },
  { id: "LAB-1", capacite: 25, etage: 0 },
  { id: "A-33", capacite: 35, etage: 3 }
];

// Updated schedule data with varied durations
export const mockSchedule: Seance[] = [
  // Monday courses
  {
    id: 1,
    jour: "MONDAY",
    temps: "08:00",
    duree: 2,
    type: "CR",
    nature: "Cours magistral",
    matiere: matiere,
    salle: rooms[0],
    professeur: professor,
    section: infoSection
  },
  {
    id: 2,
    jour: "MONDAY",
    temps: "13:00",
    duree: 1.5,
    type: "TP",
    nature: "Travaux pratiques",
    matiere: matiere,
    salle: rooms[3],
    professeur: professor,
    section: infoSection
  },

  // Tuesday courses
  {
    id: 3,
    jour: "TUESDAY",
    temps: "08:30",
    duree: 3,
    type: "CR",
    nature: "Cours magistral",
    matiere: matiere,
    salle: rooms[0],
    professeur: professor,
    section: infoSection
  },
  {
    id: 4,
    jour: "TUESDAY",
    temps: "14:45",
    duree: 2,
    type: "TD",
    nature: "Travaux dirigés",
    matiere: matiere,
    salle: rooms[2],
    professeur: professor,
    section: infoSection
  },

  // Wednesday courses
  {
    id: 5,
    jour: "WEDNESDAY",
    temps: "10:15",
    duree: 3,
    type: "TP",
    nature: "1/7",
    matiere: matiere,
    salle: rooms[3],
    professeur: professor,
    section: infoSection
  },

  // Thursday courses
  {
    id: 6,
    jour: "THURSDAY",
    temps: "08:30",
    duree: 2,
    type: "CR",
    nature: "1/7",
    matiere: matiere,
    salle: rooms[0],
    professeur: professor,
    section: infoSection
  },
  {
    id: 7,
    jour: "THURSDAY",
    temps: "14:00",
    duree: 3,
    type: "TP",
    nature: "1/7",
    matiere: matiere,
    salle: rooms[3],
    professeur: professor,
    section: infoSection
  },

  // Friday courses
  {
    id: 8,
    jour: "FRIDAY",
    temps: "08:30",
    duree: 1.5,
    type: "CR",
    nature: "1/7",
    matiere: matiere,
    salle: rooms[0],
    professeur: professor,
    section: infoSection
  },
  {
    id: 9,
    jour: "FRIDAY",
    temps: "10:15",
    duree: 1.5,
    type: "TP",
    nature: "1/7",
    matiere: matiere,
    salle: rooms[3],
    professeur: professor,
    section: infoSection
  }
];

