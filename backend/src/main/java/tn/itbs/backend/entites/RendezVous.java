package tn.itbs.backend.entites;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class RendezVous {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idRendezVous ;
	
	@JoinColumn(name = "idPatient")
	private Patient P ;
	
	@JoinColumn(name = "idMedecin")
	private Medecin M ;
	
	@Column(nullable = false)
	private Date date ;
	private Time heure ;
	private String motif ; 
	private String statue ;
	
	
}
