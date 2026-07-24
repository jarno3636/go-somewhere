# Go Somewhere

A real Expo/React Native starter for an iPhone-first local adventure planner.

## What already works
- Mobile-first Today planner
- Time, mood, budget, and drive-radius controls
- Deterministic itinerary engine using trusted seed records
- Full adventure result screen with ordered stops and missions
- Explore and Passport tabs
- Supabase client foundation
- Initial Postgres schema with Row Level Security

## Install
Node 22 is recommended.

```bash
npm install
npx expo install --fix
cp .env.example .env
npm run doctor
npm run start
```

Open the QR code in Expo Go, or press `i` on a Mac with Xcode installed.

`npx expo install --fix` is intentional: it aligns all React Native and Expo-managed native packages to the exact versions bundled with SDK 57.

## Next build slice
1. Supabase authentication with Sign in with Apple
2. Replace local seed records with verified `places` queries
3. Save and complete adventures
4. Map and directions handoff
5. Editorial admin dashboard
6. Weather-aware filtering
7. RevenueCat paywall after retention is proven

## Product rule
AI may write titles, transitions, and missions. It must never invent the place, hours, price, accessibility, or operating status.
