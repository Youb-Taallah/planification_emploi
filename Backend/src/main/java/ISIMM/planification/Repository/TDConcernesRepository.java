package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Salle;
import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Enteties.TDConcernes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TDConcernesRepository extends JpaRepository<TDConcernes, Long>{

    public List<TDConcernes> findBySeance(Seance seance);

}
