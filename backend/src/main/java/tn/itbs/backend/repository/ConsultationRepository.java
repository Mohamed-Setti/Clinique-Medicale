package tn.itbs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.backend.entites.Consultation;



@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Integer>{
	
}
