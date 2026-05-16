import { Component, signal, input, computed, effect, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RendezVousService } from '../../services/rendezvous.service';
import { RendezVousDTO, RendezVous } from '../../models/rendezvous';
import { RendezVousStatut } from '../../models/rendezvous-statut';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';

@Component({
  selector: 'app-rendezvous-form',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './rendezvous-form.html',
  styleUrl: './rendezvous-form.css',
})
export class RendezvousForm {

  private patientService = inject(PatientService);
  private medecinService = inject(MedecinService);
  private rendezvousService = inject(RendezVousService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  statuts = Object.values(RendezVousStatut);

  form = signal<RendezVous>({
    idRendezVous: 0,
    date: '',
    heure: '',
    motif: '',
    statut: RendezVousStatut.EN_ATTENTE,
    idPatient: 0,
    idMedecin: 0,
  });

  isEdit = signal(false);
  rendezvousId = signal<number | null>(null);
  loading = signal(false);
  saving = signal(false);
  error = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit.set(true);
      this.rendezvousId.set(+id);
      this.loading.set(true);

      this.rendezvousService.getById(+id).subscribe({
        next: rv => {

          this.form.set({
            idRendezVous: rv.idRendezVous,
            date: rv.date,
            heure: rv.heure,
            motif: rv.motif,
            statut: rv.statut,
            idPatient: rv.idPatient,
            idMedecin: rv.idMedecin
          });

          this.loading.set(false);
        },

        error: () => {
          this.error.set('rendezvous introuvable.');
          this.loading.set(false);
        }
      });
    }
  }


  updateField(field: string, value: string) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  submit() {
    const f = this.form();

    if (!f.date || !f.heure || !f.motif || !f.idPatient || !f.idMedecin || !f.statut) {
      this.error.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const dto: RendezVousDTO = {
      idRendezVous: this.rendezvousId() || 0,
      date: f.date,
      heure: f.heure,
      motif: f.motif,
      statut: f.statut,
      idPatient: f.idPatient,
      idMedecin: f.idMedecin
    };

    const obs = this.isEdit()
      ? this.rendezvousService.update(this.rendezvousId()!, dto)
      : this.rendezvousService.create(dto);

    obs.subscribe({
      next: () => this.router.navigate(['/rendezvous']),
      error: () => {
        this.error.set('Erreur lors de la sauvegarde.');
        this.saving.set(false);
      }
    });
  }
}
