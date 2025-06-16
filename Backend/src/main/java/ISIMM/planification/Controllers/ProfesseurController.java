package ISIMM.planification.Controllers;

import ISIMM.planification.Enteties.Professeur;
import ISIMM.planification.Repository.ProfesseurRepository;
import ISIMM.planification.Services.ProfesseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professeurs")
public class ProfesseurController {

    @Autowired
    ProfesseurService professeurService;

    @GetMapping
    public List<Professeur> getAllProfesseurs() {
        return professeurService.getAllProfesseurs();
    }

    @GetMapping("/{id}")
    public Professeur getProfesseurById(@PathVariable Long id) {
        return professeurService.getProfesseurById(id);
    }


}