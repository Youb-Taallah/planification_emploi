package ISIMM.planification.Controllers;

import ISIMM.planification.Controllers.dto.SeanceRequest;
import ISIMM.planification.Controllers.dto.SeanceWithTds;
import ISIMM.planification.Controllers.dto.extractedSeance;
import ISIMM.planification.Enteties.*;
import ISIMM.planification.Repository.MatiereRepository;
import ISIMM.planification.Repository.SectionRepository;
import ISIMM.planification.Repository.TDConcernesRepository;
import ISIMM.planification.Services.SeanceService;
import ISIMM.planification.Services.TDConcernesService;
import ISIMM.planification.Services.TPConcernesService;
import ISIMM.planification.Services.VerifService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/seances")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;

    @Autowired
    private VerifService verifService;

    @Autowired
    private MatiereRepository matiereRepository;

    @Autowired
    private TDConcernesService tdConcernesService;

    @Autowired
    private TPConcernesService tpConcernesService;

    @GetMapping
    public ResponseEntity<List<Seance>> getAllSeances() {
        List<Seance> seances = seanceService.getAllSeances();
        return new ResponseEntity<>(seances, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeanceById(@PathVariable Long id) {
        Optional<Seance> seance = seanceService.getSeanceById(id);

        if (seance.isPresent()) {
            return ResponseEntity.ok(seance.get());
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "La séance avec l'ID " + id + " est introuvable.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<?> addSeance(@RequestBody SeanceRequest seanceRequest) {

        Seance seance = seanceRequest.getSeance();
        List<TD> tds = seanceRequest.getTds();
        List<TP> tps = seanceRequest.getTps();

        Map<String, String> errorResponse = new HashMap<>();

        // Vérification de l'existence du professeur par nom
        if (seance.getProfesseur() == null || !verifService.verifProfesseurByNom(seance.getProfesseur().getNom())) {
            errorResponse.put("error", "Le professeur '" + (seance.getProfesseur() != null ? seance.getProfesseur().getNom() : "null") + "' n'existe pas.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Vérification de l'existence de la matière par nom
        if (seance.getMatiere() == null || !verifService.verifMatiereByNom(seance.getMatiere().getNom())) {
            errorResponse.put("error", "La matière '" + (seance.getMatiere() != null ? seance.getMatiere().getNom() : "null") + "' n'existe pas.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        if (seance.getSalle() == null || !verifService.verifSalleById(seance.getSalle().getId())) {
            errorResponse.put("error", "La Salle '" + (seance.getSalle() != null ? seance.getSalle().getId() : "null") + "' n'existe pas.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Vérification de la disponibilité de la salle
        if (!verifService.verifDisponibiliteSalle(seance.getSalle(), seance.getJour(), seance.getTemps(), seance.getNature())) {
            errorResponse.put("error", "La salle avec l'ID " + (seance.getSalle() != null ? seance.getSalle().getId() : "null") + " est déjà occupée à cette heure.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Vérifications lorsque le type de saéance est "CR"
        if (seance.getType().equals("CR")) {
            // Vérification de l'existence de la section
            if (seance.getSection() == null || !verifService.verifSectionById(seance.getSection().getId())) {
                errorResponse.put("error", "La section avec l'ID " + (seance.getSection() != null ? seance.getSection().getId() : "null") + " n'existe pas.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }
        // Vérifications lorsque le type de saéance est "TP" ou "C.I" ou "TD"
        else {
            // Vérification de l'existence des TDs
            if (tds == null || tds.isEmpty()) {
                errorResponse.put("error", "Aucun TD spécifié pour la séance.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
            for (TD td : tds) {
                if (!verifService.verifTdById(td.getId())) {
                    errorResponse.put("error", "Le TD avec l'ID " + td.getId() + " n'existe pas.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
                }
            }
            // Vérification que les td's spécifiés ont la meme section
            if (!verifService.verifTdsWithSameSection(tds)){
                errorResponse.put("error", "Les TD spécifié ne sont pas de meme Section.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }

        // Vérification de l'existance de la matiere dans le plan d'etude de la section
        if (!verifService.verifEtudierSectionMatiere(matiereRepository.findByNom(seance.getMatiere().getNom()).getFirst(),seance.getSection())){
            errorResponse.put("error", "La section avec l'ID " + (seance.getSection() != null ? seance.getSection().getId() : "null") + " n'a pas la matiere "+seance.getMatiere().getNom()+" en plan d'etude");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        // Sauvegarde de la séance
        Seance savedSeance = seanceService.saveSeance(seance, tds, tps);
        return new ResponseEntity<>(savedSeance, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeance(@PathVariable Long id, @RequestBody  SeanceRequest seanceRequest) {
        Optional<Seance> existingSeance = seanceService.getSeanceById(id);
        if (existingSeance.isPresent()) {
            seanceRequest.getSeance().setId(id);

            List<TDConcernes> list=tdConcernesService.findBySeance(existingSeance.get());

            list.forEach(td-> tdConcernesService.deleteTDConcernes(td.getId()));

            Seance updatedSeance = seanceService.saveSeance(seanceRequest.getSeance(), seanceRequest.getTds(), seanceRequest.getTps());
            return new ResponseEntity<>(updatedSeance, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeance(@PathVariable Long id) {
        Optional<Seance> existingSeance = seanceService.getSeanceById(id);

        List<TDConcernes> list=tdConcernesService.findBySeance(existingSeance.get());

        list.forEach(td-> tdConcernesService.deleteTDConcernes(td.getId()));

        if (existingSeance.isPresent()) {
            seanceService.deleteSeance(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "La séance avec l'ID " + id + " n'existe pas.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PutMapping
    public ResponseEntity<List<Seance>> getSeancesByProfesseur(@RequestBody Long professeurId) {
        List<Seance> seances = seanceService.getSeancesByProfesseurId(professeurId);
        if (seances.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(seances, HttpStatus.OK);
    }

    @PostMapping("/Verify")
    public ResponseEntity<?> verifySeance(@RequestBody List<extractedSeance> request) {
        List<SeanceRequest> validSeances = new ArrayList<>();
        List<String> errors = new ArrayList<>();

        for (extractedSeance seance : request) {
            SeanceRequest seanceAndTd = seance.generateSeance();
            try {
                if (verifService.verifSeance(seanceAndTd)) {
                    // add the id's of professor and matiere to save the séances correctly
                    Seance seancee = seanceService.completeSeance(seanceAndTd.getSeance());
                    seanceAndTd.setSeance(seancee);
                    validSeances.add(seanceAndTd);
                }
            } catch (Exception e) {
                errors.add("Error in seance: Day: " + seance.getJours() +
                        ", Time: " + seance.getTemps() +
                        ", Salle: " + seance.getSalle() +
                        ", Exception: " + e.getMessage());
            }
        }
        if (errors.isEmpty()) {
            return ResponseEntity.ok(validSeances);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
    }

    @GetMapping("/{id}/tds")
    public ResponseEntity<?> getTdConcernesBySeance(@PathVariable Long id) {
        Seance seance = new Seance();
        seance.setId(id);
        List<TDConcernes> tds = tdConcernesService.findBySeance(seance);
        if (tds.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tds, HttpStatus.OK);
    }

    @PostMapping("/update-schedule")
    public ResponseEntity<?> updateSchedule(@RequestBody List<SeanceRequest> seances) {
        Map<String, String> response = new HashMap<>();
        try {
            seanceService.deleteAllSeances();
            for (SeanceRequest seance : seances) {
                seanceService.saveSeance(seance.getSeance(), seance.getTds(), seance.getTps());
            }
            response.put("message", "All seances updated successfully.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("message", "Failed to update seances: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/schedule")
    public ResponseEntity<?> getSchedule() {

        List<Seance> seances = seanceService.getAllSeances();
        List<SeanceWithTds> resultSeances = new ArrayList<>();
        for (Seance seance : seances) {
            SeanceWithTds se = new SeanceWithTds();
            List<TDConcernes> tds = tdConcernesService.findBySeance(seance);
            List<TPConcernes> tps = tpConcernesService.findBySeance(seance);
            se.setTps(tps);
            se.setTds(tds);
            se.setSeance(seance);
            resultSeances.add(se);
        }
        return new ResponseEntity<>(resultSeances, HttpStatus.OK);
    }


}
