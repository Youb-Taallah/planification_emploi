package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Matiere;
import ISIMM.planification.Repository.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatiereService {

    @Autowired
    private MatiereRepository matiereRepository;

    // Get all Matieres
    public List<Matiere> getAllMatieres() {
        return matiereRepository.findAll();
    }

    // Get a Matiere by its ID
    public Matiere getMatiereById(String id) {
        return matiereRepository.findById(id).orElse(null);
    }

    // Create a new Matiere
    public Matiere createMatiere(Matiere matiere) {
        return matiereRepository.save(matiere);
    }

    // Update an existing Matiere
    public Matiere updateMatiere(String id, Matiere matiereDetails) {
        Matiere existingMatiere = matiereRepository.findById(id).orElse(null);
        if (existingMatiere != null) {
            existingMatiere.setNom(matiereDetails.getNom());
            return matiereRepository.save(existingMatiere);
        }
        return null; // Return null if Matiere is not found
    }

    // Delete a Matiere
    public void deleteMatiere(String id) {
        Matiere matiere = matiereRepository.findById(id).orElse(null);
        if (matiere != null) {
            matiereRepository.delete(matiere);
        }
    }
}
