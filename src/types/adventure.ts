export type AdventureMood = 'easy' | 'playful' | 'wild' | 'learn';
export type Budget = 'free' | 'under-25' | 'under-50' | 'flexible';

export type PlannerPreferences = {
  minutes: number;
  radiusMiles: number;
  adults: number;
  kids: number;
  budget: Budget;
  mood: AdventureMood;
};

export type Place = {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  address: string;
  latitude: number;
  longitude: number;
  estimatedMinutes: number;
  typicalCost: number;
  kidFriendly: boolean;
  indoor: boolean;
  verifiedAt: string;
  summary: string;
};

export type AdventureStop = Place & {
  order: number;
  mission: string;
};

export type Adventure = {
  id: string;
  title: string;
  subtitle: string;
  totalMinutes: number;
  estimatedCost: number;
  distanceMiles: number;
  stops: AdventureStop[];
};
