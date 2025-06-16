package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.TP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TPRepository extends JpaRepository<TP, String>{

}
