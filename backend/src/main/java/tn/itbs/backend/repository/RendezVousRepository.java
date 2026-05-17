package tn.itbs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.entites.RendezVous;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalTime;




@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Integer>{
	
	RendezVous findByIdRendezVous(int idRendezVous);
	
	List<RendezVous> findByDate(LocalDate date);
	
	List<RendezVous> findByHeure(LocalTime heure);
	
	List<RendezVous> findByStatut(String statue);
		
	RendezVous findByMedecinAndDateAndHeure(Medecin m, LocalDate date, LocalTime heure);
	
	List<RendezVous> findByPatient(Patient p);
	
	List<RendezVous> findByMedecin(Medecin m);
	
	RendezVous findByDateAndHeure(LocalDate date, LocalTime heure);
	
	List<RendezVous> findByDateBetween(LocalDate dateDebut,LocalDate dateFin);
	List<RendezVous> findByMedecinAndDateBetween(Medecin m, LocalDate dateDebut,LocalDate dateFin);
	
	List<RendezVous> findByPatientAndDateBetween(Patient p, LocalDate dateDebut,LocalDate dateFin);

}
