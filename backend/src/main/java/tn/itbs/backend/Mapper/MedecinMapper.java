package tn.itbs.backend.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tn.itbs.backend.Dto.MedecinDTO;
import tn.itbs.backend.entites.Medecin;



@Component
public class MedecinMapper {
	@Autowired
	private ModelMapper mmaper;
	
	public MedecinDTO toDTO (Medecin m) {
		MedecinDTO mDto = mmaper.map(m, MedecinDTO.class);
		return mDto;
	}
	
	public Medecin fromDTO (MedecinDTO pDto) {
		Medecin m = mmaper.map(pDto, Medecin.class);
		return m;
	}
	
	public List<MedecinDTO> toDTOList (List<Medecin> listM) {
		return listM.stream()
					.map(this::toDTO)
					.collect(Collectors.toList());
	}
	
	public List<Medecin> fromDTOList (List<MedecinDTO> listM) {
		return listM.stream()
					.map(this::fromDTO)
					.collect(Collectors.toList());
	}
}
