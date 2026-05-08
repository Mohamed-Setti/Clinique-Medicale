import { RendezVousStatut } from './rendezvous-statut';

export interface RendezVous {
    idRendezVous: number;
    date: string;
    heure: string;
    motif: string;
    statue: RendezVousStatut;
    idPatient: number;
    idMedecin: number;
}