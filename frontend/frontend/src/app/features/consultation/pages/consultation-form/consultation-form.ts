import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { RendezVousService } from '../../../rendezvous/services/rendezvous.service';
import { ConsultationDTO, Consultation } from '../../models/consultation';

export interface OrdonnanceLigne {
    medicament: string;
    dose: string;
    frequence: string;
}

@Component({
    selector: 'app-consultation-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './consultation-form.html',
    styleUrl: './consultation-form.css',
})
export class ConsultationForm implements OnInit {
    private consultationService = inject(ConsultationService);
    private rendezVousService = inject(RendezVousService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    consultationId = signal<number | null>(null);
    isEdit = signal(false);
    loading = signal(false);
    saving = signal(false);
    error = signal('');

    ordonnanceLines = signal<OrdonnanceLigne[]>([
        { medicament: '', dose: '', frequence: '' }
    ]);

    form = signal<Consultation>({
        idConsultation: 0,
        idRendezVous: 0,
        diagnostic: '',
        ordonnance: '',
        prix: 0,
    });

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        const idRendezVous = this.route.snapshot.paramMap.get('idRendezVous');


        if (idRendezVous && !isNaN(+idRendezVous)) {
            this.form.update(f => ({ ...f, idRendezVous: +idRendezVous }));
        }

        if (id && !isNaN(+id)) {
            this.isEdit.set(true);
            this.consultationId.set(+id);
            this.loading.set(true);

            this.consultationService.getById(+id).subscribe({
                next: (c) => {
                    this.form.set({
                        idConsultation: c.idConsultation,
                        idRendezVous: c.idRendezVous,
                        diagnostic: c.diagnostic,
                        ordonnance: c.ordonnance,
                        prix: c.prix,
                    });
                    this.ordonnanceLines.set(this.parseOrdonnance(c.ordonnance));
                    this.loading.set(false);
                },
                error: () => {
                    this.error.set('Consultation introuvable.');
                    this.loading.set(false);
                }
            });
        }
    }

    // Ordonnance lines management
    addLigne() {
        this.ordonnanceLines.update(lines => [
            ...lines,
            { medicament: '', dose: '', frequence: '' }
        ]);
    }

    removeLigne(index: number) {
        this.ordonnanceLines.update(lines => lines.filter((_, i) => i !== index));
    }

    updateLigne(index: number, field: keyof OrdonnanceLigne, value: string) {
        this.ordonnanceLines.update(lines =>
            lines.map((l, i) => i === index ? { ...l, [field]: value } : l)
        );
    }

    // Convert lines to a string to store in backend
    buildOrdonnanceString(): string {
        return this.ordonnanceLines()
            .filter(l => l.medicament.trim())
            .map(l => `${l.medicament} - ${l.dose} - ${l.frequence}`)
            .join('\n');
    }

    // Parse stored string back to lines when editing
    parseOrdonnance(raw: string): OrdonnanceLigne[] {
        if (!raw) return [{ medicament: '', dose: '', frequence: '' }];
        return raw.split('\n').map(line => {
            const parts = line.split(' - ');
            return {
                medicament: parts[0] ?? '',
                dose: parts[1] ?? '',
                frequence: parts[2] ?? '',
            };
        });
    }

    updateField(field: string, value: any) {
        this.form.update(f => ({ ...f, [field]: value }));
    }

    submit() {
        const f = this.form();
        if (!f.diagnostic || !f.prix) {
            this.error.set('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        this.saving.set(true);
        this.error.set('');

        const dto: ConsultationDTO = {
            idConsultation: this.consultationId() || 0,
            idRendezVous: +f.idRendezVous,
            diagnostic: f.diagnostic,
            ordonnance: this.buildOrdonnanceString(),
            prix: +f.prix,
        };

        const obs = this.isEdit()
            ? this.consultationService.update(this.consultationId()!, dto)
            : this.consultationService.create(dto);

        obs.subscribe({
            next: () => this.router.navigate(['/consultations/details/' + this.consultationId()]),
            error: () => {
                this.error.set('Erreur lors de la sauvegarde.');
                this.saving.set(false);
            }
        });
    }
}