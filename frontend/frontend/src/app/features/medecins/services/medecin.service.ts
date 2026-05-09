import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from '../models/medecin';
import { API_BASE_URL } from '../../../core/api.config';

export interface CreateMedecinDto {
  nom: string;
  specialite: string;
  disponibilite: boolean;
}

@Injectable({ providedIn: 'root' })
export class MedecinService {
  private http = inject(HttpClient);
  private url = `${API_BASE_URL}/medecins`;

  getAll(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.url);
  }

  getById(id: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.url}/${id}`);
  }

  getDisponibles(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.url}/disponibles`);
  }

  create(dto: CreateMedecinDto): Observable<Medecin> {
    return this.http.post<Medecin>(this.url, dto);
  }

  update(id: number, dto: Partial<CreateMedecinDto>): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.url}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
