package tn.itbs.backend.Dto;

import java.sql.Date;
import java.sql.Time;

import lombok.Data;


@Data

public class RendezVousDTO {
	
	private int idRendezVous ;	
	private Date date ;	
	private Time heure ;	
	private String motif ; 
	private String statue ;
	
	
}
