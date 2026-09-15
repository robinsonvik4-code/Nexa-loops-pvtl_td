-- Run once in your Supabase SQL Editor. No public access is granted.
create table if not exists public.nl_content (
 key text primary key check (key in ('portfolio','services','reels','beforeAfter','testimonials')),
 items jsonb,
 version integer not null default 0,
 updated_at timestamptz not null default now()
);
create table if not exists public.nl_leads (
 id uuid primary key default gen_random_uuid(),
 ticket_id text unique not null,
 created_at timestamptz not null default now(),
 full_name text not null, phone text not null, email text not null default '',
 brand text not null default '', service text not null, budget text not null,
 timeline text not null, message text not null,
 status text not null default 'New' check (status in ('New','Contacted','In progress','Completed','Archived')),
 notes text not null default ''
);
alter table public.nl_content enable row level security;
alter table public.nl_leads enable row level security;
revoke all on public.nl_content, public.nl_leads from anon, authenticated;
grant select,insert,update,delete on public.nl_content, public.nl_leads to service_role;
insert into public.nl_content(key) values ('portfolio'),('services'),('reels'),('beforeAfter'),('testimonials') on conflict do nothing;

-- Persistent abuse protection shared by all serverless instances.
create table if not exists public.nl_rate_limits (
 key text primary key,
 started_at timestamptz not null default now(),
 attempts integer not null default 1
);
alter table public.nl_rate_limits enable row level security;
revoke all on public.nl_rate_limits from anon,authenticated;
grant all on public.nl_rate_limits to service_role;
create or replace function public.nl_accept_attempt(bucket text)
returns boolean language plpgsql security invoker set search_path = public as $$
declare n integer;
begin
 insert into public.nl_rate_limits(key) values(bucket)
 on conflict(key) do update set
 attempts=case when nl_rate_limits.started_at < now()-interval '10 minutes' then 1 else nl_rate_limits.attempts+1 end,
 started_at=case when nl_rate_limits.started_at < now()-interval '10 minutes' then now() else nl_rate_limits.started_at end
 returning attempts into n;
 delete from public.nl_rate_limits where started_at < now()-interval '1 day';
 return n<=5;
end; $$;
revoke all on function public.nl_accept_attempt(text) from public,anon,authenticated;
grant execute on function public.nl_accept_attempt(text) to service_role;

create index if not exists nl_leads_created_at_idx on public.nl_leads (created_at desc);
create index if not exists nl_rate_limits_started_at_idx on public.nl_rate_limits (started_at);
