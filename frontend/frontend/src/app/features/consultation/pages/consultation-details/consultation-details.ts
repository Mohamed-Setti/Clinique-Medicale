import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultation.service';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { Consultation } from '../../models/consultation';
import { RendezVousService } from '../../../rendezvous/services/rendezvous.service';

@Component({
    selector: 'app-consultation-details',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './consultation-details.html',
    styleUrl: './consultation-details.css',
})
export class ConsultationDetails implements OnInit {
    private consultationService = inject(ConsultationService);
    private rendezVousService = inject(RendezVousService);
    private patientService = inject(PatientService);
    private medecinService = inject(MedecinService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    rendezVousDate = signal<Date | null>(null);

    consultation = signal<Consultation | null>(null);
    patientName = signal<string>('Chargement...');
    medecinName = signal<string>('Chargement...');
    loading = signal(true);
    error = signal('');
    showDeleteConfirm = signal(false);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;

        this.loading.set(true);

        this.consultationService.getById(+id).subscribe({
            next: c => {
                this.consultation.set(c);

                this.rendezVousService.getById(c.idRendezVous).subscribe({
                    next: rv => {
                        this.loadPatientName(rv.idPatient);
                        this.loadMedecinName(rv.idMedecin);
                        this.rendezVousDate.set(new Date(rv.date));
                        this.loading.set(false);
                    },
                    error: () => {
                        this.error.set('Rendez-vous introuvable.');
                        this.loading.set(false);
                    }
                });
            },
            error: () => {
                this.error.set('Consultation introuvable.');
                this.loading.set(false);
            }
        });
    }




    loadPatientName(id: number) {
        this.patientService.getById(id).subscribe({
            next: p => this.patientName.set(p.nom),
            error: () => this.patientName.set('Inconnu'),
        });
    }

    loadMedecinName(id: number) {
        this.medecinService.getById(id).subscribe({
            next: m => this.medecinName.set(m.nom),
            error: () => this.medecinName.set('Inconnu'),
        });
    }

    delete() {
        const c = this.consultation();
        if (!c) return;
        this.consultationService.delete(c.idConsultation).subscribe({
            next: () => this.router.navigate(['/rendezvous/calendar']),
            error: () => this.error.set('Erreur lors de la suppression.'),
        });
    }
}