package ISIMM.planification.Services;

import ISIMM.planification.Enteties.Salle;
import ISIMM.planification.Repository.SalleRepository;
import ISIMM.planification.Repository.SeanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SalleService {

    @Autowired
    private SalleRepository salleRepository;

    @Autowired
    private SeanceRepository seanceRepository;

    public boolean isSalleDisponible(Salle salle, String jour, String temps) {
        return !seanceRepository.existsBySalleAndJourAndTemps(salle,jour, temps);
    }

    public List<Salle> getAllSalles() {
        return salleRepository.findAll();
    }


    public Optional<Salle> getSalleById(String id) {
        return salleRepository.findById(id);
    }

    public Salle saveSalle(Salle salle) {
        return salleRepository.save(salle);
    }

    public void deleteSalle(String id) {
        salleRepository.deleteById(id);
    }
}
