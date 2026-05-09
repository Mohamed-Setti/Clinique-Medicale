import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  {
    path: 'patients',
    loadComponent: () =>
      import('./features/patients/pages/patient-list/patient-list').then(m => m.PatientList),
  },
  {
    path: 'patients/new',
    loadComponent: () =>
      import('./features/patients/pages/patient-form/patient-form').then(m => m.PatientForm),
  },
  {
    path: 'patients/:id',
    loadComponent: () =>
      import('./features/patients/pages/patient-details/patient-details').then(m => m.PatientDetails),
  },
  {
    path: 'patients/:id/edit',
    loadComponent: () =>
      import('./features/patients/pages/patient-form/patient-form').then(m => m.PatientForm),
  },
  {
    path: 'medecins',
    loadComponent: () =>
      import('./features/medecins/pages/medecin-list/medecin-list').then(m => m.MedecinList),
  },
  {
    path: 'medecins/new',
    loadComponent: () =>
      import('./features/medecins/pages/medecin-form/medecin-form').then(m => m.MedecinForm),
  },
  {
    path: 'medecins/:id',
    loadComponent: () =>
      import('./features/medecins/pages/medecin-details/medecin-details').then(m => m.MedecinDetails),
  },
  {
    path: 'medecins/:id/edit',
    loadComponent: () =>
      import('./features/medecins/pages/medecin-form/medecin-form').then(m => m.MedecinForm),
  },
  {
    path: 'consultations',
    loadComponent: () =>
      import('./features/consultation/pages/consultation-list/consultation-list').then(m => m.ConsultationList),
  },
  {
    path: 'consultations/new',
    loadComponent: () =>
      import('./features/consultation/pages/consultation-form/consultation-form').then(m => m.ConsultationForm),
  },
  {
    path: 'consultations/:id',
    loadComponent: () =>
      import('./features/consultation/pages/consultation-details/consultation-details').then(m => m.ConsultationDetails),
  },
  {
    path: 'rendezvous',
    loadComponent: () =>
      import('./features/rendezvous/pages/rendezvous-list/rendezvous-list').then(m => m.RendezVousList),
  },
  {
    path: 'rendezvous/:id',
    loadComponent: () =>
      import('./features/rendezvous/pages/rendezvous-details/rendezvous-details').then(m => m.RendezVousDetails),
  },
];
