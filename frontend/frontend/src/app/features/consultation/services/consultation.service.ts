import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation, CreateConsultationDto } from '../models/consultation';
import { API_BASE_URL } from '../../../core/api.config';

@Injectable({ providedIn: 'root' })
export class ConsultationService {
  private http = inject(HttpClient);
  private url = `${API_BASE_URL}/consultations`;

  getAll(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(this.url);
  }

  getById(id: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.url}/${id}`);
  }

  getByPatient(idPatient: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.url}/patient/${idPatient}`);
  }

  getByMedecin(idMedecin: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.url}/medecin/${idMedecin}`);
  }

  create(dto: CreateConsultationDto): Observable<Consultation> {
    return this.http.post<Consultation>(this.url, dto);
  }

  update(id: number, dto: Partial<CreateConsultationDto>): Observable<Consultation> {
    return this.http.put<Consultation>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
