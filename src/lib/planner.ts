import { places } from '@/data/places';
import type { Adventure, PlannerPreferences, Place } from '@/types/adventure';

const budgetCaps = {
  free: 0,
  'under-25': 25,
  'under-50': 50,
  flexible: Number.POSITIVE_INFINITY
} as const;

function scorePlace(place: Place, input: PlannerPreferences): number {
  let score = 0;
  if (input.kids > 0 && place.kidFriendly) score += 4;
  if (place.estimatedMinutes <= input.minutes) score += 3;
  if (place.typicalCost <= budgetCaps[input.budget]) score += 3;
  if (input.mood === 'learn' && place.category === 'Museum') score += 5;
  if (input.mood === 'wild' && place.category === 'Nature') score += 5;
  if (input.mood === 'playful' && place.category === 'Play') score += 5;
  if (input.mood === 'easy' && place.typicalCost === 0) score += 4;
  return score;
}

export function buildAdventure(input: PlannerPreferences): Adventure {
  const ranked = [...places]
    .filter((place) => place.typicalCost <= budgetCaps[input.budget])
    .sort((a, b) => scorePlace(b, input) - scorePlace(a, input));

  const chosen: Place[] = [];
  let usedMinutes = 0;
  let usedCost = 0;

  for (const place of ranked) {
    const travelBuffer = chosen.length === 0 ? 20 : 25;
    if (usedMinutes + place.estimatedMinutes + travelBuffer > input.minutes) continue;
    if (usedCost + place.typicalCost > budgetCaps[input.budget]) continue;
    chosen.push(place);
    usedMinutes += place.estimatedMinutes + travelBuffer;
    usedCost += place.typicalCost;
    if (chosen.length === 3) break;
  }

  const fallback = chosen.length > 0 ? chosen : [ranked[0] ?? places[0]];

  return {
    id: `adventure-${Date.now()}`,
    title: input.mood === 'wild' ? 'The Nearby Wild' : 'A Good Day to Go Somewhere',
    subtitle: 'A realistic outing assembled around the time and budget you have today.',
    totalMinutes: Math.min(input.minutes, fallback.reduce((sum, stop) => sum + stop.estimatedMinutes + 20, 0)),
    estimatedCost: fallback.reduce((sum, stop) => sum + stop.typicalCost, 0),
    distanceMiles: Math.min(input.radiusMiles, 12),
    stops: fallback.map((stop, index) => ({
      ...stop,
      order: index + 1,
      mission: index === 0
        ? 'Find one detail everyone else walks past.'
        : index === 1
          ? 'Let the youngest explorer choose the next five minutes.'
          : 'Take one photo that captures the whole day.'
    }))
  };
}
