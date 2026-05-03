package tn.itbs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.backend.entites.Patient;
import java.util.List;
import java.sql.Date;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{
	
	List<Patient> findByDateDeNaissance(Date dateDeNaissance);
	
	List<Patient> findByNom(String nom);
	
	Patient findByNumTel(String numTel);
}
