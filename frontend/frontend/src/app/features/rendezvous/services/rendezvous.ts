import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Rendezvous {
  date: string = "";
  heure: string = "";
  motif: string = "";
  statut: string = "";
  idpatient: number = 0;
  idmedecin: number = 0;
  constructor() {
    this.date = "";
    this.heure = "";
    this.motif = "";
    this.statut = "";
    this.idpatient = 0;
    this.idmedecin = 0;
  }
}
