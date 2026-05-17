import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendezvous';
import { RendezVousStatut } from '../models/rendezvous-statut';
import { API_BASE_URL } from '../../../core/api.config';

export interface CreateRendezVousDto {
  date: string;
  heure: string;
  motif: string;
  statut: RendezVousStatut;
  idPatient: number;
  idMedecin: number;
}

export interface RendezVousFilter {
  date?: string;
  idMedecin?: number;
  statut?: RendezVousStatut;
  idPatient?: number;
}

@Injectable({ providedIn: 'root' })
export class RendezVousService {
  private http = inject(HttpClient);
  private url = `${API_BASE_URL}/RendezVous`;

  // getAll(filters?: RendezVousFilter): Observable<RendezVous[]> {
  //   let params = new HttpParams();
  //   if (filters) {
  //     if (filters.date) params = params.set('date', filters.date);
  //     if (filters.idMedecin) params = params.set('idMedecin', filters.idMedecin);
  //     if (filters.statut) params = params.set('statut', filters.statut);
  //     if (filters.idPatient) params = params.set('idPatient', filters.idPatient);
  //   }
  //   return this.http.get<RendezVous[]>(this.url + "/All", { params });
  // }

  getAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.url + "/All");
  }

  getById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.url}/id/${id}`);
  }

  getByPatient(idPatient: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.url}/Patient/${idPatient}`);
  }

  getByMedecin(idMedecin: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.url}/Medecin/${idMedecin}`);
  }

  create(dto: CreateRendezVousDto): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.url + "/Add", dto);
  }

  update(id: number, dto: Partial<CreateRendezVousDto>): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.url}/Update/${id}`, dto);
  }

  updateStatut(id: number, statue: RendezVousStatut): Observable<RendezVous> {
    return this.http.patch<RendezVous>(`${this.url}/${id}/statut`, { statue });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
