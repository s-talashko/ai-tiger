import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Robot Workshop</h2>
        <a routerLink="/" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">← Back to Dashboard</a>
      </div>
      <p>Maintenance request form coming soon...</p>
    </div>
  `
})
export class MaintenanceComponent {}