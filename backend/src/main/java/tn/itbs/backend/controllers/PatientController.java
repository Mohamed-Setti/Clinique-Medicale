package tn.itbs.backend.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.services.PatientService;

@RestController
@RequestMapping("/Patient")
public class PatientController {

    @Autowired
    private PatientService ps;

    // ✅ CREATE
    @PostMapping("/add")
    public void ajouterPatient(@RequestBody Patient p) {
        ps.ajouterPatient(p);
    }

    // ✅ UPDATE
    @PutMapping("/update/{id}")
    public void miseajourPatient(@PathVariable("id") int idPatient,
                                 @RequestBody Patient p) {
        ps.miseajourPatient(idPatient, p);
    }

    // ✅ DELETE
    @DeleteMapping("/delete/{id}")
    public void supprimerPatient(@PathVariable("id") int idPatient) {
        ps.supprimerPatient(idPatient);
    }

    // ✅ GET ALL
    @GetMapping("/all")
    public List<Patient> getAll() {
        return ps.getAll();
    }

    // ✅ SEARCH BY PHONE
    @GetMapping("/numTel/{numTel}")
    public Patient trouverPatientparNumTel(@PathVariable String numTel) {
        return ps.trouverPatientparNumTel(numTel);
    }

    // ✅ SEARCH BY NAME
    @GetMapping("/nom/{nom}")
    public List<Patient> trouverPatientparNom(@PathVariable String nom) {
        return ps.trouverPatientparNom(nom);
    }

    // ✅ SEARCH BY DATE
    @GetMapping("/date/{datedenaissance}")
    public List<Patient> trouverPatientparDatedeNaissance(@PathVariable Date datedenaissance) {
        return ps.trouverPatientparDateDeNaissance(datedenaissance);
    }
}