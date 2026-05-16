package tn.itbs.backend.services;



import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tn.itbs.backend.Dto.RendezVousDTO;
import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.entites.RendezVous;
import tn.itbs.backend.repository.MedecinRepository;
import tn.itbs.backend.repository.PatientRepository;
import tn.itbs.backend.repository.RendezVousRepository;

@Service
public class RendezVousService {
	@Autowired
	private RendezVousRepository rvr;
	
	@Autowired
	private MedecinRepository mr;
	
	@Autowired
	private PatientRepository pr;
	
	public List<RendezVous> getAll(){
		return rvr.findAll();
	}
	
	public List<RendezVous> getAllbyPatient(int idPatient){
		Patient p = pr.findById(idPatient)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient non trouvé"));
		return rvr.findByPatient(p);
	}
	
	public List<RendezVous> getAllbyMedecin(int idMedecin){
		Medecin m = mr.findById(idMedecin)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medecin non trouvé"));
		return rvr.findByMedecin(m);
	}
	public RendezVous trouverRendezVousparId(int idRenndezVous) {
		return rvr.findById(idRenndezVous)
	             .orElseThrow(() -> new RuntimeException("Rendez-Vous not found with id: " + idRenndezVous));
	}
	
	public List<RendezVous> trouverRondezVousparDate(LocalDate date){
		return rvr.findByDate(date);
	}

	public List<RendezVous> trouverRondezVousparHeure(LocalTime heure){
		return rvr.findByHeure(heure);
	}
	
	public RendezVous trouverRendezVousparDateetHeure(LocalDate date, LocalTime heure) {
		return rvr.findByDateAndHeure(date, heure);
	}
	
	public List<RendezVous> trouverRendezVousparDateentre(LocalDate dateDebut, LocalDate dateFin) {
		return rvr.findByDateBetween(dateDebut,dateFin);
	}
	
	public List<RendezVous> trouverRendezVousparMedecinetDateentre(Medecin m, LocalDate dateDebut, LocalDate dateFin) {
		return rvr.findByMedecinAndDateBetween(m,dateDebut,dateFin);
	}
	
	public List<RendezVous> trouverRendezVousparPatientetDateetHeure(Patient p, LocalDate dateDebut, LocalDate dateFin) {
		return rvr.findByPatientAndDateBetween(p,dateDebut,dateFin);
	}
	
	public RendezVous trouverRendezVousparMedecinetDateetHeure(Medecin m, LocalDate date, LocalTime heure) {
		return rvr.findByMedecinAndDateAndHeure(m,date, heure);
	}
		
	public List<RendezVous> trouverRondezVousparStatue(String statue){
		return rvr.findByStatut(statue);
	}
	
	public void ajouterRendezVous (RendezVousDTO rvDto) {
		 Medecin m = mr.findById(rvDto.getIdMedecin())
	                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medecin non trouvé"));

	        Patient p = pr.findById(rvDto.getIdPatient())
	                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient non trouvé"));

	        RendezVous rv = new RendezVous();
	        rv.setDate(rvDto.getDate());
	        rv.setHeure(rvDto.getHeure());
	        rv.setMotif(rvDto.getMotif());
	        rv.setStatut(rvDto.getStatut());
	        rv.setMedecin(m);
	        rv.setPatient(p);

	        rvr.save(rv);
	}
	
	public void supprimerRendezVous(int idrendezVous) {
		rvr.deleteById(idrendezVous);
	}
	
	public ResponseEntity<String> miseajourRendezVous (int idRendezVous, RendezVousDTO rvDto) {
		RendezVous rv = rvr.findById(idRendezVous)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-Vous non trouvé"));

        Medecin m = mr.findById(rvDto.getIdMedecin())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medecin non trouvé"));

        Patient p = pr.findById(rvDto.getIdPatient())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient non trouvé"));

        rv.setDate(rvDto.getDate());
        rv.setHeure(rvDto.getHeure());
        rv.setMotif(rvDto.getMotif());
        rv.setStatut(rvDto.getStatut());
        rv.setMedecin(m);
        rv.setPatient(p);

        rvr.save(rv);
    
		return ResponseEntity.ok("Rendez-Vous mis à jour avec succès");
	}
	
}
