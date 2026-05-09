export interface Patient {
  idPatient: number;
  nom: string;
  dateDeNaissance: string;
  numTel: string;
}

export interface CreatePatientDto {
  idPatient: number;
  nom: string;
  dateDeNaissance: string;
  numTel: string;
}
