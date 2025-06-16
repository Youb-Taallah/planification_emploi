package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Professeur;
import ISIMM.planification.Repository.ProfesseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesseurService {

    @Autowired
    private ProfesseurRepository professeurRepository;

    // Get all Professeurs
    public List<Professeur> getAllProfesseurs() {
        return professeurRepository.findAll();
    }

    // Get a Professeur by its ID
    public Professeur getProfesseurById(Long id) {
        return professeurRepository.findById(id).orElse(null);
    }

    // Create a new Professeur
    public Professeur createProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }

    // Update an existing Professeur
    public Professeur updateProfesseur(Long id, Professeur professeurDetails) {
        Professeur existingProfesseur = professeurRepository.findById(id).orElse(null);
        if (existingProfesseur != null) {
            existingProfesseur.setNom(professeurDetails.getNom());
            existingProfesseur.setMail(professeurDetails.getMail());
            existingProfesseur.setNumTel(professeurDetails.getNumTel());
            existingProfesseur.setGrade(professeurDetails.getGrade());
            existingProfesseur.setDepartement(professeurDetails.getDepartement());
            return professeurRepository.save(existingProfesseur);
        }
        return null;
    }

    // Delete a Professeur
    public void deleteProfesseur(Long id) {
        Professeur professeur = professeurRepository.findById(id).orElse(null);
        if (professeur != null) {
            professeurRepository.delete(professeur);
        }
    }
}
