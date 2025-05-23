import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-blue-900 to-black opacity-50"></div>
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          *ngFor="let feature of features" 
          (click)="navigate(feature.route)"
          (mouseenter)="onHover(feature)"
          (mouseleave)="onLeave(feature)"
          class="bg-opacity-20 bg-white backdrop-blur-lg rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 group"
        >
          <div class="text-6xl mb-4 group-hover:animate-bounce">{{ feature.icon }}</div>
          <h3 class="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {{ feature.name }}
          </h3>
          <p class="text-gray-300">{{ feature.description }}</p>
          <div class="mt-4 h-1 w-full bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  features = [
    {
      name: 'Healing Tower',
      icon: '✨',
      route: '/sick-leave',
      description: 'Request time off for recovery and healing',
      animationState: 'inactive'
    },
    {
      name: 'Education and Social Activities',
      icon: '📚',
      route: '/education',
      description: 'Discover learning events and social activities',
      animationState: 'inactive'
    },
    {
      name: 'Rocket Pad',
      icon: '🚀',
      route: '/travel',
      description: 'Book your corporate travels across the galaxy',
      animationState: 'inactive'
    },
    {
      name: 'Robot Workshop',
      icon: '🛠',
      route: '/maintenance',
      description: 'Report and track maintenance issues',
      animationState: 'inactive'
    },
    {
      name: 'Item Portal',
      icon: '📦',
      route: '/assets',
      description: 'Book company assets and equipment',
      animationState: 'inactive'
    },
    {
      name: 'Hologram Terminal',
      icon: '💰',
      route: '/expenses',
      description: 'Manage your expense reports and reimbursements',
      animationState: 'inactive'
    }
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  onHover(feature: any) {
    feature.animationState = 'active';
  }

  onLeave(feature: any) {
    feature.animationState = 'inactive';
  }
}