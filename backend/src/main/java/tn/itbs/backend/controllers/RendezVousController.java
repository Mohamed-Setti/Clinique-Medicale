package tn.itbs.backend.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import tn.itbs.backend.entites.RendezVous;
import tn.itbs.backend.services.RendezVousService;

@Controller
@RequestMapping("/RendezVous")
public class RendezVousController {
	
	@Autowired
	private RendezVousService rvs ;
	
	@PostMapping("/Add")
	public void ajouterRendezVous(RendezVous rv) {
		rvs.ajouterRendezVous(rv);
	}
	
	@PostMapping("/Update/{id}")
	public void miseajourRendezVous(int idRendezVous, RendezVous rv) {
		rvs.miseajourRendezVous(idRendezVous,rv);
	}
	
	@DeleteMapping("/Delete/{id}")
	public void supprimerRendezVous(int idRendezVous) {
		rvs.supprimerRendezVous(idRendezVous);
	}
	
	@GetMapping("/getAll")
	public List<RendezVous> getAll(){
		return rvs.getAll();
	}
	
	@GetMapping("/betweenDates")
	public List<RendezVous> trouverRendezVousentreDateDebutetDateFin(Date dateDebut,Date dateFin ){
		return rvs.trouverRendezVousparDateentre(dateDebut, dateFin);
	}
	
}
