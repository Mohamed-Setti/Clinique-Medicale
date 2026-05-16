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
  private url = `${API_BASE_URL}/Medecin`;

  getAll(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(this.url + "/all");
  }

  getById(id: number): Observable<Medecin> {
    return this.http.get<Medecin>(`${this.url}/id/${id}`);
  }

  getDisponibles(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.url}/Disponibilite`);
  }

  create(dto: CreateMedecinDto): Observable<Medecin> {
    return this.http.post<Medecin>(this.url + "/Add", dto);
  }

  update(id: number, dto: Partial<CreateMedecinDto>): Observable<Medecin> {
    return this.http.put<Medecin>(`${this.url}/update/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/Delete/${id}`);
  }
}
