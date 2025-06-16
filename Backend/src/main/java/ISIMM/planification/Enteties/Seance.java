package ISIMM.planification.Enteties;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jour;
    private String temps;
    private Float duree;
    private String type;
    private String nature;

    @ManyToOne
    private Section section;

    @ManyToOne
    private Matiere matiere;

    @ManyToOne
    private Salle salle;

    @ManyToOne
    private Professeur professeur;

    public String getJour() {
        return jour;
    }

    public void setJour(String jour) {
        this.jour = jour;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTemps() {
        return temps;
    }

    public void setTemps(String temps) {
        this.temps = temps;
    }

    public Float getDuree() {
        return duree;
    }

    public void setDuree(Float duree) {
        this.duree = duree;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public Professeur getProfesseur() {
        return professeur;
    }

    public void setProfesseur(Professeur professeur) {
        this.professeur = professeur;
    }

    public Matiere getMatiere() { return matiere; }

    public void setMatiere(Matiere matiere)  { this.matiere = matiere; }

    public Section getSection() { return section; }

    public void setSection(Section section) { this.section = section; }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    @Override
    public String toString() {
        return "Seance{" +
                "id=" + id +
                ", jour='" + jour + '\'' +
                ", temps='" + temps + '\'' +
                ", professeur=" + professeur +
                ", section=" + section +
                ", matiere=" + matiere +
                '}';
    }
}
