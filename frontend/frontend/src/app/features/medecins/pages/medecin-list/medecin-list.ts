import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedecinService } from '../../services/medecin.service';
import { Medecin } from '../../models/medecin';

@Component({
  selector: 'app-medecin-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './medecin-list.html',
  styleUrl: './medecin-list.css',
})
export class MedecinList implements OnInit {
  private medecinService = inject(MedecinService);

  medecins = signal<Medecin[]>([]);
  loading = signal(true);
  error = signal('');
  search = signal('');
  deleteConfirmId = signal<number | null>(null);

  filtered = computed(() => {
    const q = this.search().toLowerCase();
    return this.medecins().filter(m =>
      `${m.nom}`.toLowerCase().includes(q) ||
      `${m.specialite}`.toLowerCase().includes(q)
    );
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.medecinService.getAll().subscribe({
      next: data => { this.medecins.set(data); this.loading.set(false); },
      error: () => { this.error.set('Erreur lors du chargement des medecins.'); this.loading.set(false); }
    });
  }

  confirmDelete(id: number) { this.deleteConfirmId.set(id); }
  cancelDelete() { this.deleteConfirmId.set(null); }

  doDelete(id: number) {
    this.medecinService.delete(id).subscribe({
      next: () => { this.medecins.update(list => list.filter(p => p.idMedecin !== id)); this.deleteConfirmId.set(null); },
      error: () => this.error.set('Erreur lors de la suppression.')
    });
  }
}
