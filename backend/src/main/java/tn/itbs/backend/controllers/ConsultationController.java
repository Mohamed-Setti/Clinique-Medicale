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
import tn.itbs.backend.services.ConsultationService;

@RestController
@RequestMapping("/Consultation")
public class ConsultationController {

    @Autowired
    private ConsultationService consultationService;

    @GetMapping("/getAll")
    public List<ConsultationDTO> getAll() {
        return consultationService.getAll();
    }

    @PostMapping("/Add")
    public void ajouterConsultation(@RequestBody ConsultationDTO consultationDto) {
        consultationService.ajouterConsultation(consultationDto);
    }

    @PutMapping("/Update/{id}")
    public ResponseEntity<String> miseajourConsultation(@PathVariable("id") int idConsultation,
                               @RequestBody ConsultationDTO consultation) {
        return consultationService.miseajourConsultation(idConsultation, consultation);
    }

    @DeleteMapping("/Delete/{id}")
    public void supprimerConsultation(@PathVariable("id") int idConsultation) {
        consultationService.supprimerConsultation(idConsultation);
    }
}