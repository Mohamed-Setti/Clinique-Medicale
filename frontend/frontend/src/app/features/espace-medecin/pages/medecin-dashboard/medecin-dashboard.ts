import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Medecin } from '../../../medecins/models/medecin';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { RendezVous, RendezVousDTO } from '../../../rendezvous/models/rendezvous';
import { RendezVousService } from '../../../rendezvous/services/rendezvous.service';
import { RendezVousStatut } from '../../../rendezvous/models/rendezvous-statut';
import { PatientService } from '../../../patients/services/patient.service';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './medecin-dashboard.html',
  styleUrl: './medecin-dashboard.css',
})
export class MedecinDashboard implements OnInit {
  private medecinService = inject(MedecinService);
  private rvService = inject(RendezVousService);
  private patientService = inject(PatientService);

  medecins = signal<Medecin[]>([]);
  selectedMedecin = signal<Medecin | null>(null);
  selectedMedecinId = signal<number | null>(null);

  rendezvous = signal<RendezVous[]>([]);
  patientNames = signal<Map<number, string>>(new Map());

  loading = signal(false);
  savingDisponibilite = signal(false);
  error = signal<string | null>(null);
  successMsg = signal<string | null>(null);

  statuts = Object.values(RendezVousStatut);
  updatingStatutId = signal<number | null>(null);

  // ── Calendrier ──
  weekOffset = signal(0);

  weekDays = computed(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1 + this.weekOffset() * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  });

  weekLabel = computed(() => {
    const days = this.weekDays();
    const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    return `${fmt(days[0])} – ${fmt(days[6])} ${days[6].getFullYear()}`;
  });

  getRvForDay(day: Date): RendezVous[] {
    const dateStr = day.toISOString().split('T')[0];
    return this.rendezvous()
      .filter(rv => {
        const normalized = rv.date?.includes('/')
          ? rv.date.split('/').reverse().join('-')
          : rv.date;
        return normalized?.startsWith(dateStr);
      })
      .sort((a, b) => (a.heure ?? '').localeCompare(b.heure ?? ''));
  }

  isToday(day: Date): boolean {
    return day.toDateString() === new Date().toDateString();
  }

  prevWeek() { this.weekOffset.update(w => w - 1); }
  nextWeek() { this.weekOffset.update(w => w + 1); }
  goToday() { this.weekOffset.set(0); }
  // ── Fin Calendrier ──

  ngOnInit() {
    this.medecinService.getAll().subscribe({
      next: data => this.medecins.set(data.filter((m): m is Medecin => !!m)),
      error: () => this.error.set('Impossible de charger les médecins.')
    });
  }

  onMedecinChange(idStr: string) {
    const id = +idStr;
    if (!id) { this.selectedMedecin.set(null); this.rendezvous.set([]); return; }
    this.selectedMedecinId.set(id);
    this.loading.set(true);
    this.error.set(null);
    this.weekOffset.set(0);

    this.medecinService.getById(id).subscribe({
      next: m => {
        this.selectedMedecin.set(m);
        this.loadRendezVous(id);
      },
      error: () => { this.error.set('Médecin introuvable.'); this.loading.set(false); }
    });
  }

  loadRendezVous(idMedecin: number) {
    this.rvService.getByMedecin(idMedecin).subscribe({
      next: data => {
        this.rendezvous.set(data);
        this.loading.set(false);
        this.loadPatientNames(data);
      },
      error: () => { this.error.set('Erreur chargement rendez-vous.'); this.loading.set(false); }
    });
  }

  loadPatientNames(data: RendezVous[]) {
    const ids = [...new Set(data.map(rv => rv.idPatient))];
    ids.forEach(id => {
      this.patientService.getById(id).subscribe({
        next: p => this.patientNames.update(m => new Map(m).set(id, p.nom))
      });
    });
  }

  toggleDisponibilite() {
    const m = this.selectedMedecin();
    if (!m) return;
    this.savingDisponibilite.set(true);
    this.error.set(null);
    this.successMsg.set(null);

    this.medecinService.update(m.idMedecin, {
      nom: m.nom,
      specialite: m.specialite,
      disponibilite: !m.disponibilite
    }).subscribe({
      next: () => {
        const updated = { ...m, disponibilite: !m.disponibilite };
        this.selectedMedecin.set(updated);
        this.medecins.update(list => list.map(med =>
          med?.idMedecin === updated.idMedecin ? updated : med
        ));
        this.savingDisponibilite.set(false);
        this.successMsg.set(`Disponibilité : ${updated.disponibilite ? 'Disponible' : 'Indisponible'}`);
        setTimeout(() => this.successMsg.set(null), 3000);
      },
      error: () => { this.error.set('Erreur mise à jour.'); this.savingDisponibilite.set(false); }
    });
  }

  changeStatut(rv: RendezVous, statut: RendezVousStatut) {
    this.updatingStatutId.set(rv.idRendezVous);
    const dto: RendezVousDTO = {
      idRendezVous: rv.idRendezVous,
      date: rv.date, heure: rv.heure, motif: rv.motif,
      statut, idPatient: rv.idPatient, idMedecin: rv.idMedecin
    };
    this.rvService.update(rv.idRendezVous, dto).subscribe({
      next: () => {
        this.rendezvous.update(list =>
          list.map(r => r.idRendezVous === rv.idRendezVous ? { ...r, statut } : r)
        );
        this.updatingStatutId.set(null);
      },
      error: () => { this.error.set('Erreur changement de statut.'); this.updatingStatutId.set(null); }
    });
  }

  getPatientName(id: number): string { return this.patientNames().get(id) ?? '...'; }

  getStatutClass(statut: RendezVousStatut): string {
    const map: Record<string, string> = {
      EN_ATTENTE: 'badge-attente', CONFIRME: 'badge-confirme',
      ANNULE: 'badge-annule', TERMINE: 'badge-termine',
    };
    return map[statut] ?? '';
  }

  getStatutLabel(statut: RendezVousStatut): string {
    const map: Record<string, string> = {
      EN_ATTENTE: 'En attente', CONFIRME: 'Confirmé',
      ANNULE: 'Annulé', TERMINE: 'Terminé',
    };
    return map[statut] ?? statut;
  }
}