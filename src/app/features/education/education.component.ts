import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Activity, ActivityType } from './models/activity.model';
import { ActivityService } from './services/activity.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Back Link -->
      <div>
        <a routerLink="/" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">← Back to Dashboard</a>
      </div>

      <!-- Header -->
      <div class="p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Education and Social Activities
          </h2>
          <button
            (click)="createActivity()"
            class="btn-primary"
          >
            Create Activity
          </button>
        </div>

        <!-- Search and Filters -->
        <div class="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search activities..."
            class="flex-1 px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
          />
          <select
            [(ngModel)]="selectedType"
            class="px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400 transition-colors duration-300"
          >
            <option value="">All Types</option>
            <option value="Education">Education</option>
            <option value="Social">Social</option>
            <option value="Team-building">Team-building</option>
          </select>
        </div>
      </div>

      <!-- Activity Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let activity of filteredActivities"
          class="bg-opacity-20 bg-white backdrop-blur-lg rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
          (click)="viewActivity(activity.id)"
        >
          <img
            [src]="activity.imageUrl || defaultImageUrl"
            [alt]="activity.title"
            class="w-full h-48 object-cover rounded-lg mb-4"
            (error)="handleImageError($event)"
          />
          <div class="space-y-2">
            <h3 class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {{ activity.title }}
            </h3>
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <span class="bg-cyan-500/20 px-2 py-1 rounded">{{ activity.type }}</span>
              <span>{{ formatDate(activity.date) }}</span>
            </div>
            <p class="text-gray-300">{{ activity.description }}</p>
            <div class="flex items-center gap-2 mt-4">
              <span class="text-sm text-gray-400">📍 {{ activity.location }}</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                *ngFor="let tag of activity.tags"
                class="text-xs bg-purple-500/20 px-2 py-1 rounded-full text-purple-300"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Counter -->
      <div class="mt-4 text-sm text-gray-400 text-right">
        {{ filteredActivities.length }} of {{ activities.length }} activities
      </div>
    </div>
  `
})
export class EducationComponent implements OnInit {
  activities: Activity[] = [];
  searchTerm = '';
  selectedType: ActivityType | '' = '';
  defaultImageUrl = 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg';

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  get filteredActivities(): Activity[] {
    return this.activities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          activity.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.selectedType || activity.type === this.selectedType;
      return matchesSearch && matchesType;
    });
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMM d, yyyy h:mm a');
  }

  createActivity() {
    this.router.navigate(['/education/new']);
  }

  viewActivity(id: string) {
    this.router.navigate(['/education', id]);
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImageUrl;
  }
}