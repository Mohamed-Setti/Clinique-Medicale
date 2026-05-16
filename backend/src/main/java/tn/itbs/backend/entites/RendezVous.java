package tn.itbs.backend.entites;



import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.itbs.backend.enums.RendezVousStatut;

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
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime heure;

    @Column(nullable = false)
    private String motif;

    @Column(nullable = false)
    private RendezVousStatut statut;
}