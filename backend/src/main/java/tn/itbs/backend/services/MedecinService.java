package tn.itbs.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.repository.MedecinRepository;

@Service
public class MedecinService {
	@Autowired
	private MedecinRepository mr ;
	
	public List<Medecin> trouverMedcinparSpecalite(String specialite){
		return mr.findBySpecialite(specialite);
	}
	
	public List<Medecin> trouverMedcinparDisponibilite(Boolean disponibilite){
		return mr.findByDisponibilite(disponibilite);
	}
	
	public void ajouterMedecin(Medecin m) {
		mr.save(m);
	}
	
	public void supprimerMedecin(int idMedecin) {
		mr.deleteById(idMedecin);
	}
}
