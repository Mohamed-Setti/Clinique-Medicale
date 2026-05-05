package tn.itbs.backend.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tn.itbs.backend.Dto.PatientDTO;
import tn.itbs.backend.entites.Patient;

@Component
public class PatientMapper {
	
	@Autowired
	private ModelMapper mmaper;
	
	public PatientDTO toDTO (Patient p) {
		PatientDTO pDto = mmaper.map(p, PatientDTO.class);
		return pDto;
	}
	
	public Patient fromDTO (PatientDTO pDto) {
		Patient p = mmaper.map(pDto, Patient.class);
		return p;
	}
	
	public List<PatientDTO> toDTOList (List<Patient> listP) {
		return listP.stream()
					.map(this::toDTO)
					.collect(Collectors.toList());
	}
	
	public List<Patient> fromDTOList (List<PatientDTO> listP) {
		return listP.stream()
					.map(this::fromDTO)
					.collect(Collectors.toList());
	}
}
