package tn.itbs.backend.Dto;


import lombok.Data;


@Data

public class ConsultationDTO {

	private int idConsultation ;
    private String diagnostic;
    private String ordonnance;
    private Float prix;
    private int idRendezVous ;
	
}
