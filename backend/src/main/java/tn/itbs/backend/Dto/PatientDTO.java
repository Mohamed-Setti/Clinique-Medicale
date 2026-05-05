package tn.itbs.backend.Dto;

import java.sql.Date;

import lombok.Data;

@Data
public class PatientDTO {
	
	private int idPatient ;
	private String nom ;
	private Date dateDeNaissance ;
	private String numTel;
}
