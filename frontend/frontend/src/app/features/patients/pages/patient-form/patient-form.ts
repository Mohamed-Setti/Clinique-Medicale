import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { CreatePatientDto } from '../../models/patient';

@Component({
  selector: 'app-patient-form',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css',
})
export class PatientForm implements OnInit {
  private patientService = inject(PatientService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = signal(false);
  patientId = signal<number | null>(null);
  loading = signal(false);
  saving = signal(false);
  error = signal('');

  form = signal({
    nom: '',
    dateDeNaissance: '',
    numTel: '',
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.patientId.set(+id);
      this.loading.set(true);
      this.patientService.getById(+id).subscribe({
        next: p => {
          const dateStr = p.dateDeNaissance ? new Date(p.dateDeNaissance).toISOString().split('T')[0] : '';
          this.form.set({ nom: p.nom, dateDeNaissance: dateStr, numTel: p.numTel });
          this.loading.set(false);
        },
        error: () => { this.error.set('Patient introuvable.'); this.loading.set(false); }
      });
    }
  }

  updateField(field: string, value: string) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  submit() {
    const f = this.form();

    if (!f.nom || !f.dateDeNaissance || !f.numTel) {
      this.error.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const dto: CreatePatientDto = {
      idPatient: this.patientId() || 0,
      nom: f.nom,
      dateDeNaissance: f.dateDeNaissance,
      numTel: f.numTel
    };

    const obs = this.isEdit()
      ? this.patientService.update(this.patientId()!, dto)
      : this.patientService.create(dto);

    obs.subscribe({
      next: () => this.router.navigate(['/patients']),
      error: () => {
        this.error.set('Erreur lors de la sauvegarde.');
        this.saving.set(false);
      }
    });
  }
}
