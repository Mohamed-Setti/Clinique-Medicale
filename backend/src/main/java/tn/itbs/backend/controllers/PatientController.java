package tn.itbs.backend.controllers;

import java.sql.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.itbs.backend.Dto.PatientDTO;
import tn.itbs.backend.Mapper.PatientMapper;
import tn.itbs.backend.services.PatientService;

@RestController
@RequestMapping("/Patient")
public class PatientController {

    @Autowired
    private PatientService ps ;
    @Autowired
    private PatientMapper pm ;
    // ✅ CREATE
    @PostMapping("/add")
    public void ajouterPatient(@RequestBody PatientDTO p) {
        ps.ajouterPatient(pm.fromDTO(p));
    }

    // ✅ UPDATE
    @PutMapping("/update/{id}")
    public void miseajourPatient(@PathVariable("id") int idPatient,
                                 @RequestBody PatientDTO p) {
        ps.miseajourPatient(idPatient, pm.fromDTO(p));
    }

    // ✅ DELETE
    @DeleteMapping("/delete/{id}")
    public void supprimerPatient(@PathVariable("id") int idPatient) {
        ps.supprimerPatient(idPatient);
    }

    // ✅ GET ALL
    @GetMapping("/all")
    public List<PatientDTO> getAll() {
        return pm.toDTOList(ps.getAll());
    }

    // ✅ SEARCH BY PHONE
    @GetMapping("/numTel/{numTel}")
    public PatientDTO trouverPatientparNumTel(@PathVariable String numTel) {
        return pm.toDTO(ps.trouverPatientparNumTel(numTel));
    }

    // ✅ SEARCH BY NAME
    @GetMapping("/nom/{nom}")
    public List<PatientDTO> trouverPatientparNom(@PathVariable String nom) {
        return pm.toDTOList(ps.trouverPatientparNom(nom));
    }

    // ✅ SEARCH BY DATE
    @GetMapping("/date/{datedenaissance}")
    public List<PatientDTO> trouverPatientparDatedeNaissance(@PathVariable Date datedenaissance) {
        return pm.toDTOList(ps.trouverPatientparDateDeNaissance(datedenaissance));
    }
}