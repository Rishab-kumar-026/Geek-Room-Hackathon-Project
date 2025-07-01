export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  savedPlaces: SavedPlace[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  budget: 'low' | 'medium' | 'high';
  categories: string[];
  radius: number; // in kilometers
  language: string;
  currency: string;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  recommendations: boolean;
  events: boolean;
}

export interface SavedPlace {
  _id: string;
  placeId: string;
  name: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  notes?: string;
  visitDate?: Date;
  isVisited: boolean;
}