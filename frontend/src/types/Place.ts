export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3 | 4;
  photos: string[];
  openingHours: OpeningHours;
  website?: string;
  phone?: string;
  features: string[];
  distance?: number; // in kilometers from user
}

export interface OpeningHours {
  isOpen: boolean;
  openNow: boolean;
  periods: OpeningPeriod[];
  weekdayText: string[];
}

export interface OpeningPeriod {
  open: TimeOfDay;
  close?: TimeOfDay;
}

export interface TimeOfDay {
  day: number; // 0-6 (Sunday to Saturday)
  time: string; // HHMM format
}

export type PlaceCategory = 
  | 'restaurant'
  | 'attraction'
  | 'entertainment'
  | 'shopping'
  | 'hotel'
  | 'transport'
  | 'event'
  | 'culture'
  | 'nature'
  | 'nightlife';

export interface Recommendation {
  place: Place;
  score: number;
  reason: string;
  timeToVisit?: string;
  estimatedDuration?: number; // in minutes
}