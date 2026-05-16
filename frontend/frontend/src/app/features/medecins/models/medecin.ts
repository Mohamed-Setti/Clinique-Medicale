export interface Medecin {
    idMedecin: number;
    nom: string;
    specialite: string;
    disponibilite: boolean;
}

export interface CreateMedecinDto {
    idMedecin: number;
    nom: string;
    specialite: string;
    disponibilite: boolean;
}
