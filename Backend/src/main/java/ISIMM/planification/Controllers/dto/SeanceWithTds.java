package ISIMM.planification.Controllers.dto;

import ISIMM.planification.Enteties.*;

import java.util.List;

public class SeanceWithTds {

    private Seance seance;
    private List<TDConcernes> tds;
    private List<TPConcernes> tps;

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }

    public List<TDConcernes> getTds() {
        return tds;
    }

    public void setTds(List<TDConcernes> tds) {
        this.tds = tds;
    }

    public List<TPConcernes> getTps() {
        return tps;
    }

    public void setTps(List<TPConcernes> tps) {
        this.tps = tps;
    }
}
