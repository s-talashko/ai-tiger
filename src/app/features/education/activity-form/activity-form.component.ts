import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, ActivityType } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="p-6 bg-opacity-20 bg-white backdrop-blur-lg rounded-xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {{ isEditMode ? 'Edit Activity' : 'Create New Activity' }}
          </h2>
          <a routerLink="/education" class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">← Back to Activities</a>
        </div>

        <!-- Form -->
        <form [formGroup]="activityForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Title</label>
              <input
                type="text"
                formControlName="title"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <select
                formControlName="type"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              >
                <option value="Education">Education</option>
                <option value="Social">Social</option>
                <option value="Team-building">Team-building</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Date and Time</label>
              <input
                type="datetime-local"
                formControlName="date"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <input
                type="text"
                formControlName="location"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
              <input
                type="text"
                formControlName="imageUrl"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                formControlName="description"
                rows="4"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                formControlName="tags"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="activityForm.invalid"
              class="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
            >
              {{ isEditMode ? 'Update Activity' : 'Create Activity' }}
            </button>
            <button
              type="button"
              routerLink="/education"
              class="py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ActivityFormComponent implements OnInit {
  activityForm: FormGroup;
  isEditMode = false;
  private activityId?: string;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      type: ['Education', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: [''],
      description: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnInit() {
    this.activityId = this.route.snapshot.paramMap.get('id') ?? undefined;
    
    if (this.activityId) {
      this.isEditMode = true;
      this.activityService.getActivity(this.activityId).subscribe(activity => {
        if (activity) {
          this.activityForm.patchValue({
            ...activity,
            date: new Date(activity.date).toISOString().slice(0, 16),
            tags: activity.tags.join(', ')
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      const activity: Partial<Activity> = {
        ...formValue,
        tags: formValue.tags.split(',').map((tag: string) => tag.trim()),
        date: new Date(formValue.date),
        hostId: '1', // TODO: Get from auth service
        hostName: 'Current User', // TODO: Get from auth service
        attendees: []
      };

      if (this.isEditMode && this.activityId) {
        this.activityService.updateActivity({ ...activity, id: this.activityId } as Activity)
          .subscribe(() => this.router.navigate(['/education']));
      } else {
        this.activityService.addActivity(activity as Omit<Activity, 'id'>)
          .subscribe(() => this.router.navigate(['/education']));
      }
    }
  }
}