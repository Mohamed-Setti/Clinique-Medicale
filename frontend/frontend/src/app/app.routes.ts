import { RendezvousFilters } from './features/rendezvous/components/rendezvous-filters/rendezvous-filters';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { RendezvousListComponent } from './features/rendezvous/pages/rendezvous-list/rendezvous-list';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'rendezvous', component: RendezvousListComponent },
  { path: '**', redirectTo: '' }
];