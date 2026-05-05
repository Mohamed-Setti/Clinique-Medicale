package tn.itbs.backend.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tn.itbs.backend.Dto.ConsultationDTO;
import tn.itbs.backend.entites.Consultation;

@Component
public class ConsultationMapper {
	@Autowired
	private ModelMapper mmaper;
	
	public ConsultationDTO toDTO (Consultation c) {
		ConsultationDTO cDto = mmaper.map(c, ConsultationDTO.class);
		return cDto;
	}
	
	public Consultation fromDTO (ConsultationDTO cDto) {
		Consultation c = mmaper.map(cDto, Consultation.class);
		return c;
	}
	
	public List<ConsultationDTO> toDTOList (List<Consultation> listC) {
		return listC.stream()
					.map(this::toDTO)
					.collect(Collectors.toList());
	}
	
	public List<Consultation> fromDTOList (List<ConsultationDTO> listC) {
		return listC.stream()
					.map(this::fromDTO)
					.collect(Collectors.toList());
	}
}
