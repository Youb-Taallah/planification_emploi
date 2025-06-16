package ISIMM.planification.Enteties;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TD {
    @Id
    private String id;

    private int nbEtudiants;

    @ManyToOne
    private Section section;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getNbEtudiants() {
        return nbEtudiants;
    }

    public void setNbEtudiants(int nbEtudiants) {
        this.nbEtudiants = nbEtudiants;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }


    @Override
    public String toString() {
        return "TD{" +
                "id='" + id + '\'' +
                ", nbEtudiants=" + nbEtudiants +
                ", section=" + section +
                '}';
    }
}


