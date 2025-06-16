package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Etude;
import ISIMM.planification.Enteties.Matiere;
import ISIMM.planification.Enteties.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudeRepository extends JpaRepository<Etude, Long>{

    public boolean existsByMatiereAndSection(Matiere matiere, Section section);

}
