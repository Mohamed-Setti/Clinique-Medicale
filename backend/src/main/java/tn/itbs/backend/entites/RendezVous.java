package tn.itbs.backend.entites;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRendezVous;

    @ManyToOne
    @JoinColumn(name = "idPatient")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "idMedecin")
    private Medecin medecin;

    @OneToOne
    @JoinColumn(name = "idConsultation")
    private Consultation consultation;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Time heure;

    @Column(nullable = false)
    private String motif;

    @Column(nullable = false)
    private String statue;
}