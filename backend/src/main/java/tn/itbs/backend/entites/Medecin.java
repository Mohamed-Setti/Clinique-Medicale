package tn.itbs.backend.entites;

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
public class Medecin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMedecin;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String specialite;

    @Column(nullable = false)
    private Boolean disponibilite;

    @OneToMany(mappedBy = "medecin")
    private List<RendezVous> listM = new ArrayList<>();
}
