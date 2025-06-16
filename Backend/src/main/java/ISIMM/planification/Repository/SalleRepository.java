package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalleRepository extends JpaRepository<Salle, String>{

}
