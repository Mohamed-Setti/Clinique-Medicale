package tn.itbs.backend.Dto;



import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;
import tn.itbs.backend.enums.RendezVousStatut;


@Data

public class RendezVousDTO {
	
	private int idRendezVous ;	
	private LocalDate date ;	
	private LocalTime heure ;	
	private String motif ; 
	private RendezVousStatut statue ;
	private int idPatient;
	private int idMedecin ;
	
}
