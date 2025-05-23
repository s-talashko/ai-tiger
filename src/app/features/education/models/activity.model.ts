export type ActivityType = 'Education' | 'Social' | 'Team-building';

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  date: Date;
  location: string;
  imageUrl?: string;
  hostId: string;
  hostName: string;
  attendees: string[];
  tags: string[];
}