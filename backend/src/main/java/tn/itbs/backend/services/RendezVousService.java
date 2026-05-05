package tn.itbs.backend.services;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.entites.RendezVous;
import tn.itbs.backend.repository.RendezVousRepository;

@Service
public class RendezVousService {
	@Autowired
	private RendezVousRepository rvr;
	
	public List<RendezVous> getAll(){
		return rvr.findAll();
	}
	
	public List<RendezVous> trouverRondezVousparDate(Date date){
		return rvr.findByDate(date);
	}

	public List<RendezVous> trouverRondezVousparHeure(Time heure){
		return rvr.findByHeure(heure);
	}
	
	public RendezVous trouverRendezVousparDateetHeure(Date date, Time heure) {
		return rvr.findByDateAndHeure(date, heure);
	}
	
	public List<RendezVous> trouverRendezVousparDateentre(Date dateDebut, Date dateFin) {
		return rvr.findByDateBetween(dateDebut,dateFin);
	}
	
	public List<RendezVous> trouverRendezVousparMedecinetDateentre(Medecin m, Date dateDebut, Date dateFin) {
		return rvr.findByMAndDateBetween(m,dateDebut,dateFin);
	}
	
	public List<RendezVous> trouverRendezVousparPatientetDateetHeure(Patient p, Date dateDebut, Date dateFin) {
		return rvr.findByPAndDateBetween(p,dateDebut,dateFin);
	}
	
	public RendezVous trouverRendezVousparMedecinetDateetHeure(Medecin m, Date date, Time heure) {
		return rvr.findByMAndDateAndHeure(m,date, heure);
	}
		
	public List<RendezVous> trouverRondezVousparStatue(String statue){
		return rvr.findByStatue(statue);
	}
	
	public void ajouterRendezVous (RendezVous rv) {
		rvr.save(rv);
	}
	
	public void supprimerRendezVous(int idrendezVous) {
		rvr.deleteById(idrendezVous);
	}
	
	public ResponseEntity<String> miseajourRendezVous (int idRendezVous, RendezVous RV) {
		rvr.findById(idRendezVous).ifPresentOrElse(
				rv->{
					rv.setIdRendezVous(RV.getIdRendezVous());
					rv.setDate(RV.getDate());
					rv.setHeure(RV.getHeure());
					rv.setMotif(RV.getMotif());
					rv.setStatue(RV.getStatue());
					rv.setM(RV.getM());
					rv.setP(RV.getP());
				}
				, 
				()-> {
					throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rendez-Vous non trouvé");
				});
		return ResponseEntity.ok("Rendez-Vous mis à jour avec succès");
	}
	
}
