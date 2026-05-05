package tn.itbs.backend.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tn.itbs.backend.Dto.RendezVousDTO;
import tn.itbs.backend.entites.RendezVous;


@Component
public class RendezVousMapper {
	@Autowired
	private ModelMapper mmaper;
	
	public RendezVousDTO toDTO (RendezVous rv) {
		RendezVousDTO rvDto = mmaper.map(rv, RendezVousDTO.class);
		return rvDto;
	}
	
	public RendezVous fromDTO (RendezVousDTO rvDto) {
		RendezVous rv = mmaper.map(rvDto, RendezVous.class);
		return rv;
	}
	
	public List<RendezVousDTO> toDTOList (List<RendezVous> listRV) {
		return listRV.stream()
					.map(this::toDTO)
					.collect(Collectors.toList());
	}
	
	public List<RendezVous> fromDTOList (List<RendezVousDTO> listDTORV) {
		return listDTORV.stream()
					.map(this::fromDTO)
					.collect(Collectors.toList());
	}
}
