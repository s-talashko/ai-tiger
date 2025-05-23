import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity, ActivityType } from '../models/activity.model';

const STORAGE_KEY = 'activities';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [];

  constructor() {
    try {
      this.loadFromStorage();
      if (this.activities.length === 0) {
        this.activities = [
          {
            id: '1',
            title: 'Introduction to Quantum Computing',
            description: 'Learn the basics of quantum computing and its applications in space exploration.',
            type: 'Education',
            date: new Date('2025-04-15T14:00:00'),
            location: 'Virtual Reality Lab 3',
            imageUrl: 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg',
            hostId: '1',
            hostName: 'Dr. Quantum',
            attendees: ['1', '2', '3'],
            tags: ['quantum', 'technology', 'beginner']
          },
          {
            id: '2',
            title: 'Space Station Social Mixer',
            description: 'Meet your fellow space explorers in a casual setting.',
            type: 'Social',
            date: new Date('2025-04-20T18:00:00'),
            location: 'Observation Deck',
            imageUrl: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg',
            hostId: '2',
            hostName: 'Social Committee',
            attendees: ['1', '4', '5'],
            tags: ['networking', 'social', 'fun']
          }
        ];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Error initializing activities:', error);
      this.activities = [];
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.activities = JSON.parse(stored, (key, value) => {
          if (key === 'date') return new Date(value);
          return value;
        });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      throw new Error('Failed to load activities from storage');
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.activities));
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw new Error('Failed to save activities to storage');
    }
  }

  getActivities(): Observable<Activity[]> {
    try {
      return of(this.activities);
    } catch (error) {
      return throwError(() => new Error('Failed to fetch activities'));
    }
  }

  getActivity(id: string): Observable<Activity | undefined> {
    try {
      const activity = this.activities.find(activity => activity.id === id);
      if (!activity) {
        return throwError(() => new Error('Activity not found'));
      }
      return of(activity);
    } catch (error) {
      return throwError(() => new Error('Failed to fetch activity'));
    }
  }

  addActivity(activity: Omit<Activity, 'id'>): Observable<Activity> {
    try {
      const newActivity = {
        ...activity,
        id: Math.random().toString(36).substr(2, 9)
      };
      this.activities.push(newActivity);
      this.saveToStorage();
      return of(newActivity);
    } catch (error) {
      return throwError(() => new Error('Failed to add activity'));
    }
  }

  updateActivity(activity: Activity): Observable<Activity> {
    try {
      const index = this.activities.findIndex(a => a.id === activity.id);
      if (index === -1) {
        return throwError(() => new Error('Activity not found'));
      }
      this.activities[index] = activity;
      this.saveToStorage();
      return of(activity);
    } catch (error) {
      return throwError(() => new Error('Failed to update activity'));
    }
  }

  deleteActivity(id: string): Observable<void> {
    try {
      const initialLength = this.activities.length;
      this.activities = this.activities.filter(activity => activity.id !== id);
      if (this.activities.length === initialLength) {
        return throwError(() => new Error('Activity not found'));
      }
      this.saveToStorage();
      return of(void 0);
    } catch (error) {
      return throwError(() => new Error('Failed to delete activity'));
    }
  }

  joinActivity(activityId: string, userId: string): Observable<Activity | undefined> {
    try {
      const activity = this.activities.find(a => a.id === activityId);
      if (!activity) {
        return throwError(() => new Error('Activity not found'));
      }
      if (activity.attendees.includes(userId)) {
        return throwError(() => new Error('User already joined this activity'));
      }
      activity.attendees.push(userId);
      this.saveToStorage();
      return of(activity);
    } catch (error) {
      return throwError(() => new Error('Failed to join activity'));
    }
  }

  leaveActivity(activityId: string, userId: string): Observable<Activity | undefined> {
    try {
      const activity = this.activities.find(a => a.id === activityId);
      if (!activity) {
        return throwError(() => new Error('Activity not found'));
      }
      if (!activity.attendees.includes(userId)) {
        return throwError(() => new Error('User is not part of this activity'));
      }
      activity.attendees = activity.attendees.filter(id => id !== userId);
      this.saveToStorage();
      return of(activity);
    } catch (error) {
      return throwError(() => new Error('Failed to leave activity'));
    }
  }
}