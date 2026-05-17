package tn.itbs.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tn.itbs.backend.Dto.ConsultationDTO;
import tn.itbs.backend.entites.Consultation;
import tn.itbs.backend.entites.RendezVous;
import tn.itbs.backend.repository.ConsultationRepository;
import tn.itbs.backend.repository.RendezVousRepository;

@Service
public class ConsultationService {
	@Autowired
	private ConsultationRepository cr ;
	
	@Autowired
	private RendezVousRepository rvr ;
	
	
	public List<Consultation> getAll (){
		return cr.findAll();
	}
	
	public Consultation getbyRendezVousId(int idRendezvous){
	    RendezVous rv = rvr.findById(idRendezvous)
	        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-Vous non trouvé"));
	    Consultation consultation = cr.findByRendezVous(rv);
	    if (consultation == null) {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consultation non trouvée pour ce rendez-vous");
	    }
	    return consultation;
	}
	
	
	
	
	public void ajouterConsultation(ConsultationDTO cDto) {
		RendezVous rv = rvr.findById(cDto.getIdRendezVous())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-Vous non trouvé"));
		
		Consultation c = new Consultation();
		c.setDiagnostic(cDto.getDiagnostic());
		c.setOrdonnance(cDto.getOrdonnance());
		c.setPrix(cDto.getPrix());
		c.setRendezVous(rv);
		cr.save(c);
	}
	
	public void supprimerConsultation(int idConsultation) {
		cr.deleteById(idConsultation);
	}

	public ResponseEntity<String> miseajourConsultation(int idConsultation, ConsultationDTO consultation) {
		Consultation c = cr.findById(consultation.getIdConsultation())
					.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Consultation non trouvé"));
		
		RendezVous rv = rvr.findById(consultation.getIdRendezVous())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-Vous non trouvé"));

        c.setDiagnostic(consultation.getDiagnostic());
        c.setOrdonnance(consultation.getOrdonnance());
        c.setPrix(consultation.getPrix());
        c.setRendezVous(rv);
        cr.save(c);
    
		return ResponseEntity.ok("Consultation mis à jour avec succès");
	}

	public Consultation trouverConsultationparId(int idConsultation) {
		// TODO Auto-generated method stub
		return cr.findById(idConsultation)
				.orElseThrow(() -> new RuntimeException("Consultation not found with id: " + idConsultation));
	}
	
}
