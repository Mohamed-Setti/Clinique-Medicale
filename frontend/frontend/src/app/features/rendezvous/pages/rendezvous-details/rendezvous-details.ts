import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RendezVousService } from '../../services/rendezvous.service';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { RendezVous } from '../../models/rendezvous';

@Component({
    selector: 'app-rendezvous-details',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './rendezvous-details.html',
    styleUrl: './rendezvous-details.css',
})
export class RendezVousDetails implements OnInit {
    private rvService = inject(RendezVousService);
    private patientService = inject(PatientService);
    private medecinService = inject(MedecinService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    rendezvous = signal<RendezVous | null>(null);
    patientName = signal<string>('Chargement...');
    medecinName = signal<string>('Chargement...');
    loading = signal(true);
    error = signal('');
    showDeleteConfirm = signal(false);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.rvService.getById(+id).subscribe({
                next: rv => {
                    this.rendezvous.set(rv);
                    this.loading.set(false);
                    this.loadPatientName(rv.idPatient);
                    this.loadMedecinName(rv.idMedecin);
                },
                error: () => {
                    this.error.set('Rendez-vous introuvable.');
                    this.loading.set(false);
                }
            });
        }
    }

    loadPatientName(id: number) {
        this.patientService.getById(id).subscribe({
            next: p => this.patientName.set(p.nom),
            error: () => this.patientName.set('Inconnu')
        });
    }

    loadMedecinName(id: number) {
        this.medecinService.getById(id).subscribe({
            next: m => this.medecinName.set(m.nom),
            error: () => this.medecinName.set('Inconnu')
        });
    }

    delete() {
        const rv = this.rendezvous();
        if (!rv) return;
        this.rvService.delete(rv.idRendezVous).subscribe({
            next: () => this.router.navigate(['/rendezvous/calendar']),
            error: () => this.error.set('Erreur lors de la suppression.')
        });
    }
}