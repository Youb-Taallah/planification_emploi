package ISIMM.planification.Controllers;


import ISIMM.planification.Enteties.Salle;
import ISIMM.planification.Enteties.User;
import ISIMM.planification.Enteties.Section;
import ISIMM.planification.Repository.UserRepository;
import ISIMM.planification.Services.SalleService;
import ISIMM.planification.Services.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private SalleService salleService;

    @Autowired
    private SectionService sectionService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/rooms")
    public List<Salle> getAllSalles() {
        return salleService.getAllSalles();
    }

    @GetMapping("/sections")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/students")
    public List<User> getStudents() {
        return userRepository.findByRole("STUDENT");
    }
}
