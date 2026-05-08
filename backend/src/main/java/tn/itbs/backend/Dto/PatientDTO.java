package tn.itbs.backend.Dto;


import java.time.LocalDate;

import lombok.Data;

@Data
public class PatientDTO {
	
	private int idPatient ;
	private String nom ;
	private LocalDate dateDeNaissance ;
	private String numTel;
}
