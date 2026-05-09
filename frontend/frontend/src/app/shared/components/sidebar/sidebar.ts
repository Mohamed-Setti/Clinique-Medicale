import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  collapsed = signal(false);

  navItems: NavItem[] = [
    { label: 'Patients', route: '/patients', icon: 'patient' },
    { label: 'Médecins', route: '/medecins', icon: 'medecin' },
    { label: 'Consultations', route: '/consultations', icon: 'consultation' },
    { label: 'Rendez-vous', route: '/rendezvous', icon: 'rendezvous' },
  ];

  toggle() {
    this.collapsed.update(v => !v);
  }
}
