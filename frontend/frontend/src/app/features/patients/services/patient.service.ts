import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient, CreatePatientDto } from '../models/patient';
import { API_BASE_URL } from '../../../core/api.config';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private http = inject(HttpClient);
  private url = `${API_BASE_URL}/Patient`;

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url + "/all");
  }

  getById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.url}/id/${id}`);
  }

  create(dto: CreatePatientDto): Observable<Patient> {
    return this.http.post<Patient>(this.url + "/add", dto);
  }

  update(id: number, dto: Partial<CreatePatientDto>): Observable<Patient> {
    return this.http.put<Patient>(`${this.url}/update/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
}
