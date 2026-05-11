create extension if not exists pgcrypto;

drop table if exists public.simulations cascade;
drop table if exists public.credit_ledger cascade;
drop table if exists public.credit_accounts cascade;
drop table if exists public.api_keys cascade;
drop table if exists public.profiles cascade;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  email text,
  stripe_customer_id text unique,
  plan_id text not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  key_hash text not null unique,
  label text not null default 'Default',
  last_used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.credit_accounts (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  balance integer not null default 0,
  auto_topup_enabled boolean not null default false,
  auto_topup_threshold integer not null default 50,
  auto_topup_credits integer not null default 200,
  updated_at timestamptz not null default now(),
  constraint credit_accounts_balance_nonnegative check (balance >= 0)
);

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  delta integer not null,
  reason text not null,
  stripe_event_id text,
  simulation_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.simulations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  status text not null default 'completed',
  artifact_type text,
  objective text,
  requested_n integer,
  credits_charged integer not null default 0,
  request jsonb not null default '{}',
  result jsonb,
  error text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create or replace function public.add_credits(
  target_user_id uuid,
  credit_delta integer,
  credit_reason text,
  credit_metadata jsonb default '{}'
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_balance integer;
begin
  insert into public.credit_accounts (user_id, balance)
  values (target_user_id, greatest(credit_delta, 0))
  on conflict (user_id) do update
    set balance = public.credit_accounts.balance + credit_delta,
        updated_at = now()
  returning balance into new_balance;

  if new_balance < 0 then
    raise exception 'insufficient credits';
  end if;

  insert into public.credit_ledger (user_id, delta, reason, metadata)
  values (target_user_id, credit_delta, credit_reason, credit_metadata);

  return new_balance;
end;
$$;

alter table public.profiles enable row level security;
alter table public.api_keys enable row level security;
alter table public.credit_accounts enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.simulations enable row level security;

drop policy if exists "profiles-own-select" on public.profiles;
create policy "profiles-own-select"
on public.profiles for select
to authenticated
using ((select auth.uid()) = auth_user_id);

drop policy if exists "api-keys-own-select" on public.api_keys;
create policy "api-keys-own-select"
on public.api_keys for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = api_keys.user_id
    and profiles.auth_user_id = (select auth.uid())
  )
);

drop policy if exists "credits-own-select" on public.credit_accounts;
create policy "credits-own-select"
on public.credit_accounts for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = credit_accounts.user_id
    and profiles.auth_user_id = (select auth.uid())
  )
);

drop policy if exists "ledger-own-select" on public.credit_ledger;
create policy "ledger-own-select"
on public.credit_ledger for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = credit_ledger.user_id
    and profiles.auth_user_id = (select auth.uid())
  )
);

drop policy if exists "simulations-own-select" on public.simulations;
create policy "simulations-own-select"
on public.simulations for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = simulations.user_id
    and profiles.auth_user_id = (select auth.uid())
  )
);
