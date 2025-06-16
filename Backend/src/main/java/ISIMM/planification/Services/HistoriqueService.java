package ISIMM.planification.Services;

import ISIMM.planification.Controllers.dto.CountRequest;
import ISIMM.planification.Enteties.Historique;
import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Repository.HistoriqueRepository;
import ISIMM.planification.Repository.ProfesseurRepository;
import ISIMM.planification.Repository.SeanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class HistoriqueService {

    @Autowired
    private HistoriqueRepository historiqueRepository;

    @Autowired
    private SeanceRepository seanceRepository;

    @Autowired
    private ProfesseurRepository professeurRepository;

    public List<Historique> getHistoriqueByProfId(Long id) {
        return historiqueRepository.findByProfesseurId(id);
    }

    public void updateHistoriqueByDay(String day , String etat) {

        List<Seance> seances = seanceRepository.findByJour(day);

        seances.forEach(seance -> saveHistorique(seance.getId(), etat) );

    }

    public void saveHistorique(Long seanceId , String etat ) {

        Optional<Seance> seanceOptional = seanceRepository.findById(seanceId);

        if (seanceOptional.isPresent()) {

            Seance seance = seanceOptional.get();

            LocalDate today = LocalDate.now();
            LocalDate tomorrow = LocalDate.now().plusDays(1);

            LocalDate dateRecherche = etat.equals("present") ? today : tomorrow ;
            Historique historique = new Historique();

            if (historiqueRepository.existsByDateAndProfesseurAndTemps(dateRecherche,seance.getProfesseur(),seance.getTemps())){
                historique = historiqueRepository.findByDateAndProfesseurAndTemps(dateRecherche,seance.getProfesseur(),seance.getTemps());
                if (!historique.getEtat().equals("absent")) historique.setEtat(etat);
            }
            else{
                historique.setEtat(etat);
                historique.setDuree(seance.getDuree());
                historique.setMatiere(seance.getMatiere());
                historique.setProfesseur(seance.getProfesseur());
                historique.setType(seance.getType());
                historique.setSalle(seance.getSalle());
                historique.setTemps(seance.getTemps());

                if (etat.equals("present")) historique.setDate(today);
                else historique.setDate(tomorrow);
            }

            Historique savedHistorique = historiqueRepository.save(historique);
        }
    }

    public ResponseEntity<?> supprimerHistorique(Long historiqueId) {
        Optional<Historique> historiqueOptional = historiqueRepository.findById(historiqueId);

        if (historiqueOptional.isPresent()) {
            historiqueRepository.deleteById(historiqueId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "L'historique avec l'ID " + historiqueId + " a été supprimé avec succès.");
            return ResponseEntity.ok(response);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "L'historique avec l'ID " + historiqueId + " n'existe pas.");
        return ResponseEntity.badRequest().body(errorResponse);
    }

    public Map<String, Object> countHours(CountRequest request) {
        Map<String, Object> response = new HashMap<>();

        // Vérifier l'existence du professeur
        if (!professeurRepository.existsByNom(request.getNomProfesseur())) {
            response.put("error", "Le professeur avec le nom " + request.getNomProfesseur() + " n'existe pas.");
            return response;
        }

        // Calculer les heures
        int totalHours = historiqueRepository.countHoursByProfesseurNomAndMonth(request.getNomProfesseur(), request.getMonth());

        // Construire la réponse
        response.put("totalHours", totalHours);

        return response;
    }

    public  ResponseEntity<?> changeEtat(Long id, String etat){
        Optional<Historique> historiqueOptional = historiqueRepository.findById(id);
        if (historiqueOptional.isPresent()) {
            Historique historique = historiqueOptional.get();
            historique.setEtat(etat);
            historiqueRepository.save(historique);
            return ResponseEntity.ok("Succesfully Updated");
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "L'historique avec l'ID " + id + " n'existe pas.");
        return ResponseEntity.badRequest().body(errorResponse);

    }




}
