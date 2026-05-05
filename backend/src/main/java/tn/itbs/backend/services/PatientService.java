package tn.itbs.backend.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.repository.PatientRepository;

@Service
public class PatientService {
	@Autowired
	private PatientRepository pr ;
	
	public List<Patient> getAll () {
		return pr.findAll();
	}
	
	public Patient trouverPatientparNumTel (String numTel) {
		return pr.findByNumTel(numTel);
	}
	
	public List<Patient> trouverPatientparNom (String nom) {
		return pr.findByNom(nom);
	}
	
	public List<Patient> trouverPatientparDateDeNaissance (Date datedenaissance) {
		return pr.findByDateDeNaissance(datedenaissance);
	}
	
	public void ajouterPatient(Patient p) {
		pr.save(p);
	}
	
	public void supprimerPatient(int idPatient) {
		pr.deleteById(idPatient);
	}
	
	public ResponseEntity<String> miseajourPatient (int idPatient, Patient P) {
		pr.findById(idPatient).ifPresentOrElse(
				p->{
					p.setIdPatient(P.getIdPatient());
					p.setNom(P.getNom());
					p.setDateDeNaissance(P.getDateDeNaissance());
					p.setNumTel(P.getNumTel());
				}
				, 
				()-> {
					throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient non trouvé");
				});
		return ResponseEntity.ok("Patient mis à jour avec succès");
	}
}
