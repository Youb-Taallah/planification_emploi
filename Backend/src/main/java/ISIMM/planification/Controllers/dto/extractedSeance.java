package ISIMM.planification.Controllers.dto;

import ISIMM.planification.Enteties.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class extractedSeance {

    private String duree;
    private String enseignant;
    private String jours;
    private String matiere;
    private String nature;
    private String salle;
    private String section;
    private String temps;
    private String type;
    private List<String> tds;
    private List<String> tps;


    public SeanceRequest generateSeance() {

        Seance seance = new Seance();
        List<TD> tdsList = new ArrayList<>();
        List<TP> tpsList = new ArrayList<>();


        // Parse start and end times with flexible format (spaces around '-')
        String[] timeParts = this.temps.split("\\s*-\\s*"); // Split on '-' with optional spaces
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime startTime = LocalTime.parse(timeParts[0].trim(), formatter);
        LocalTime endTime = LocalTime.parse(timeParts[1].trim(), formatter);

        // Calculate duration in hours
        float duree;
        if (!this.duree.isEmpty()) {
            String[] parts = this.duree.split("[hH]");
            int hours = Integer.parseInt(parts[0]);
            int minutes = (parts.length > 1) ? Integer.parseInt(parts[1]) : 0;
            duree = hours + (minutes / 60.0f);
        }
        else duree = (float) Duration.between(startTime, endTime).toMinutes() / 60;

        //Setting Temps and Duree
        seance.setTemps(startTime.toString());
        seance.setDuree(duree);

        //Setting Jour in UpperCase
        seance.setJour(this.jours.toUpperCase());

        //Setting Type and nature
        seance.setType(this.type);
        seance.setNature(this.nature.isEmpty() ? "1/7" : this.nature); // Default nature if empty

        //Setting Matiere
        Matiere matiere = new Matiere();
        matiere.setNom(this.matiere);
        seance.setMatiere(matiere);

        //Setting Salle
        Salle salle = new Salle();
        salle.setId(this.salle);
        seance.setSalle(salle);

        //Setting Professeur
        Professeur professeur = new Professeur();
        professeur.setNom(this.enseignant);
        seance.setProfesseur(professeur);

        // Setting Section (in some cases imported section could be a TD )
        Section section = new Section();
        if (this.section != null && !this.section.isEmpty()) {
            section.setId(this.section);
            seance.setSection(section);
        }
        if (tds!=null && !tds.isEmpty()) {
            for (String td : tds) {
                TD td2 = new TD();
                td2.setId(td);
                tdsList.add(td2);
            }
        }
        if (tps!=null && !tps.isEmpty()) {
            for (String tp : tps) {
                TP tp2 = new TP();
                tp2.setId(tp);
                tpsList.add(tp2);
            }
        }

        SeanceRequest seanceRequest = new SeanceRequest();

        seanceRequest.setTds(tdsList);
        seanceRequest.setTps(tpsList);
        seanceRequest.setSeance(seance);

        return seanceRequest;
    }

    public String getDuree() {
        return duree;
    }

    public void setDuree(String duree) {
        this.duree = duree;
    }

    public String getEnseignant() {
        return enseignant;
    }

    public void setEnseignant(String enseignant) {
        this.enseignant = enseignant;
    }

    public String getJours() {
        return jours;
    }

    public void setJours(String jours) {
        this.jours = jours;
    }

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public String getSalle() {
        return salle;
    }

    public void setSalle(String salle) {
        this.salle = salle;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public List<String> getTds() {
        return tds;
    }

    public void setTds(List<String> tds) {
        this.tds = tds;
    }

    public String getTemps() {
        return temps;
    }

    public void setTemps(String temps) {
        this.temps = temps;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getTps() {
        return tps;
    }

    public void setTps(List<String> tps) {
        this.tps = tps;
    }


    @Override
    public String toString() {
        return "extractedSeance{" +
                "duree='" + duree + '\'' +
                ", enseignant='" + enseignant + '\'' +
                ", jours='" + jours + '\'' +
                ", matiere='" + matiere + '\'' +
                ", nature='" + nature + '\'' +
                ", salle='" + salle + '\'' +
                ", section='" + section + '\'' +
                ", temps='" + temps + '\'' +
                ", type='" + type + '\'' +
                ", tds=" + tds +
                ", tps=" + tps +
                '}';
    }
}