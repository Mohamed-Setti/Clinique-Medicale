package tn.itbs.backend.controllers;

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

import tn.itbs.backend.Dto.ConsultationDTO;
import tn.itbs.backend.Mapper.ConsultationMapper;
import tn.itbs.backend.services.ConsultationService;


@RestController
@RequestMapping("/Consultation")
public class ConsultationController {

    @Autowired
    private ConsultationService cs;

    @Autowired
    private ConsultationMapper cm ;
    
    @GetMapping("/All")
    public List<ConsultationDTO> getAll() {
        return  cm.toDTOList( cs.getAll());
    }
    
    @GetMapping("/id/{idConsultation}")
	public ConsultationDTO trouverConsultationparId(@PathVariable int idConsultation) {
		return cm.toDTO(cs.trouverConsultationparId(idConsultation));
	}
    
    
    @GetMapping("/getByRendezVous/{idRendezVous}")
    public ResponseEntity<ConsultationDTO> getbyRendezVousId(@PathVariable int idRendezVous) {
        var consultation = cs.getbyRendezVousId(idRendezVous);
        if (consultation == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cm.toDTO(consultation));
    }

    @PostMapping("/Add")
    public void ajouterConsultation(@RequestBody ConsultationDTO consultationDto) {
        cs.ajouterConsultation(consultationDto);
    }

    @PutMapping("/Update/{id}")
    public ResponseEntity<String> miseajourConsultation(@PathVariable("id") int idConsultation,
                               @RequestBody ConsultationDTO consultation) {
        return cs.miseajourConsultation(idConsultation, consultation);
    }

    @DeleteMapping("/Delete/{id}")
    public void supprimerConsultation(@PathVariable("id") int idConsultation) {
        cs.supprimerConsultation(idConsultation);
    }
}