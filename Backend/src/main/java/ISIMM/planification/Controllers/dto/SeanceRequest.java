package ISIMM.planification.Controllers.dto;

import ISIMM.planification.Enteties.Seance;
import ISIMM.planification.Enteties.TD;
import ISIMM.planification.Enteties.TP;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class SeanceRequest {

    private Seance seance;
    private List<TD> tds;
    private List<TP> tps;

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }

    public List<TD> getTds() {
        return tds;
    }

    public void setTds(List<TD> tds) {
        this.tds = tds;
    }

    public List<TP> getTps() {
        return tps;
    }

    public void setTps(List<TP> tps) {
        this.tps = tps;
    }

    @Override
    public String toString() {
        return "SeanceRequest{" +
                "seance=" + seance +
                ", tds=" + tds +
                ", tps=" + tps +
                '}';
    }
}
