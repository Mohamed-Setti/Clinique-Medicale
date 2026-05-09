import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Patient {
  nom: string;
  dateDeNaissance: string;
  numTel: string;

  constructor() {
    this.nom = '';
    this.dateDeNaissance = '';
    this.numTel = '';
  }
}

