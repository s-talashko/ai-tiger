import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity, ActivityType } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [
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

  getActivities(): Observable<Activity[]> {
    return of(this.activities);
  }

  getActivity(id: string): Observable<Activity | undefined> {
    return of(this.activities.find(activity => activity.id === id));
  }

  addActivity(activity: Omit<Activity, 'id'>): Observable<Activity> {
    const newActivity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9)
    };
    this.activities.push(newActivity);
    return of(newActivity);
  }

  updateActivity(activity: Activity): Observable<Activity> {
    const index = this.activities.findIndex(a => a.id === activity.id);
    if (index !== -1) {
      this.activities[index] = activity;
    }
    return of(activity);
  }

  deleteActivity(id: string): Observable<void> {
    this.activities = this.activities.filter(activity => activity.id !== id);
    return of(void 0);
  }

  joinActivity(activityId: string, userId: string): Observable<Activity | undefined> {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity && !activity.attendees.includes(userId)) {
      activity.attendees.push(userId);
      return of(activity);
    }
    return of(undefined);
  }

  leaveActivity(activityId: string, userId: string): Observable<Activity | undefined> {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
      activity.attendees = activity.attendees.filter(id => id !== userId);
      return of(activity);
    }
    return of(undefined);
  }
}