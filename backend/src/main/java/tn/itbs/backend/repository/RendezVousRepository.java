package tn.itbs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.backend.entites.Medecin;
import tn.itbs.backend.entites.Patient;
import tn.itbs.backend.entites.RendezVous;
import java.util.List;
import java.sql.Date;
import java.sql.Time;




@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Integer>{
	
	
	List<RendezVous> findByDate(Date date);
	
	List<RendezVous> findByHeure(Time heure);
	
	List<RendezVous> findByStatue(String statue);
		
	RendezVous findByMedecinAndDateAndHeure(Medecin m, Date date, Time heure);
	
	List<RendezVous> findByPatient(Patient p);
	
	RendezVous findByDateAndHeure(Date date, Time heure);
	
	List<RendezVous> findByDateBetween(Date dateDebut,Date dateFin);
	List<RendezVous> findByMedecinAndDateBetween(Medecin m, Date dateDebut,Date dateFin);
	
	List<RendezVous> findByPatientAndDateBetween(Patient p, Date dateDebut,Date dateFin);

}
