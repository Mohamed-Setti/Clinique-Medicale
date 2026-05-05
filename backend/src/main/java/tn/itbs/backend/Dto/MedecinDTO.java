package tn.itbs.backend.Dto;


import lombok.Data;


@Data

public class MedecinDTO {
	
	private int idMedecin ;
	private String nom ;
	private String specialite ;
	private Boolean disponibilite ; 
	
}
