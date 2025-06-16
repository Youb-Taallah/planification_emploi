package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Matiere;
import ISIMM.planification.Enteties.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesseurRepository extends JpaRepository<Professeur, Long>{

    public Professeur findByNom(String nom);

    public boolean existsByNom(String nom);

    public Professeur findById(long Id);


}
