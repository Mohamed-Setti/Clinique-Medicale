import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  /** Title displayed in the navbar */
  @Input() pageTitle: string = '';

  /** Emitted when the hamburger/icon is clicked to toggle the sidebar */
  @Output() toggleSidebar = new EventEmitter<void>();

  /** Called from the template when the toggle button is clicked */
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}

