import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedecinService } from '../../services/medecin.service';
import { Medecin } from '../../models/medecin';

@Component({
    selector: 'app-medecin-details',
    imports: [RouterLink, CommonModule],
    templateUrl: './medecin-details.html',
    styleUrl: './medecin-details.css',
})
export class MedecinDetails implements OnInit {
    private medecinService = inject(MedecinService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    medecin = signal<Medecin | null>(null);
    loading = signal(true);
    error = signal('');
    showDeleteConfirm = signal(false);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.medecinService.getById(+id).subscribe({
                next: p => { this.medecin.set(p); this.loading.set(false); },
                error: () => { this.error.set('medecin introuvable.'); this.loading.set(false); }
            });
        }
    }

    age(date: string): number {
        const birth = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();

        const monthDiff = today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    }

    delete() {
        const p = this.medecin();
        if (!p) return;
        this.medecinService.delete(p.idMedecin).subscribe({
            next: () => this.router.navigate(['/medecins']),
            error: () => this.error.set('Erreur lors de la suppression.')
        });
    }
}
