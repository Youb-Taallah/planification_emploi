package ISIMM.planification.Services;

import ISIMM.planification.Controllers.dto.SeanceRequest;
import ISIMM.planification.Enteties.*;
import ISIMM.planification.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.support.RouterFunctionMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VerifService {

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private MatiereRepository matiereRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private TDRepository tdRepository;

    @Autowired
    private TPRepository tpRepository;

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private EtudeRepository etudeRepository;
    @Autowired
    private RouterFunctionMapping routerFunctionMapping;

    public boolean verifSeance(SeanceRequest seanceAndTd) throws Exception {

        Seance seance = seanceAndTd.getSeance();
        List<TD> tds = seanceAndTd.getTds();
        List<TP> tps = seanceAndTd.getTps();

        if (seance == null) throw new Exception("Seance is null");
        if ( !verifProfesseurByNom(seance.getProfesseur().getNom()) ) throw new Exception("Professeur non valide");
        if ( !verifMatiereByNom(seance.getMatiere().getNom()) ) throw new Exception("Matiere non valide");
        if ( !verifSalleById(seance.getSalle().getId()) ) throw new Exception("Salle non valide");
        if ( !verifType(seance.getType()) ) throw new Exception("Type non valide");
        if ( seance.getSection()!=null && !verifSectionById(seance.getSection().getId()) ) throw new Exception("Section non valide");
        if ( seance.getDuree() > 4 || seance.getDuree() < 1 ) throw new Exception("Duree non valide");
        if ( Integer.parseInt(seance.getTemps().split(":")[0])<8 || Integer.parseInt(seance.getTemps().split(":")[0])>17 ) throw new Exception("Temps non valide");
        for (TD td : tds) if ( !verifTdById(td.getId()) ) throw new Exception("TD non valide");
        for (TP tp : tps) if ( !verifTpById(tp.getId()) ) throw new Exception("TP non valide");

        return true;
    }

    public boolean verifType(String type){
        return type != null && ( type.equals("CR") || type.equals("C.I") || type.equals("TP") || type.equals("TD") || type.equals("CR/TD") );
    }

    // Vérifier l'existence d'une matière par son nom
    public boolean verifMatiereByNom(String nom) {
        return matiereRepository.existsByNom(nom);
    }

    // Vérifier l'existence d'une salle par son ID
    public boolean verifSalleById(String id) {
        return salleRepository.existsById(id);
    }

    // Vérifier l'existence d'un professeur par son nom
    public boolean verifProfesseurByNom(String nom) {
        return professeurRepository.existsByNom(nom);
    }

    // Vérifier l'existence d'une section par son ID
    public boolean verifSectionById(String id) {
        return sectionRepository.existsById(id);
    }

    // Vérifier l'existence d'un TD par son ID
    public boolean verifTdById(String id) {
        return tdRepository.existsById(id);
    }

    // Vérifier l'existence d'un TP par son ID
    public boolean verifTpById(String id) {
        return tpRepository.existsById(id);
    }

    public boolean verifDisponibiliteSalle(Salle salle, String jour, String temps, String nature){
        List<Seance> seances = seanceRepository.findBySalleAndJourAndTemps(salle, jour, temps);
        // Si il'ya pas aucune seance ou il'ya une seance par quinzaine alors la salle est disponible
        return seances == null || seances.isEmpty() || (seances.size()==1 && seances.getFirst().getNature().equals("1/15") && nature.equals("1/15")) ;
    }

    public boolean verifEtudierSectionMatiere(Matiere matiere, Section section) {
        return etudeRepository.existsByMatiereAndSection(matiere, section);
    }

    public boolean verifTdsWithSameSection(List<TD> tds){
        if (tds != null  && !tds.isEmpty() ){
            Optional<TD> firstTd = tdRepository.findById(tds.getFirst().getId());
            Section sec = firstTd.get().getSection();
            for (TD td : tds) {
                Section section = tdRepository.findById(td.getId()).get().getSection();
                if (!section.equals(sec)) {
                    return false; // If any TD has a different section, return false
                }
            }
            return true;
        }
        return false;
    }

}
