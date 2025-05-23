import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, ActivityType } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MatTooltipModule],
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
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium" [class]="getFieldTextColor('title')">Title *</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Give your activity a clear and descriptive title"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <input
                type="text"
                formControlName="title"
                [class]="getInputClasses('title')"
                [class.shake]="isFieldInvalid('title')"
              />
              <div *ngIf="isFieldInvalid('title')" class="mt-1 text-red-400 text-sm">
                Title is required
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium" [class]="getFieldTextColor('type')">Type *</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Select the type of activity you're organizing"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <select
                formControlName="type"
                [class]="getInputClasses('type')"
                [class.shake]="isFieldInvalid('type')"
              >
                <option value="Education">Education</option>
                <option value="Social">Social</option>
                <option value="Team-building">Team-building</option>
              </select>
              <div *ngIf="isFieldInvalid('type')" class="mt-1 text-red-400 text-sm">
                Type is required
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium" [class]="getFieldTextColor('date')">Date and Time *</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="When will this activity take place?"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <input
                type="datetime-local"
                formControlName="date"
                [class]="getInputClasses('date')"
                [class.shake]="isFieldInvalid('date')"
              />
              <div *ngIf="isFieldInvalid('date')" class="mt-1 text-red-400 text-sm">
                Date and time are required
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium text-gray-300">Location</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Where will this activity be held?"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <input
                type="text"
                formControlName="location"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium text-gray-300">Image URL</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Add an image URL to make your activity more appealing"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <input
                type="text"
                formControlName="imageUrl"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium text-gray-300">Description</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Provide details about what participants can expect"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
              <textarea
                formControlName="description"
                rows="4"
                class="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <div>
              <div class="flex items-center gap-2 mb-1">
                <label class="text-sm font-medium text-gray-300">Tags</label>
                <div 
                  class="text-gray-400 cursor-help w-4 h-4 flex items-center justify-center"
                  matTooltip="Add comma-separated tags to help categorize your activity"
                  matTooltipPosition="right"
                  [matTooltipShowDelay]="200"
                >ℹ️</div>
              </div>
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
              class="flex-1 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  `,
  styles: [`
    .shake {
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `]
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
      location: [''],
      imageUrl: [''],
      description: [''],
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.activityForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldTextColor(fieldName: string): string {
    return this.isFieldInvalid(fieldName) ? 'text-red-400' : 'text-gray-300';
  }

  getInputClasses(fieldName: string): string {
    const baseClasses = 'w-full px-4 py-2 bg-black/30 rounded-lg border focus:outline-none transition-colors duration-300';
    return this.isFieldInvalid(fieldName)
      ? `${baseClasses} border-red-400 focus:border-red-400`
      : `${baseClasses} border-white/10 focus:border-cyan-400`;
  }

  onSubmit() {
    if (this.activityForm.valid) {
      const formValue = this.activityForm.value;
      const activity: Partial<Activity> = {
        ...formValue,
        tags: formValue.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
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
    } else {
      Object.keys(this.activityForm.controls).forEach(key => {
        const control = this.activityForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}