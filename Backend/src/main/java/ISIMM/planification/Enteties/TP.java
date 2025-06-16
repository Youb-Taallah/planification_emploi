package ISIMM.planification.Enteties;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TP {
    @Id
    private String id;

    private int nbEtudiants;

    @ManyToOne
    private TD TD;

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

    public ISIMM.planification.Enteties.TD getTD() {
        return TD;
    }

    public void setTD(ISIMM.planification.Enteties.TD TD) {
        this.TD = TD;
    }

    @Override
    public String toString() {
        return "TP{" +
                "id='" + id + '\'' +
                ", nbEtudiants=" + nbEtudiants +
                ", TD=" + TD +
                '}';
    }
}


