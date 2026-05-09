export interface Consultation {
  idConsultation: number;
  diagnostic: string;
  ordonnance: string;
  prix: number;
  dateConsultation?: string;
  idPatient: number;
  idMedecin: number;
}

export interface CreateConsultationDto {
  diagnostic: string;
  ordonnance: string;
  prix: number;
  dateConsultation?: string;
  idPatient: number;
  idMedecin: number;
}
