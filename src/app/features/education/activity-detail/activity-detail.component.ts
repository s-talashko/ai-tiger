import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6" *ngIf="activity">
      <!-- Error Message -->
      <div *ngIf="errorMessage" class="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 mb-4">
        {{ errorMessage }}
      </div>

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
            [src]="activity.imageUrl || defaultImageUrl"
            [alt]="activity.title"
            class="w-full h-64 object-cover rounded-xl"
            (error)="handleImageError($event)"
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
              *ngIf="!isAttending"
              (click)="joinActivity()"
              class="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Join Activity
            </button>
            <button
              *ngIf="isAttending"
              (click)="leaveActivity()"
              class="flex-1 py-2 px-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Leave Activity
            </button>
            <button
              *ngIf="activity.hostId === currentUserId"
              (click)="editActivity()"
              class="py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
            >
              Edit
            </button>
            <button
              *ngIf="activity.hostId === currentUserId"
              (click)="deleteActivity()"
              class="py-2 px-4 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ActivityDetailComponent implements OnInit {
  activity?: Activity;
  currentUserId = '1'; // TODO: Get from auth service
  errorMessage = '';
  defaultImageUrl = 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivity(id).subscribe({
        next: (activity) => {
          if (activity) {
            this.activity = activity;
          } else {
            this.errorMessage = 'Activity not found';
            setTimeout(() => this.router.navigate(['/education']), 2000);
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
          setTimeout(() => this.router.navigate(['/education']), 2000);
        }
      });
    }
  }

  get isAttending(): boolean {
    return this.activity?.attendees.includes(this.currentUserId) ?? false;
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMM d, yyyy h:mm a');
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImageUrl;
  }

  async joinActivity() {
    if (!this.activity) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Join Activity',
        message: `Are you sure you want to join "${this.activity.title}"?`,
        confirmText: 'Join',
        cancelText: 'Cancel'
      },
      width: '400px',
      maxWidth: '90vw',
      panelClass: ['custom-dialog-container', 'centered-dialog'],
      backdropClass: 'custom-backdrop',
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.activity) {
        this.activityService.joinActivity(this.activity.id, this.currentUserId).subscribe({
          next: (updatedActivity) => {
            if (updatedActivity) {
              this.activity = updatedActivity;
              this.errorMessage = '';
            }
          },
          error: (error) => {
            this.errorMessage = error.message;
          }
        });
      }
    });
  }

  async leaveActivity() {
    if (!this.activity) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Leave Activity',
        message: `Are you sure you want to leave "${this.activity.title}"?`,
        confirmText: 'Leave',
        cancelText: 'Cancel'
      },
      width: '400px',
      maxWidth: '90vw',
      panelClass: ['custom-dialog-container', 'centered-dialog'],
      backdropClass: 'custom-backdrop',
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.activity) {
        this.activityService.leaveActivity(this.activity.id, this.currentUserId).subscribe({
          next: (updatedActivity) => {
            if (updatedActivity) {
              this.activity = updatedActivity;
              this.errorMessage = '';
            }
          },
          error: (error) => {
            this.errorMessage = error.message;
          }
        });
      }
    });
  }

  editActivity() {
    if (this.activity) {
      this.router.navigate(['/education/edit', this.activity.id]);
    }
  }

  async deleteActivity() {
    if (!this.activity) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Activity',
        message: `Are you sure you want to delete "${this.activity.title}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      },
      width: '400px',
      maxWidth: '90vw',
      panelClass: ['custom-dialog-container', 'centered-dialog'],
      backdropClass: 'custom-backdrop',
      hasBackdrop: true,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.activity) {
        this.activityService.deleteActivity(this.activity.id).subscribe({
          next: () => {
            this.router.navigate(['/education']);
          },
          error: (error) => {
            this.errorMessage = error.message;
          }
        });
      }
    });
  }
}