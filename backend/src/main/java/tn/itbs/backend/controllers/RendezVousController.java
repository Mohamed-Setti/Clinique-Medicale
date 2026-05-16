package tn.itbs.backend.controllers;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.itbs.backend.Dto.RendezVousDTO;
import tn.itbs.backend.Mapper.RendezVousMapper;
import tn.itbs.backend.services.RendezVousService;

@RestController
@RequestMapping("/RendezVous")
public class RendezVousController {
	
	@Autowired
	private RendezVousService rvs ;
	@Autowired
	private RendezVousMapper rvm ;
	
	@PostMapping("/Add")
	public void ajouterRendezVous(@RequestBody RendezVousDTO rvDto) {
		rvs.ajouterRendezVous(rvDto);
	}
	
	
	
	@PutMapping("/Update/{id}")
	public ResponseEntity<String> miseajourRendezVous(@PathVariable int idRendezVous,@RequestBody RendezVousDTO rvDto) {
		return rvs.miseajourRendezVous(idRendezVous,rvDto);
	}
	
	@DeleteMapping("/Delete/{id}")
	public void supprimerRendezVous(@PathVariable int idRendezVous) {
		rvs.supprimerRendezVous(idRendezVous);
	}
	
	@GetMapping("/All")
	public List<RendezVousDTO> getAll(){
		return rvm.toDTOList(rvs.getAll());
	}
	
	
	@GetMapping("/id/{idRendezVous}")
	public RendezVousDTO trouverRendezVousparId(@PathVariable int idRendezVous) {
		return rvm.toDTO(rvs.trouverRendezVousparId(idRendezVous));
	}
	
	@GetMapping("/betweenDates")
	public List<RendezVousDTO> trouverRendezVousentreDateDebutetDateFin(LocalDate dateDebut,LocalDate dateFin ){
		return rvm.toDTOList(rvs.trouverRendezVousparDateentre(dateDebut, dateFin));
	}
	
}
