export interface Consultation {
  idConsultation: number;
  diagnostic: string;
  ordonnance: string;
  prix: number;
  dateConsultation?: string;
  idRendezVous: number;
}

export interface ConsultationDTO {
  idConsultation: number;
  diagnostic: string;
  ordonnance: string;
  prix: number;
  idRendezVous: number;
}
