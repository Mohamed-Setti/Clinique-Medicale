package tn.itbs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.backend.entites.Medecin;
import java.util.List;


@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Integer>{
	List<Medecin> findBySpecialite(String specialite);
	
	List<Medecin> findByDisponibilite(Boolean disponibilite);
}
