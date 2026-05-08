package tn.itbs.backend.entites;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPatient;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private LocalDate dateDeNaissance;

    @Column(nullable = false, unique = true)
    private String numTel;

    @OneToMany(mappedBy = "patient")
    private List<RendezVous> listP = new ArrayList<>();
}