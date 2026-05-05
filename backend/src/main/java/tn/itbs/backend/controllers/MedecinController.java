package tn.itbs.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.services.MedecinService;

@Controller
@RequestMapping("/Medecin")
public class MedecinController {

	@Autowired
	private MedecinService ms ;
	
	@PostMapping("/Add")
	public void ajouterPatient(@PathVariable Medecin m) {
		ms.ajouterMedecin(m);
	} 
	
	@PostMapping("/Update/{id}")
	public void miseajourPatient(@PathVariable int idMedecin, Medecin m) {
		ms.miseajourMedecin(idMedecin, m);
	}

	@DeleteMapping("/Delete/{id}")
	public void supprimerMedecin(@PathVariable int idMedecin) {
		ms.supprimerMedecin(idMedecin);
	}
	
	@GetMapping("/getAll")
	public List<Medecin> getAll (){
		return ms.getAll();
	}
	
	@GetMapping("/Specialite")
	public List<Medecin>  trouverMedecinparSpecialite(@PathVariable String specialite) {
		return ms.trouverMedcinparSpecalite(specialite);
	}
	
	@GetMapping("/Disponibilite")
	public List<Medecin>  trouverMedecinparDisponibilite(@PathVariable Boolean Disponibilite) {
		return ms.trouverMedcinparDisponibilite(Disponibilite);
	}
}
