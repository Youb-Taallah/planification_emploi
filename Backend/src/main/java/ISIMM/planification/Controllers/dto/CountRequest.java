package ISIMM.planification.Controllers.dto;

import java.time.LocalDate;

public class CountRequest {

    private String NomProfesseur;

    private int Month;


    public String getNomProfesseur() {
        return NomProfesseur;
    }

    public void setNomProfesseur(String nomProfesseur) {
        NomProfesseur = nomProfesseur;
    }

    public int getMonth() {
        return Month;
    }

    public void setMonth(int mounth) {
        Month = mounth;
    }



}
