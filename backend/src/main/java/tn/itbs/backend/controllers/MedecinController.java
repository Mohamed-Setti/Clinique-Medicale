package tn.itbs.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.itbs.backend.Dto.MedecinDTO;
import tn.itbs.backend.Mapper.MedecinMapper;
import tn.itbs.backend.services.MedecinService;

@RestController                          
@RequestMapping("/Medecin")
public class MedecinController {

    @Autowired
    private MedecinService ms;

    @Autowired
    private MedecinMapper mm;

    @PostMapping("/Add")
    public void ajouterMedecin(@RequestBody MedecinDTO m) {
        ms.ajouterMedecin(mm.fromDTO(m));
    }

    @PutMapping("/Update/{id}")          
    public void miseajourMedecin(@PathVariable("id") int idMedecin,
                                  @RequestBody MedecinDTO m) {
        ms.miseajourMedecin(idMedecin, mm.fromDTO(m));
    }

    @DeleteMapping("/Delete/{id}")
    public void supprimerMedecin(@PathVariable("id") int idMedecin) {
        
        ms.supprimerMedecin(idMedecin);
    }

    @GetMapping("/all")
    public List<MedecinDTO> getAll() {
        return mm.toDTOList(ms.getAll());
    }

    @GetMapping("/Specialite/{specialite}")   
    public List<MedecinDTO> trouverMedecinparSpecialite(@PathVariable String specialite) {
        return mm.toDTOList(ms.trouverMedcinparSpecalite(specialite));
    }

    @GetMapping("/Disponibilite/{disponibilite}") 
    public List<MedecinDTO> trouverMedecinparDisponibilite(@PathVariable Boolean disponibilite) {
        return mm.toDTOList(ms.trouverMedcinparDisponibilite(disponibilite));
    }
}