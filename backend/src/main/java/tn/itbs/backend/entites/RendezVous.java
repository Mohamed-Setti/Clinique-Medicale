package tn.itbs.backend.entites;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	private int idRendezVous ;
	
	@JoinColumn(name = "idPatient")
	private Patient P ;
	
	@JoinColumn(name = "idMedecin")
	private Medecin M ;
	
	@Column(nullable = false)
	private Date date ;
	@Column(nullable = false)
	private Time heure ;
	@Column(nullable = false)
	private String motif ; 
	@Column(nullable = false)
	private String statue ;
	
	
}
