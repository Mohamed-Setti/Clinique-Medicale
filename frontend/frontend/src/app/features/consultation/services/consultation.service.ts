import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation, ConsultationDTO } from '../models/consultation';
import { API_BASE_URL } from '../../../core/api.config';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private http = inject(HttpClient);
  private url = `${API_BASE_URL}/Consultation`;

  getAll(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.url + "/All");
  }

  getByRendezVousId(idRendezVous: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.url}/getByRendezVous/${idRendezVous}`);
  }

  getById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.url}/id/${id}`);
  }

  getByPatient(idPatient: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.url}/patient/id/${idPatient}`);
  }

  getByMedecin(idMedecin: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.url}/medecin/id/${idMedecin}`);
  }

  create(dto: ConsultationDTO): Observable<Consultation> {
    return this.http.post<Consultation>(this.url + "/Add", dto);
  }

  update(id: number, dto: Partial<ConsultationDTO>): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.url}/Update/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/Delete/${id}`);
  }
}