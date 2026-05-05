package tn.itbs.backend.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.services.PatientService;

@Controller
@RequestMapping("/Patient")

public class PatientController {
	@Autowired
	private PatientService ps ;
	
	@PutMapping("/Add")
	public void ajouterPatient(@PathVariable Patient p) {
		ps.ajouterPatient(p);
	} 
	
	@PutMapping("/Update/{id}")
	public void miseajourPatient(@PathVariable int idPatient, Patient p) {
		ps.miseajourPatient(idPatient, p);
	}

	@DeleteMapping("/Delete/{id}")
	public void supprimerPatient(@PathVariable int idPatient) {
		ps.supprimerPatient(idPatient);
	}
	
	@GetMapping("/getAll")
	public List<Patient> getAll (){
		return ps.getAll();
	}
	
	@GetMapping("/numTel")
	public Patient trouverPatientparNumTel(@PathVariable String numTel) {
		return ps.trouverPatientparNumTel(numTel);
	}
	
	@GetMapping("/nom")
	public List<Patient> trouverPatientparNom(@PathVariable String nom) {
		return ps.trouverPatientparNom(nom);
	}
	
	@GetMapping("/datedenaissance")
	public List<Patient> trouverPatientparDatedeNaissance(@PathVariable Date datedenaissance) {
		return ps.trouverPatientparDateDeNaissance(datedenaissance);
	}
	
}
