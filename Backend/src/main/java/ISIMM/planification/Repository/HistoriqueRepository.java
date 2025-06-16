package ISIMM.planification.Repository;

import ISIMM.planification.Enteties.Historique;
import ISIMM.planification.Enteties.Professeur;
import ISIMM.planification.Enteties.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HistoriqueRepository extends JpaRepository<Historique, Long>{


    @Query("SELECT COALESCE(SUM(h.duree), 0) FROM Historique h WHERE h.professeur.nom = :professeurNom AND FUNCTION('MONTH', h.date) = :month AND h.etat = 'present' ")
    public int countHoursByProfesseurNomAndMonth(@Param("professeurNom") String professeurNom, @Param("month") int month);

    public boolean existsById(Long id);

    public boolean existsByDateAndProfesseurAndTemps(LocalDate date, Professeur professeur, String temps);

    public Historique findByDateAndProfesseurAndTemps(LocalDate date, Professeur professeur, String temps);

    public List<Historique> findByProfesseurId(Long professeurId);
}
