package tn.itbs.backend.entites;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class Consultation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idConsultation ;
	@JoinColumn(name = "idRendezVous")
    private RendezVous rendezVous;
    @Column(nullable = false)
    private String diagnostic;
    private String ordonnance;
    private Float prix;
	
}
