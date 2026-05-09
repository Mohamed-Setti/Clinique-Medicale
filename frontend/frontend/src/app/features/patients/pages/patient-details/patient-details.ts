import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails implements OnInit {
  private patientService = inject(PatientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  patient = signal<Patient | null>(null);
  loading = signal(true);
  error = signal('');
  showDeleteConfirm = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientService.getById(+id).subscribe({
        next: p => { this.patient.set(p); this.loading.set(false); },
        error: () => { this.error.set('Patient introuvable.'); this.loading.set(false); }
      });
    }
  }

  age(date: string): number {
    const birth = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  delete() {
    const p = this.patient();
    if (!p) return;
    this.patientService.delete(p.idPatient).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: () => this.error.set('Erreur lors de la suppression.')
    });
  }
}
