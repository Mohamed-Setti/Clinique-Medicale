import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit {
  private patientService = inject(PatientService);

  patients = signal<Patient[]>([]);
  loading = signal(true);
  error = signal('');
  search = signal('');
  deleteConfirmId = signal<number | null>(null);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return this.patients().filter(p =>
      `${p.nom}`.toLowerCase().includes(q) ||
      p.numTel.includes(q)
    );
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.patientService.getAll().subscribe({
      next: data => { this.patients.set(data); this.loading.set(false); },
      error: () => { this.error.set('Erreur lors du chargement des patients.'); this.loading.set(false); }
    });
  }

  confirmDelete(id: number) { this.deleteConfirmId.set(id); }
  cancelDelete() { this.deleteConfirmId.set(null); }

  doDelete(id: number) {
    this.patientService.delete(id).subscribe({
      next: () => { this.patients.update(list => list.filter(p => p.idPatient !== id)); this.deleteConfirmId.set(null); },
      error: () => this.error.set('Erreur lors de la suppression.')
    });
  }

  age(dob: string): number {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
}
