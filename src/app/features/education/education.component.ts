import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Floating Library</h2>
        <a routerLink="/" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">← Back to Dashboard</a>
      </div>
      <p>Education and events calendar coming soon...</p>
    </div>
  `
})
export class EducationComponent {}