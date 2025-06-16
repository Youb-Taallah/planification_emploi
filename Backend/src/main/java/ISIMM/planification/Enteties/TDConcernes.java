package ISIMM.planification.Enteties;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TDConcernes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private TD td;

    @ManyToOne
    @JoinColumn(name = "seance_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Seance seance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TD getTd() {
        return td;
    }

    public void setTd(TD td) {
        this.td = td;
    }

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }
}
