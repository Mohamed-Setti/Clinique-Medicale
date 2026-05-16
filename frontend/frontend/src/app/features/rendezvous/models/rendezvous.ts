import { RendezVousStatut } from './rendezvous-statut';

export interface RendezVous {
    idRendezVous: number;
    date: string;
    heure: string;
    motif: string;
    statut: RendezVousStatut;
    idPatient: number;
    idMedecin: number;
}
export interface RendezVousDTO {
    idRendezVous: number;
    date: string;
    heure: string;
    motif: string;
    statut: RendezVousStatut;
    idPatient: number;
    idMedecin: number;
}