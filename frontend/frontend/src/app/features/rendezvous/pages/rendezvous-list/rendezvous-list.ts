import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RendezVous } from '../../models/rendezvous';
import { RendezVousService } from '../../services/rendezvous.service';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';

@Component({
  selector: 'app-rendezvous-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rendezvous-list.html',
  styleUrl: './rendezvous-list.css',
})
export class RendezVousList implements OnInit {
  private rvService = inject(RendezVousService);
  private patientService = inject(PatientService);
  private medecinService = inject(MedecinService);

  rendezvous = signal<RendezVous[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  search = signal('');
  deleteConfirmId = signal<number | null>(null);
  patientNames = signal<Map<number, string>>(new Map());
  medecinNames = signal<Map<number, string>>(new Map());

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.rvService.getAll().subscribe({
      next: data => {
        this.rendezvous.set(data);
        this.loading.set(false);
        this.loadNames(data);
      },
      error: () => {
        this.error.set('Erreur lors du chargement des rendez-vous.');
        this.loading.set(false);
      }
    });
  }

  loadNames(data: RendezVous[]) {
    const patientIds = [...new Set(data.map(rv => rv.idPatient))];
    const medecinIds = [...new Set(data.map(rv => rv.idMedecin))];

    patientIds.forEach(id => {
      this.patientService.getById(id).subscribe({
        next: p => this.patientNames.update(m => new Map(m).set(id, p.nom))
      });
    });

    medecinIds.forEach(id => {
      this.medecinService.getById(id).subscribe({
        next: m => this.medecinNames.update(map => new Map(map).set(id, m.nom))
      });
    });
  }

  filtered() {
    const s = this.search().toLowerCase().trim();
    if (!s) return this.rendezvous();
    return this.rendezvous().filter(rv =>
      rv.date?.toLowerCase().includes(s) ||
      rv.heure?.toLowerCase().includes(s)
    );
  }

  getpatientname(id: number): string {
    return this.patientNames().get(id) ?? 'Chargement...';
  }

  getmedecinname(id: number): string {
    return this.medecinNames().get(id) ?? 'Chargement...';
  }

  confirmDelete(id: number) {
    this.deleteConfirmId.set(id);
  }

  cancelDelete() {
    this.deleteConfirmId.set(null);
  }

  doDelete(id: number) {
    this.rvService.delete(id).subscribe({
      next: () => {
        this.rendezvous.update(list => list.filter(rv => rv.idRendezVous !== id));
        this.cancelDelete();
      },
      error: () => this.error.set('Erreur lors de la suppression.')
    });
  }
}