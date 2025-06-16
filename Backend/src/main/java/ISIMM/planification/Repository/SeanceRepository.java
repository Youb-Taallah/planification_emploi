package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Salle;
import ISIMM.planification.Enteties.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SeanceRepository extends JpaRepository<Seance, Long>{

    public List<Seance> findByProfesseurId(Long id);

    public List<Seance> findBySalleId(String id);

    public boolean existsBySalleAndJourAndTemps(Salle salle, String jour, String temps);

    public List<Seance> findBySalleAndJourAndTemps(Salle salle, String jour, String temps);

    public List<Seance> findByJour(String jour);

}
