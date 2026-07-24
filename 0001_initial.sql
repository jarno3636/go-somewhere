create extension if not exists pgcrypto;

create table public.places (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  neighborhood text,
  address text not null,
  latitude double precision not null,
  longitude double precision not null,
  estimated_minutes integer not null check (estimated_minutes > 0),
  typical_cost_cents integer not null default 0 check (typical_cost_cents >= 0),
  kid_friendly boolean not null default false,
  indoor boolean not null default false,
  summary text not null,
  official_url text,
  verified_at timestamptz,
  verification_status text not null default 'draft' check (verification_status in ('draft','verified','stale','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.adventures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  preferences jsonb not null default '{}'::jsonb,
  estimated_minutes integer not null,
  estimated_cost_cents integer not null default 0,
  status text not null default 'saved' check (status in ('saved','started','completed','abandoned')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.adventure_stops (
  adventure_id uuid not null references public.adventures(id) on delete cascade,
  place_id uuid not null references public.places(id),
  stop_order integer not null check (stop_order > 0),
  mission text,
  primary key (adventure_id, stop_order)
);

alter table public.places enable row level security;
alter table public.adventures enable row level security;
alter table public.adventure_stops enable row level security;

create policy "verified places are public" on public.places for select using (verification_status = 'verified');
create policy "users manage own adventures" on public.adventures for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "users read own adventure stops" on public.adventure_stops for select using (exists (select 1 from public.adventures a where a.id = adventure_id and a.user_id = auth.uid()));
