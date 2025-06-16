package ISIMM.planification.Controllers;

import ISIMM.planification.Controllers.dto.CountRequest;
import ISIMM.planification.Controllers.dto.UpdateEtatRequest;
import ISIMM.planification.Services.HistoriqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ISIMM.planification.Enteties.Historique;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/historique")
public class HistoriqueController {

    @Autowired
    private HistoriqueService historiqueService;

    @GetMapping("/{ProfId}")
    public ResponseEntity<List<Historique>> getHistorique(@PathVariable Long ProfId) {
        List<Historique> l=historiqueService.getHistoriqueByProfId(ProfId);
        if (l.isEmpty()){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(l, HttpStatus.OK);
    }

    // ✅ Ajouter une séance dans l'historique (param could be 'today' or 'tomorrow' )
    @PostMapping
    public ResponseEntity<?> addHistorique(@RequestBody String day) {
        try{

            String jour;
            String etat;

            if (day.equals("today")) {
                etat = "present";
                jour = LocalDate.now().getDayOfWeek().toString();
            }
            else {
                etat = "pending";
                jour= LocalDate.now().plusDays(1).getDayOfWeek().toString();
            }
            historiqueService.updateHistoriqueByDay(jour,etat);
            return ResponseEntity.ok("updated historique successfully");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Supprimer une séance de l'historique
    @DeleteMapping("/delete/{historiqueId}")
    public ResponseEntity<?> deleteHistorique(@PathVariable Long historiqueId) {
        return historiqueService.supprimerHistorique(historiqueId);
    }

    //Compter les heures d'un professeur dans un mois donné
    @PostMapping("/countHours")
    public ResponseEntity<?> countHours(@RequestBody CountRequest request) {
        Map<String, Object> response = historiqueService.countHours(request);
        if (response.containsKey("error")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateEtat")
    public ResponseEntity<?> updateHistoriqueEtat(@RequestBody UpdateEtatRequest request) {
        return historiqueService.changeEtat(request.getId(),request.getEtat());
    }

}
