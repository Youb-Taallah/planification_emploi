package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, String>{

    public Section findByNom(String nom);

}
