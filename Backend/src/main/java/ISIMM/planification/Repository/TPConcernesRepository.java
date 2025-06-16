package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Enteties.TPConcernes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TPConcernesRepository extends JpaRepository<TPConcernes, Long>{

    public List<TPConcernes> findBySeance(Seance seance);

}
