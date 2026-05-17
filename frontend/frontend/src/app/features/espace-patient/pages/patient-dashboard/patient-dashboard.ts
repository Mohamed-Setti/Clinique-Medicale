import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Patient } from '../../../patients/models/patient';
import { PatientService } from '../../../patients/services/patient.service';
import { Medecin } from '../../../medecins/models/medecin';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { RendezVous } from '../../../rendezvous/models/rendezvous';
import { RendezVousService, CreateRendezVousDto } from '../../../rendezvous/services/rendezvous.service';
import { RendezVousStatut } from '../../../rendezvous/models/rendezvous-statut';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard implements OnInit {
  private patientService = inject(PatientService);
  private medecinService = inject(MedecinService);
  private rvService = inject(RendezVousService);

  patients = signal<Patient[]>([]);
  selectedPatient = signal<Patient | null>(null);
  medecinsDispo = signal<Medecin[]>([]);
  medecinNames = signal<Map<number, string>>(new Map());

  rendezvous = signal<RendezVous[]>([]);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  successMsg = signal<string | null>(null);
  showForm = signal(false);

  newRv = signal<{ date: string; heure: string; motif: string; idMedecin: number }>({
    date: '',
    heure: '',
    motif: '',
    idMedecin: 0,
  });

  ngOnInit() {
    this.patientService.getAll().subscribe({
      next: data => this.patients.set(data),
      error: () => this.error.set('Impossible de charger les patients.')
    });
    this.medecinService.getDisponibles().subscribe({
      next: data => {
        this.medecinsDispo.set(data);
        data.forEach(m => this.medecinNames.update(map => new Map(map).set(m.idMedecin, m.nom)));
      }
    });
  }

  onPatientChange(idStr: string) {
    const id = +idStr;
    if (!id) { this.selectedPatient.set(null); this.rendezvous.set([]); this.showForm.set(false); return; }
    this.loading.set(true);
    this.error.set(null);

    this.patientService.getById(id).subscribe({
      next: p => {
        this.selectedPatient.set(p);
        this.loadRendezVous(id);
      },
      error: () => { this.error.set('Patient introuvable.'); this.loading.set(false); }
    });
  }

  loadRendezVous(idPatient: number) {
    this.rvService.getByPatient(idPatient).subscribe({
      next: data => { this.rendezvous.set(data); this.loading.set(false); },
      error: () => { this.error.set('Erreur chargement rendez-vous.'); this.loading.set(false); }
    });
  }

  updateNewRv(field: string, value: string | number) {
    this.newRv.update(f => ({ ...f, [field]: value }));
  }

  submitRv() {
    const f = this.newRv();
    const patient = this.selectedPatient();
    if (!patient) return;
    if (!f.date || !f.heure || !f.motif || !f.idMedecin) {
      this.error.set('Veuillez remplir tous les champs.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    // ✅ Récupérer tous les RDV du médecin choisi
    this.rvService.getByMedecin(f.idMedecin).subscribe({
      next: (rvsMedecin) => {

        const normalizeDate = (d: string): string => {
          if (!d) return '';
          if (d.includes('/')) {
            const [day, month, year] = d.split('/');
            return `${year}-${month}-${day}`;
          }
          return d;
        };

        const normalizeHeure = (h: string): string => h?.substring(0, 5) ?? '';

        const occupe = rvsMedecin.some(rv =>
          normalizeDate(rv.date) === normalizeDate(f.date) &&
          normalizeHeure(rv.heure) === normalizeHeure(f.heure)
        );

        if (occupe) {
          this.error.set('Ce médecin est déjà réservé à cette date et cette heure.');
          this.saving.set(false);
          return;
        }

        // ✅ Créneau libre → créer le RDV
        const dto: CreateRendezVousDto = {
          date: f.date,
          heure: f.heure,
          motif: f.motif,
          statut: RendezVousStatut.EN_ATTENTE,
          idPatient: patient.idPatient,
          idMedecin: f.idMedecin,
        };

        this.rvService.create(dto).subscribe({
          next: created => {
            this.rendezvous.update(list => [created, ...list]);
            this.saving.set(false);
            this.showForm.set(false);
            this.newRv.set({ date: '', heure: '', motif: '', idMedecin: 0 });
            this.successMsg.set('Rendez-vous créé avec succès !');
            setTimeout(() => this.successMsg.set(null), 4000);
          },
          error: () => { this.error.set('Erreur lors de la création du rendez-vous.'); this.saving.set(false); }
        });
      },
      error: () => { this.error.set('Erreur lors de la vérification de disponibilité.'); this.saving.set(false); }
    });
  }
  cancelForm() {
    this.showForm.set(false);
    this.newRv.set({ date: '', heure: '', motif: '', idMedecin: 0 });
    this.error.set(null);
  }

  getMedecinName(id: number): string {
    return this.medecinNames().get(id) ?? '...';
  }

  getStatutClass(statut: RendezVousStatut): string {
    const map: Record<string, string> = {
      EN_ATTENTE: 'badge-attente',
      CONFIRME: 'badge-confirme',
      ANNULE: 'badge-annule',
      TERMINE: 'badge-termine',
    };
    return map[statut] ?? '';
  }

  getStatutLabel(statut: RendezVousStatut): string {
    const map: Record<string, string> = {
      EN_ATTENTE: 'En attente',
      CONFIRME: 'Confirmé',
      ANNULE: 'Annulé',
      TERMINE: 'Terminé',
    };
    return map[statut] ?? statut;
  }
}
