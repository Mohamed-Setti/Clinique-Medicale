import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RendezVousCalendar } from './rendezvous-calendar';
import { RendezVousService } from '../../services/rendezvous.service';
import { PatientService } from '../../../patients/services/patient.service';
import { MedecinService } from '../../../medecins/services/medecin.service';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

const mockRendezVous = [
    { idRendezVous: 1, date: new Date().toISOString().split('T')[0], heure: '09:00', idPatient: 1, idMedecin: 1, statut: 'CONFIRME' },
    { idRendezVous: 2, date: new Date().toISOString().split('T')[0], heure: '11:00', idPatient: 2, idMedecin: 2, statut: 'EN_ATTENTE' },
];

const mockRvService = { getAll: () => of(mockRendezVous) };
const mockPatientService = { getById: () => of({ nom: 'Ben Ali' }) };
const mockMedecinService = { getById: () => of({ nom: 'Dr. Trabelsi' }) };

describe('RendezVousCalendar', () => {
    let component: RendezVousCalendar;
    let fixture: ComponentFixture<RendezVousCalendar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RendezVousCalendar],
            providers: [
                provideRouter([]),
                { provide: RendezVousService, useValue: mockRvService },
                { provide: PatientService, useValue: mockPatientService },
                { provide: MedecinService, useValue: mockMedecinService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RendezVousCalendar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load rendezvous on init', () => {
        expect(component.rendezvous().length).toBe(2);
        expect(component.loading()).toBeFalsy();
    });

    it('should show 7 days in the week', () => {
        expect(component.weekDays().length).toBe(7);
    });

    it('should navigate to next week', () => {
        const before = component.weekDays()[0].toDateString();
        component.nextWeek();
        const after = component.weekDays()[0].toDateString();
        expect(before).not.toBe(after);
    });

    it('should navigate to previous week', () => {
        const before = component.weekDays()[0].toDateString();
        component.prevWeek();
        const after = component.weekDays()[0].toDateString();
        expect(before).not.toBe(after);
    });

    it('should go back to current week with goToday', () => {
        component.nextWeek();
        component.nextWeek();
        component.goToday();
        expect(component.weekOffset()).toBe(0);
    });

    it('should identify today correctly', () => {
        const today = new Date();
        expect(component.isToday(today)).toBeTruthy();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(component.isToday(yesterday)).toBeFalsy();
    });

    it('should return rendezvous for today', () => {
        const today = new Date();
        const rvs = component.getRvForDay(today);
        expect(rvs.length).toBe(2);
    });

    it('should return empty array for day with no rendezvous', () => {
        const future = new Date();
        future.setFullYear(future.getFullYear() + 1);
        expect(component.getRvForDay(future).length).toBe(0);
    });

    it('should return patient name after loading', () => {
        expect(component.getPatientName(1)).toBe('Ben Ali');
    });

    it('should return medecin name after loading', () => {
        expect(component.getMedecinName(1)).toBe('Dr. Trabelsi');
    });

    it('should return ... for unknown patient id', () => {
        expect(component.getPatientName(999)).toBe('...');
    });

    it('should set error on load failure', () => {
        const failService = { getAll: () => throwError(() => new Error('fail')) };
        TestBed.overrideProvider(RendezVousService, { useValue: failService });
        const f = TestBed.createComponent(RendezVousCalendar);
        f.detectChanges();
        expect(f.componentInstance.error()).toBe('Erreur lors du chargement.');
    });
});