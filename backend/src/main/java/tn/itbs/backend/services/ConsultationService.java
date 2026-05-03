package tn.itbs.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.itbs.backend.entites.Consultation;
import tn.itbs.backend.repository.ConsultationRepository;

@Service
public class ConsultationService {
	@Autowired
	private ConsultationRepository cr ;
	
	public void ajouterConsultation(Consultation c) {
		cr.save(c);
	}
	
	public void supprimerConsultation(int idConsultation) {
		cr.deleteById(idConsultation);
	}
}
