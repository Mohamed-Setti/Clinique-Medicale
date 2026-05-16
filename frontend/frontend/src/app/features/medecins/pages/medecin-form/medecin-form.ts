import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../services/medecin.service';
import { CreateMedecinDto } from '../../models/medecin';

@Component({
    selector: 'app-medecin-form',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './medecin-form.html',
    styleUrl: './medecin-form.css',
})
export class MedecinForm implements OnInit {
    private MedecinService = inject(MedecinService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isEdit = signal(false);
    MedecinId = signal<number | null>(null);
    loading = signal(false);
    saving = signal(false);
    error = signal('');

    form = signal({
        nom: '',
        specialite: '',
        disponibilite: true,
    });

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit.set(true);
            this.MedecinId.set(+id);
            this.loading.set(true);
            this.MedecinService.getById(+id).subscribe({
                next: m => {
                    this.form.set({ nom: m.nom, specialite: m.specialite, disponibilite: m.disponibilite });
                    this.loading.set(false);
                },
                error: () => { this.error.set('Medecin introuvable.'); this.loading.set(false); }
            });
        }
    }

    updateField(field: string, value: string) {
        this.form.update(f => ({ ...f, [field]: value }));
    }

    submit() {
        const f = this.form();

        if (!f.nom || !f.disponibilite || !f.specialite) {
            this.error.set('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        this.saving.set(true);
        this.error.set('');

        const dto: CreateMedecinDto = {
            idMedecin: this.MedecinId() || 0,
            nom: f.nom,
            specialite: f.specialite,
            disponibilite: f.disponibilite,
        };

        const obs = this.isEdit()
            ? this.MedecinService.update(this.MedecinId()!, dto)
            : this.MedecinService.create(dto);

        obs.subscribe({
            next: () => this.router.navigate(['/medecins']),
            error: () => {
                this.error.set('Erreur lors de la sauvegarde.');
                this.saving.set(false);
            }
        });
    }
}
