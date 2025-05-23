import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6" *ngIf="activity">
      <!-- Header -->
      <div class="p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {{ activity.title }}
          </h2>
          <a routerLink="/education" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">← Back to Activities</a>
        </div>

        <!-- Activity Details -->
        <div class="space-y-6">
          <img
            [src]="activity.imageUrl"
            [alt]="activity.title"
            class="w-full h-64 object-cover rounded-xl"
          />
          
          <div class="flex flex-wrap gap-4 text-sm">
            <div class="bg-cyan-500/20 px-3 py-1.5 rounded-full">
              <span class="text-cyan-300">📅 {{ formatDate(activity.date) }}</span>
            </div>
            <div class="bg-purple-500/20 px-3 py-1.5 rounded-full">
              <span class="text-purple-300">📍 {{ activity.location }}</span>
            </div>
            <div class="bg-blue-500/20 px-3 py-1.5 rounded-full">
              <span class="text-blue-300">👤 Host: {{ activity.hostName }}</span>
            </div>
          </div>

          <div class="prose prose-invert max-w-none">
            <p class="text-gray-300">{{ activity.description }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              *ngFor="let tag of activity.tags"
              class="text-xs bg-purple-500/20 px-2 py-1 rounded-full text-purple-300"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Attendees Section -->
          <div class="bg-black/30 rounded-xl p-6">
            <h3 class="text-lg font-semibold mb-4">Attendees ({{ activity.attendees.length }})</h3>
            <div class="flex flex-wrap gap-2">
              <div
                *ngFor="let attendee of activity.attendees"
                class="bg-white/10 px-3 py-1.5 rounded-full text-sm"
              >
                👤 User {{ attendee }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              (click)="joinActivity()"
              class="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Join Activity
            </button>
            <button
              *ngIf="activity.hostId === '1'"
              (click)="editActivity()"
              class="py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ActivityDetailComponent implements OnInit {
  activity?: Activity;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivity(id).subscribe(activity => {
        if (activity) {
          this.activity = activity;
        } else {
          this.router.navigate(['/education']);
        }
      });
    }
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMM d, yyyy h:mm a');
  }

  joinActivity() {
    if (this.activity) {
      // TODO: Implement join logic
      console.log('Joining activity:', this.activity.id);
    }
  }

  editActivity() {
    if (this.activity) {
      this.router.navigate(['/education/edit', this.activity.id]);
    }
  }
}