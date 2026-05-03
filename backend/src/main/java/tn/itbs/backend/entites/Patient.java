package tn.itbs.backend.entites;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idPatient ;

	@Column(nullable = false)
	private String nom ;
	@Column(nullable = false)
	private Date dateDeNaissance ;
	@Column(nullable = false,unique = true)
	private String numTel;
	
	@OneToMany (mappedBy = "P")
	private List<RendezVous> listP = new ArrayList<RendezVous>() ;
}
