import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Routes avec paramètres dynamiques → rendu côté serveur à la demande
  { path: 'patients/:id', renderMode: RenderMode.Server },
  { path: 'patients/:id/edit', renderMode: RenderMode.Server },
  { path: 'medecins/:id', renderMode: RenderMode.Server },
  { path: 'medecins/:id/edit', renderMode: RenderMode.Server },
  { path: 'consultations/new/:idRendezVous', renderMode: RenderMode.Server },
  { path: 'consultations/:id', renderMode: RenderMode.Server },
  { path: 'rendezvous/:id', renderMode: RenderMode.Server },
  { path: 'rendezvous/:id/edit', renderMode: RenderMode.Server },

  // Toutes les autres routes → prerendering statique au build
  { path: '**', renderMode: RenderMode.Prerender }
];