import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RendezVousService } from '../../services/rendezvous.service';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { RendezVous } from '../../models/rendezvous';

@Component({
    selector: 'app-rendezvous-calendar',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './rendezvous-calendar.html',
    styleUrl: './rendezvous-calendar.css',
})
export class RendezVousCalendar implements OnInit {
    private rvService = inject(RendezVousService);
    private patientService = inject(PatientService);
    private medecinService = inject(MedecinService);

    rendezvous = signal<RendezVous[]>([]);
    patientNames = signal<Map<number, string>>(new Map());
    medecinNames = signal<Map<number, string>>(new Map());
    loading = signal(true);
    error = signal('');
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
        const first = days[0];
        const last = days[6];
        const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
        return `${fmt(first)} – ${fmt(last)} ${last.getFullYear()}`;
    });

    getRvForDay(day: Date): RendezVous[] {
        const dateStr = day.toISOString().split('T')[0];
        return this.rendezvous()
            .filter(rv => rv.date?.startsWith(dateStr))
            .sort((a, b) => (a.heure ?? '').localeCompare(b.heure ?? ''));
    }

    isToday(day: Date): boolean {
        const today = new Date();
        return day.toDateString() === today.toDateString();
    }

    getPatientName(id: number): string {
        return this.patientNames().get(id) ?? '...';
    }

    getMedecinName(id: number): string {
        return this.medecinNames().get(id) ?? '...';
    }

    prevWeek() { this.weekOffset.update(w => w - 1); }
    nextWeek() { this.weekOffset.update(w => w + 1); }
    goToday() { this.weekOffset.set(0); }

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

    ngOnInit() {
        this.load();
    }

    loadNames(data: RendezVous[]) {
        console.log(data);

        const patientIds = [...new Set(data.map(rv => rv.idPatient))];
        const medecinIds = [...new Set(data.map(rv => rv.idMedecin))];

        console.log(patientIds);
        console.log(medecinIds);

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
}