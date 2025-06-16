package ISIMM.planification.Services;

import ISIMM.planification.Enteties.*;
import ISIMM.planification.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SeanceService {

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private TDConcernesRepository tdConcernesRepository;

    @Autowired
    private TPConcernesRepository tpConcernesRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private MatiereRepository matiereRepository;

    public List<Seance> getAllSeances() {
        return seanceRepository.findAll();
    }

    public Optional<Seance> getSeanceById(Long id) {
        return seanceRepository.findById(id);
    }

    public Seance saveSeance(Seance seance, List<TD> tdConcernesList, List<TP> tpConcernesList) {

        Professeur professeur = professeurRepository.findByNom(seance.getProfesseur().getNom());

        Matiere matiere = matiereRepository.findByNom(seance.getMatiere().getNom()).getFirst();

        seance.setProfesseur(professeur);

        seance.setMatiere(matiere);

        if (seance.getNature() == null ) seance.setNature("1/7");

        // Save the Seance first to ensure it has an ID
        Seance savedSeance = seanceRepository.save(seance);

        // If there are TDConcernes, associate them with the saved Seance and save them
        if (tdConcernesList != null && !tdConcernesList.isEmpty()) {

            for (TD td : tdConcernesList) {
                TDConcernes tdConcernes = new TDConcernes();
                tdConcernes.setTd(td);
                tdConcernes.setSeance(savedSeance); // Link TDConcernes to the Seance
                tdConcernesRepository.save(tdConcernes); // Save each TDConcernes
            }
        }

        if (tpConcernesList != null && !tpConcernesList.isEmpty()) {
            for (TP tp : tpConcernesList) {
                TPConcernes tpConcernes = new TPConcernes();
                tpConcernes.setTp(tp);
                tpConcernes.setSeance(savedSeance);
                tpConcernesRepository.save(tpConcernes);
            }
        }

        return savedSeance;
    }

    public void deleteSeance(Long id) {
        seanceRepository.deleteById(id);
    }

    public void deleteAllSeances() {
        tdConcernesRepository.deleteAll();
        tpConcernesRepository.deleteAll();
        seanceRepository.deleteAll();
    }

    public List<Seance> getSeancesByProfesseurId(Long professeurId) {
        return seanceRepository.findByProfesseurId(professeurId);
    }

    public List<Seance> getSeancesBySalleId(String salleId) {
        return seanceRepository.findBySalleId(salleId);
    }

    public Seance completeSeance(Seance seance) {

        Professeur professeur = professeurRepository.findByNom(seance.getProfesseur().getNom());
        List<Matiere> matiere = matiereRepository.findByNomContaining(seance.getMatiere().getNom());
        seance.setProfesseur(professeur);
        seance.setMatiere(matiere.getFirst());

        return seance;
    }


}
