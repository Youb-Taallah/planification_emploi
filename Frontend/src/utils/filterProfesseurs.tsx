import { Professeur } from '../types/entities';

export const filterProfesseurs = (professeurs: Professeur[], searchTerm: string): Professeur[] => {
  if (!searchTerm.trim()) {
    return professeurs;
  }
  
  const searchLower = searchTerm.toLowerCase();
  
  return professeurs.filter((professeur) => {
    return (
      professeur.nom.toLowerCase().includes(searchLower) ||
      professeur.mail.toLowerCase().includes(searchLower) ||
      professeur.numTel.toLowerCase().includes(searchLower) ||
      professeur.grade.toLowerCase().includes(searchLower) ||
      professeur.departement.toLowerCase().includes(searchLower)
    );
  });
};

export const countByGrade = (professeurs: Professeur[]): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};
  
  professeurs.forEach((professeur) => {
    const { grade } = professeur;
    counts[grade] = (counts[grade] || 0) + 1;
  });
  
  return counts;
};