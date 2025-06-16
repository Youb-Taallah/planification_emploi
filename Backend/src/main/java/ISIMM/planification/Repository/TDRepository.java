package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.TD;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TDRepository extends JpaRepository<TD, String>{

}
