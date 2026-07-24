import type { Place } from '@/types/adventure';

// Seed data for UI development only. Replace with editor-verified Supabase records before launch.
export const places: Place[] = [
  {
    id: 'phil-hardberger-park',
    name: 'Phil Hardberger Park',
    category: 'Nature',
    neighborhood: 'North Central',
    address: 'San Antonio, TX',
    latitude: 29.556,
    longitude: -98.526,
    estimatedMinutes: 75,
    typicalCost: 0,
    kidFriendly: true,
    indoor: false,
    verifiedAt: '2026-07-24',
    summary: 'An easy outdoor reset with trails, open space, and room to explore.'
  },
  {
    id: 'japanese-tea-garden',
    name: 'Japanese Tea Garden',
    category: 'Garden',
    neighborhood: 'Brackenridge Park',
    address: 'San Antonio, TX',
    latitude: 29.459,
    longitude: -98.477,
    estimatedMinutes: 60,
    typicalCost: 0,
    kidFriendly: true,
    indoor: false,
    verifiedAt: '2026-07-24',
    summary: 'A compact scenic stop with winding paths and strong photo moments.'
  },
  {
    id: 'the-doseum',
    name: 'The DoSeum',
    category: 'Museum',
    neighborhood: 'Broadway Cultural Corridor',
    address: 'San Antonio, TX',
    latitude: 29.453,
    longitude: -98.468,
    estimatedMinutes: 120,
    typicalCost: 60,
    kidFriendly: true,
    indoor: true,
    verifiedAt: '2026-07-24',
    summary: 'A hands-on indoor anchor for families who want learning and active play.'
  },
  {
    id: 'hemisfair',
    name: 'Hemisfair',
    category: 'Play',
    neighborhood: 'Downtown',
    address: 'San Antonio, TX',
    latitude: 29.419,
    longitude: -98.484,
    estimatedMinutes: 75,
    typicalCost: 0,
    kidFriendly: true,
    indoor: false,
    verifiedAt: '2026-07-24',
    summary: 'A lively downtown stop suited to short family outings and flexible pacing.'
  }
];
