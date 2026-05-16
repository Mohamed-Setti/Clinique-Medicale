package tn.itbs.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.repository.MedecinRepository;

@Service
public class MedecinService {
	@Autowired
	private MedecinRepository mr ;
	
	public List<Medecin> getAll(){
		return mr.findAll();
	}
	
	public Medecin trouverMedecinparId (int idMedecin) {
		return mr.findById(idMedecin)
	             .orElseThrow(() -> new RuntimeException("Patient not found with id: " + idMedecin));
	}
	
	public List<Medecin> trouverMedcinparSpecalite(String specialite){
		return mr.findBySpecialite(specialite);
	}
	
	public List<Medecin> trouverMedcinparDisponibilite(){
		return mr.findByDisponibilite(true);
	}
	
	public void ajouterMedecin(Medecin mDto) {
		System.out.println(mDto.toString());
		
		Medecin m = new Medecin() ;
		m.setNom(mDto.getNom());
		m.setSpecialite(mDto.getSpecialite());
		m.setDisponibilite(mDto.getDisponibilite());
	
		mr.save(m);
	}
	
	public void supprimerMedecin(int idMedecin) {
		mr.deleteById(idMedecin);
	}
	
	public ResponseEntity<String> miseajourMedecin (int idMedecin, Medecin M ) {
		mr.findById(idMedecin).ifPresentOrElse(
				m->{
					m.setNom(M.getNom());
					m.setSpecialite(M.getSpecialite());
					m.setDisponibilite(M.getDisponibilite());
				}
				, 
				()-> {
					throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medecin non trouvé");
				});
		return ResponseEntity.ok("Medecin mis à jour avec succès");
	}
}
