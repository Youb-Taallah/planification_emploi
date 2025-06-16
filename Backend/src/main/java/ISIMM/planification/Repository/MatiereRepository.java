package ISIMM.planification.Repository;
import ISIMM.planification.Enteties.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, String>{
    public List<Matiere> findByNom(String nom);
    public List<Matiere> findByNomContaining(String nom);
    public boolean existsByNom(String nom);

}
