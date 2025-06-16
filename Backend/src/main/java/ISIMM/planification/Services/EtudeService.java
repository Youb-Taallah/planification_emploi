package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Etude;
import ISIMM.planification.Repository.EtudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EtudeService {

    @Autowired
    private EtudeRepository etudeRepository;

    public List<Etude> getAllEtudes(){
        return etudeRepository.findAll();
    }

    public Etude getEtudeById(Long id){
        return etudeRepository.findById(id).orElse(null);
    }

    public Etude createEtude(Etude etude){
        return etudeRepository.save(etude);
    }

    public Etude updateEtude(Long id, Etude etudeDetails){
        Etude existingEtude = etudeRepository.findById(id).orElse(null);
        if (existingEtude != null) {
            existingEtude.setCoefficient(etudeDetails.getCoefficient()); // Update coefficient
            existingEtude.setSection(etudeDetails.getSection()); // Update section
            existingEtude.setMatiere(etudeDetails.getMatiere()); // Update matiere
            return etudeRepository.save(existingEtude);
        }
        return null;
    }

    public void deleteEtude(Long id){
        Etude etude = etudeRepository.findById(id).orElse(null);
        if (etude != null) {
            etudeRepository.delete(etude);
        }
    }
}

