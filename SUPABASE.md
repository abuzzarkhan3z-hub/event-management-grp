# SUPABASE.md: Backend Setup for Abu Maa's Event Management Group

Complete Supabase backend guide: project setup, database schema, security (RLS), storage, auth, and Next.js integration. Pairs with `PRD.md` and `DESIGN.md`.

---

## 1. Setup Steps

1. Go to https://supabase.com and create a new project (name: `abu-maaz-events`, region: **Mumbai (ap-south-1)** for the best speed in India).
2. Save the database password somewhere safe.
3. Open **SQL Editor** and run the SQL sections below **in order** (Sections 3 to 9).
4. Go to **Authentication > Providers** and enable **Email** (and **Phone/OTP** later if wanted).
5. Go to **Authentication > URL Configuration** and set the Site URL (`http://localhost:3000` for now, your real domain later).
6. Create your own account on the website, then promote it to admin (Section 10).
7. Copy the keys from **Project Settings > API** into `.env.local` (Section 11).

---

## 2. Architecture Summary

| Piece | Supabase Feature |
|-------|------------------|
| Database | PostgreSQL |
| Login (admin, staff, customer) | Supabase Auth, with a `profiles` table for roles |
| Security | Row Level Security (RLS) on every table |
| Images, PDFs, bills | Supabase Storage |
| Public forms (enquiry, grocery order) | Anon insert policy and RPC functions |
| New enquiry alerts | Supabase Realtime (admin dashboard) |
| Business logic (numbering, balances) | SQL triggers and functions |

**Roles:** `admin`, `manager`, `staff`, `customer`, `vendor`.

---

## 3. Extensions, Enums, Sequences

```sql
create extension if not exists "pgcrypto";

create type user_role      as enum ('admin','manager','staff','customer','vendor');
create type lead_status    as enum ('new','contacted','quotation_sent','negotiation','confirmed','lost');
create type event_type     as enum ('wedding','engagement','walima','aqiqah','birthday','corporate','other');
create type event_status   as enum ('tentative','confirmed','completed','cancelled');
create type order_type     as enum ('catering','grocery');
create type order_status   as enum ('requested','quoted','confirmed','in_progress','completed','cancelled');
create type quote_status   as enum ('draft','sent','accepted','rejected','expired');
create type invoice_status as enum ('unpaid','partial','paid','cancelled');
create type payment_method as enum ('cash','upi','bank_transfer','cheque','online');
create type food_type      as enum ('veg','non_veg','mixed');
create type package_tier   as enum ('silver','gold','premium','custom');

create sequence order_seq   start 1001;
create sequence quote_seq   start 1001;
create sequence invoice_seq start 1001;
```

---

## 4. Tables

```sql
-- 4.1 Profiles (linked to auth.users)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  email       text,
  role        user_role not null default 'customer',
  language    text not null default 'en' check (language in ('en','hi')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 4.2 Site settings (business info, bank details, limits)
create table public.site_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- 4.3 Enquiries / leads
create table public.enquiries (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  phone          text not null,
  email          text,
  event_type     event_type,
  event_date     date,
  guests         int check (guests is null or guests > 0),
  city           text,
  message        text,
  source         text not null default 'website',
  status         lead_status not null default 'new',
  notes          text,
  follow_up_date date,
  assigned_to    uuid references public.profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 4.4 Menu items and packages
create table public.menu_items (
  id             uuid primary key default gen_random_uuid(),
  name_en        text not null,
  name_hi        text,
  category       text not null,              -- e.g. Starters, Main Course, Rice, Bread, Dessert, Beverages
  is_veg         boolean not null default true,
  description_en text,
  description_hi text,
  image_url      text,
  cost_per_plate numeric(10,2) default 0,
  is_active      boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table public.packages (
  id              uuid primary key default gen_random_uuid(),
  name_en         text not null,
  name_hi         text,
  tier            package_tier not null default 'custom',
  food_type       food_type not null default 'mixed',
  price_per_plate numeric(10,2) not null check (price_per_plate >= 0),
  description_en  text,
  description_hi  text,
  image_url       text,
  is_popular      boolean not null default false,
  is_active       boolean not null default true,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table public.package_items (
  package_id    uuid references public.packages(id) on delete cascade,
  menu_item_id  uuid references public.menu_items(id) on delete cascade,
  primary key (package_id, menu_item_id)
);

-- 4.5 Grocery (kirana) catalog
create table public.product_categories (
  id          uuid primary key default gen_random_uuid(),
  name_en     text not null,
  name_hi     text,
  slug        text not null unique,
  image_url   text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  updated_at  timestamptz not null default now()
);

create table public.products (
  id                uuid primary key default gen_random_uuid(),
  category_id       uuid references public.product_categories(id) on delete set null,
  name_en           text not null,
  name_hi           text,
  unit              text not null default 'kg',      -- kg, litre, packet, bag, box
  price             numeric(10,2),
  price_on_request  boolean not null default false,
  min_qty           numeric(10,2) not null default 1,
  stock_qty         numeric(12,2) not null default 0,
  reorder_level     numeric(12,2) not null default 0,
  image_url         text,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- 4.6 Events (bookings)
create table public.events (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid references public.profiles(id) on delete set null,
  enquiry_id     uuid references public.enquiries(id) on delete set null,
  title          text not null,
  contact_name   text,
  contact_phone  text,
  event_type     event_type not null default 'wedding',
  event_date     date not null,
  start_time     time,
  venue          text,
  city           text,
  guests         int check (guests is null or guests > 0),
  package_id     uuid references public.packages(id) on delete set null,
  status         event_status not null default 'tentative',
  total_amount   numeric(12,2) not null default 0,
  notes          text,
  created_by     uuid references public.profiles(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- 4.7 Orders (catering and grocery)
create table public.orders (
  id               uuid primary key default gen_random_uuid(),
  order_number     text not null unique default ('ORD-' || lpad(nextval('order_seq')::text, 5, '0')),
  order_type       order_type not null,
  customer_id      uuid references public.profiles(id) on delete set null,
  guest_name       text,
  guest_phone      text,
  guest_email      text,
  delivery_address text,
  required_date    date,
  event_id         uuid references public.events(id) on delete set null,
  status           order_status not null default 'requested',
  notes            text,
  total_amount     numeric(12,2) not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table public.order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders(id) on delete cascade,
  product_id   uuid references public.products(id) on delete set null,
  description  text not null,
  quantity     numeric(12,2) not null check (quantity > 0),
  unit         text,
  unit_price   numeric(10,2)
);

-- 4.8 Quotations
create table public.quotations (
  id            uuid primary key default gen_random_uuid(),
  quote_number  text not null unique default ('QT-' || to_char(now(),'YYYY') || '-' || lpad(nextval('quote_seq')::text, 4, '0')),
  customer_id   uuid references public.profiles(id) on delete set null,
  enquiry_id    uuid references public.enquiries(id) on delete set null,
  order_id      uuid references public.orders(id) on delete set null,
  event_id      uuid references public.events(id) on delete set null,
  guest_name    text,
  guest_phone   text,
  status        quote_status not null default 'draft',
  subtotal      numeric(12,2) not null default 0,
  discount      numeric(12,2) not null default 0,
  tax_percent   numeric(5,2)  not null default 0,
  total         numeric(12,2) not null default 0,
  valid_until   date,
  terms         text,
  pdf_url       text,
  created_by    uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.quotation_items (
  id            uuid primary key default gen_random_uuid(),
  quotation_id  uuid not null references public.quotations(id) on delete cascade,
  description   text not null,
  quantity      numeric(12,2) not null check (quantity > 0),
  unit          text,
  unit_price    numeric(10,2) not null check (unit_price >= 0),
  line_total    numeric(14,2) generated always as (quantity * unit_price) stored
);

-- 4.9 Invoices and payments
create table public.invoices (
  id             uuid primary key default gen_random_uuid(),
  invoice_number text not null unique default ('INV-' || to_char(now(),'YYYY') || '-' || lpad(nextval('invoice_seq')::text, 4, '0')),
  quotation_id   uuid references public.quotations(id) on delete set null,
  customer_id    uuid references public.profiles(id) on delete set null,
  event_id       uuid references public.events(id) on delete set null,
  order_id       uuid references public.orders(id) on delete set null,
  total          numeric(12,2) not null check (total >= 0),
  paid           numeric(12,2) not null default 0,
  balance        numeric(12,2) generated always as (total - paid) stored,
  status         invoice_status not null default 'unpaid',
  due_date       date,
  pdf_url        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table public.payments (
  id           uuid primary key default gen_random_uuid(),
  invoice_id   uuid not null references public.invoices(id) on delete cascade,
  amount       numeric(12,2) not null check (amount > 0),
  method       payment_method not null default 'cash',
  paid_on      date not null default current_date,
  reference    text,
  notes        text,
  received_by  uuid references public.profiles(id) on delete set null,
  created_at   timestamptz not null default now()
);

-- 4.10 Staff, attendance, checklist
create table public.staff (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles(id) on delete set null,
  full_name   text not null,
  phone       text,
  role_title  text,                       -- cook, waiter, helper, driver, supervisor
  daily_rate  numeric(10,2) default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table public.event_staff (
  event_id    uuid references public.events(id) on delete cascade,
  staff_id    uuid references public.staff(id) on delete cascade,
  attendance  text not null default 'pending' check (attendance in ('pending','present','absent')),
  check_in    timestamptz,
  check_out   timestamptz,
  wage        numeric(10,2) default 0,
  primary key (event_id, staff_id)
);

create table public.event_checklist (
  id        uuid primary key default gen_random_uuid(),
  event_id  uuid not null references public.events(id) on delete cascade,
  item      text not null,
  is_done   boolean not null default false
);

-- 4.11 Expenses
create table public.expenses (
  id            uuid primary key default gen_random_uuid(),
  event_id      uuid references public.events(id) on delete set null,
  category      text not null,            -- raw material, transport, wages, rent, other
  amount        numeric(12,2) not null check (amount > 0),
  expense_date  date not null default current_date,
  description   text,
  bill_url      text,
  created_by    uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now()
);

-- 4.12 Website content
create table public.gallery_items (
  id          uuid primary key default gen_random_uuid(),
  title_en    text,
  title_hi    text,
  event_type  event_type,
  media_url   text not null,
  media_type  text not null default 'image' check (media_type in ('image','video')),
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  event_type  event_type,
  rating      int not null default 5 check (rating between 1 and 5),
  quote_en    text not null,
  quote_hi    text,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table public.faqs (
  id           uuid primary key default gen_random_uuid(),
  question_en  text not null,
  answer_en    text not null,
  question_hi  text,
  answer_hi    text,
  is_active    boolean not null default true,
  sort_order   int not null default 0
);

-- Helpful indexes
create index on public.enquiries (status, created_at desc);
create index on public.events (event_date, status);
create index on public.events (customer_id);
create index on public.orders (order_type, status);
create index on public.orders (customer_id);
create index on public.products (category_id) where is_active;
create index on public.payments (invoice_id);
create index on public.expenses (expense_date);
```

---

## 5. Helper Functions and Triggers

```sql
-- 5.1 Role helpers (SECURITY DEFINER avoids RLS recursion)
create or replace function public.get_user_role()
returns user_role language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.get_user_role() = 'admin', false)
$$;

create or replace function public.is_manager_or_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.get_user_role() in ('admin','manager'), false)
$$;

create or replace function public.is_staff_member()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.get_user_role() in ('admin','manager','staff'), false)
$$;

-- 5.2 Auto-create a profile when a user signs up (role is ALWAYS customer here)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5.3 updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'profiles','site_settings','enquiries','menu_items','packages','product_categories',
    'products','events','orders','quotations','invoices'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- 5.4 Keep quotation totals correct
create or replace function public.recalc_quotation_totals()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  q_id uuid := coalesce(new.quotation_id, old.quotation_id);
  sub numeric(12,2);
begin
  select coalesce(sum(line_total), 0) into sub from public.quotation_items where quotation_id = q_id;
  update public.quotations
     set subtotal = sub,
         total = round((sub - discount) * (1 + tax_percent / 100), 2)
   where id = q_id;
  return null;
end;
$$;

create trigger quotation_items_recalc
  after insert or update or delete on public.quotation_items
  for each row execute function public.recalc_quotation_totals();

-- 5.5 Keep invoice paid amount and status correct after payments change
create or replace function public.recalc_invoice_paid()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  inv_id uuid := coalesce(new.invoice_id, old.invoice_id);
  total_paid numeric(12,2);
  inv_total numeric(12,2);
begin
  select coalesce(sum(amount), 0) into total_paid from public.payments where invoice_id = inv_id;
  select total into inv_total from public.invoices where id = inv_id;

  update public.invoices
     set paid = total_paid,
         status = case
           when status = 'cancelled' then 'cancelled'::invoice_status
           when total_paid <= 0 then 'unpaid'::invoice_status
           when total_paid >= inv_total then 'paid'::invoice_status
           else 'partial'::invoice_status
         end
   where id = inv_id;
  return null;
end;
$$;

create trigger payments_recalc
  after insert or update or delete on public.payments
  for each row execute function public.recalc_invoice_paid();

-- 5.6 Public RPC: date availability (reveals NO customer details)
create or replace function public.get_date_availability(check_date date)
returns text language plpgsql stable security definer set search_path = public as $$
declare
  booked int;
  cap int := coalesce((select (value)::text::int from public.site_settings where key = 'max_events_per_day'), 3);
begin
  select count(*) into booked
    from public.events
   where event_date = check_date and status in ('tentative','confirmed');

  if booked = 0 then return 'available';
  elsif booked < cap then return 'limited';
  else return 'booked';
  end if;
end;
$$;

-- 5.7 Public RPC: submit a grocery order request from the website (no login needed)
create or replace function public.submit_grocery_request(
  p_name text,
  p_phone text,
  p_address text,
  p_required_date date,
  p_notes text,
  p_items jsonb          -- [{"product_id":"...","quantity":50}, ...]
)
returns text language plpgsql security definer set search_path = public as $$
declare
  new_order_id uuid;
  new_number text;
  item jsonb;
  prod record;
begin
  if coalesce(trim(p_name),'') = '' or coalesce(trim(p_phone),'') = '' then
    raise exception 'Name and phone are required';
  end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Order list is empty';
  end if;

  insert into public.orders (order_type, customer_id, guest_name, guest_phone, delivery_address, required_date, notes)
  values ('grocery', auth.uid(), p_name, p_phone, p_address, p_required_date, p_notes)
  returning id, order_number into new_order_id, new_number;

  for item in select * from jsonb_array_elements(p_items) loop
    select id, name_en, unit, price into prod
      from public.products
     where id = (item ->> 'product_id')::uuid and is_active;

    if found then
      insert into public.order_items (order_id, product_id, description, quantity, unit, unit_price)
      values (new_order_id, prod.id, prod.name_en, (item ->> 'quantity')::numeric, prod.unit, prod.price);
    end if;
  end loop;

  return new_number;
end;
$$;

grant execute on function public.get_date_availability(date) to anon, authenticated;
grant execute on function public.submit_grocery_request(text,text,text,date,text,jsonb) to anon, authenticated;
```

---

## 6. Row Level Security (RLS)

```sql
-- Enable RLS on every table
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','site_settings','enquiries','menu_items','packages','package_items',
    'product_categories','products','events','orders','order_items','quotations',
    'quotation_items','invoices','payments','staff','event_staff','event_checklist',
    'expenses','gallery_items','testimonials','faqs'
  ] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- 6.1 Profiles
create policy "profiles: read own or team" on public.profiles
  for select using (id = auth.uid() or public.is_manager_or_admin());

create policy "profiles: update own (role locked)" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and role = public.get_user_role());

create policy "profiles: admin manages all" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- 6.2 Public content (read active rows, managers write)
do $$
declare t text;
begin
  foreach t in array array[
    'menu_items','packages','product_categories','products',
    'gallery_items','testimonials','faqs'
  ] loop
    execute format('create policy "public read active" on public.%I for select using (is_active)', t);
    execute format('create policy "managers read all" on public.%I for select using (public.is_manager_or_admin())', t);
    execute format('create policy "managers write" on public.%I for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin())', t);
  end loop;
end $$;

create policy "public read package items" on public.package_items for select using (true);
create policy "managers write package items" on public.package_items
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy "public read settings" on public.site_settings for select using (true);
create policy "admin writes settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

-- 6.3 Enquiries: anyone can submit, only team can read/manage
create policy "anyone can submit enquiry" on public.enquiries
  for insert to anon, authenticated
  with check (status = 'new' and assigned_to is null and notes is null);

create policy "managers manage enquiries" on public.enquiries
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

-- 6.4 Events
create policy "customers read own events" on public.events
  for select using (customer_id = auth.uid());

create policy "staff read assigned events" on public.events
  for select using (
    exists (
      select 1 from public.event_staff es
      join public.staff s on s.id = es.staff_id
      where es.event_id = events.id and s.user_id = auth.uid()
    )
  );

create policy "managers manage events" on public.events
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

-- 6.5 Orders and items
create policy "customers read own orders" on public.orders
  for select using (customer_id = auth.uid());

create policy "managers manage orders" on public.orders
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy "customers read own order items" on public.order_items
  for select using (exists (select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid()));

create policy "managers manage order items" on public.order_items
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

-- 6.6 Quotations
create policy "customers read own quotations" on public.quotations
  for select using (customer_id = auth.uid() and status <> 'draft');

create policy "customers respond to own quotations" on public.quotations
  for update using (customer_id = auth.uid() and status = 'sent')
  with check (customer_id = auth.uid() and status in ('accepted','rejected'));

create policy "managers manage quotations" on public.quotations
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy "customers read own quotation items" on public.quotation_items
  for select using (exists (
    select 1 from public.quotations q
    where q.id = quotation_id and q.customer_id = auth.uid() and q.status <> 'draft'));

create policy "managers manage quotation items" on public.quotation_items
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

-- 6.7 Invoices and payments (money: admin only writes)
create policy "customers read own invoices" on public.invoices
  for select using (customer_id = auth.uid());

create policy "managers read invoices" on public.invoices
  for select using (public.is_manager_or_admin());

create policy "admin writes invoices" on public.invoices
  for all using (public.is_admin()) with check (public.is_admin());

create policy "customers read own payments" on public.payments
  for select using (exists (select 1 from public.invoices i where i.id = invoice_id and i.customer_id = auth.uid()));

create policy "managers read payments" on public.payments
  for select using (public.is_manager_or_admin());

create policy "admin writes payments" on public.payments
  for all using (public.is_admin()) with check (public.is_admin());

-- 6.8 Staff, attendance, checklist
create policy "team reads staff" on public.staff
  for select using (public.is_staff_member());

create policy "managers manage staff" on public.staff
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy "staff read own assignments" on public.event_staff
  for select using (
    public.is_manager_or_admin()
    or exists (select 1 from public.staff s where s.id = staff_id and s.user_id = auth.uid())
  );

create policy "staff update own attendance" on public.event_staff
  for update using (exists (select 1 from public.staff s where s.id = staff_id and s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.id = staff_id and s.user_id = auth.uid()));

create policy "managers manage assignments" on public.event_staff
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

create policy "team reads checklist" on public.event_checklist
  for select using (
    public.is_manager_or_admin()
    or exists (
      select 1 from public.event_staff es join public.staff s on s.id = es.staff_id
      where es.event_id = event_checklist.event_id and s.user_id = auth.uid())
  );

create policy "team ticks checklist" on public.event_checklist
  for update using (
    public.is_manager_or_admin()
    or exists (
      select 1 from public.event_staff es join public.staff s on s.id = es.staff_id
      where es.event_id = event_checklist.event_id and s.user_id = auth.uid())
  );

create policy "managers manage checklist" on public.event_checklist
  for all using (public.is_manager_or_admin()) with check (public.is_manager_or_admin());

-- 6.9 Expenses (admin only)
create policy "admin manages expenses" on public.expenses
  for all using (public.is_admin()) with check (public.is_admin());
```

---

## 7. Storage Buckets

```sql
insert into storage.buckets (id, name, public) values
  ('public-media', 'public-media', true),    -- logo, gallery, menu, product images
  ('documents',    'documents',    false),   -- quotation and invoice PDFs
  ('bills',        'bills',        false)    -- expense bill photos
on conflict (id) do nothing;

-- Public media: anyone reads, managers upload/change
create policy "public media read" on storage.objects
  for select using (bucket_id = 'public-media');

create policy "managers write public media" on storage.objects
  for all using (bucket_id = 'public-media' and public.is_manager_or_admin())
  with check (bucket_id = 'public-media' and public.is_manager_or_admin());

-- Documents: managers manage; customers read only files in their own folder (documents/<user_id>/file.pdf)
create policy "managers manage documents" on storage.objects
  for all using (bucket_id = 'documents' and public.is_manager_or_admin())
  with check (bucket_id = 'documents' and public.is_manager_or_admin());

create policy "customers read own documents" on storage.objects
  for select using (bucket_id = 'documents' and (storage.foldername(name))[1] = auth.uid()::text);

-- Bills: admin only
create policy "admin manages bills" on storage.objects
  for all using (bucket_id = 'bills' and public.is_admin())
  with check (bucket_id = 'bills' and public.is_admin());
```

**Folder convention**
- `public-media/logo/`, `public-media/gallery/`, `public-media/menu/`, `public-media/products/`
- `documents/<customer_user_id>/quotation-QT-2026-1001.pdf`
- `bills/<yyyy-mm>/<file>`

---

## 8. Realtime (Instant New Enquiry Alerts)

```sql
alter publication supabase_realtime add table public.enquiries;
alter publication supabase_realtime add table public.orders;
```

The admin dashboard subscribes to inserts on `enquiries` and `orders` and shows a toast and sound for new leads.

---

## 9. Seed Data (Sample)

```sql
insert into public.site_settings (key, value) values
  ('business',            '{"name":"Abu Maa''s Event Management Group","phone":"","whatsapp":"","email":"","address":"","gst_number":""}'),
  ('max_events_per_day',  '3'),
  ('advance_percent',     '30'),
  ('payment_details',     '{"upi_id":"","bank_name":"","account_no":"","ifsc":""}')
on conflict (key) do nothing;

insert into public.product_categories (name_en, name_hi, slug, sort_order) values
  ('Atta & Flour',      'आटा और मैदा',   'atta-flour', 1),
  ('Rice',              'चावल',          'rice', 2),
  ('Dal & Pulses',      'दाल',           'dal-pulses', 3),
  ('Oil & Ghee',        'तेल और घी',     'oil-ghee', 4),
  ('Spices',            'मसाले',         'spices', 5),
  ('Sugar & Salt',      'चीनी और नमक',   'sugar-salt', 6),
  ('Dry Fruits',        'मेवे',          'dry-fruits', 7),
  ('Beverages',         'पेय',           'beverages', 8),
  ('Packaging & Disposables', 'पैकेजिंग', 'packaging', 9)
on conflict (slug) do nothing;

insert into public.packages (name_en, name_hi, tier, food_type, price_per_plate, is_popular, sort_order) values
  ('Silver Package',  'सिल्वर पैकेज',  'silver',  'mixed', 250, false, 1),
  ('Gold Package',    'गोल्ड पैकेज',   'gold',    'mixed', 400, true,  2),
  ('Premium Package', 'प्रीमियम पैकेज','premium', 'mixed', 600, false, 3);

insert into public.faqs (question_en, answer_en, sort_order) values
  ('How much advance do I need to pay to book?', 'A 30% advance confirms your date. The balance is due before or on the event day.', 1),
  ('What is the minimum number of guests?', 'Please contact us with your guest count and we will suggest the best package.', 2),
  ('Do you supply only groceries without catering?', 'Yes. You can order groceries in bulk without booking catering.', 3),
  ('Can the menu be customized?', 'Yes. We create custom menus to suit your event and budget.', 4);
```

*(Prices above are placeholders; edit them from the admin dashboard.)*

---

## 10. Create the First Admin

1. Sign up on your website (or from **Authentication > Users > Add user** in the Supabase dashboard).
2. Run this in the SQL Editor with your own email:

```sql
update public.profiles
   set role = 'admin'
 where email = 'your-email@example.com';
```

To add a manager or staff member later, ask them to sign up, then update their `role` the same way (or build a "Users and Roles" page in the admin dashboard).

---

## 11. Next.js Integration

### 11.1 Install
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 11.2 Environment variables (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
# Server only. NEVER expose this to the browser and never prefix with NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```
Add `.env.local` to `.gitignore`.

### 11.3 Browser client (`lib/supabase/client.ts`)
```ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### 11.4 Server client (`lib/supabase/server.ts`)
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )
}
```

### 11.5 Route protection (middleware idea)
- Refresh the session in `middleware.ts` using `@supabase/ssr`.
- `/admin/*`: require role `admin` or `manager`.
- `/staff/*`: require role `staff` (or above).
- `/account/*`: require any logged-in user.
- Always rely on RLS for real security; middleware only improves user experience.

### 11.6 Example calls
```ts
// Submit a quote enquiry (anonymous visitor)
await supabase.from('enquiries').insert({
  name, phone, email, event_type, event_date, guests, city, message,
})

// Check date availability
const { data } = await supabase.rpc('get_date_availability', { check_date: '2026-12-05' })
// returns 'available' | 'limited' | 'booked'

// Submit grocery order list
const { data: orderNo } = await supabase.rpc('submit_grocery_request', {
  p_name: name, p_phone: phone, p_address: address,
  p_required_date: date, p_notes: notes,
  p_items: [{ product_id: '...', quantity: 50 }],
})

// Public menu packages with items
const { data: packages } = await supabase
  .from('packages')
  .select('*, package_items(menu_items(*))')
  .eq('is_active', true)
  .order('sort_order')
```

---

## 12. Table to Feature Map

| Feature (from PRD) | Tables / Functions |
|--------------------|--------------------|
| Quote request form | `enquiries` |
| Date availability | `get_date_availability()` |
| Menu and packages | `menu_items`, `packages`, `package_items` |
| Kirana catalog and order list | `product_categories`, `products`, `submit_grocery_request()`, `orders`, `order_items` |
| Booking calendar | `events` |
| Quotation PDF | `quotations`, `quotation_items`, storage `documents` |
| Invoices and payments | `invoices`, `payments` (auto balance and status) |
| Staff and attendance | `staff`, `event_staff`, `event_checklist` |
| Expenses and profit | `expenses`, `payments`, `events` |
| Gallery, reviews, FAQ | `gallery_items`, `testimonials`, `faqs` |
| Business settings | `site_settings` |
| Roles and access | `profiles`, RLS policies |

---

## 13. Security Checklist

- [ ] RLS enabled on all tables (Section 6 does this).
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is only used on the server and never committed to Git.
- [ ] Only the **anon** key is used in browser code.
- [ ] Admin account has a strong password; enable email confirmation.
- [ ] Add CAPTCHA (Cloudflare Turnstile or hCaptcha) to the public enquiry form, and enable it under Authentication settings if using sign-up.
- [ ] Turn on daily backups (Pro plan) or schedule manual exports of important tables.
- [ ] Test by logging in as a customer and confirming that other customers' data is not visible.

---

## 14. Reports (Optional SQL Views for Admin)

```sql
create or replace view public.v_monthly_summary
with (security_invoker = true) as
select
  date_trunc('month', p.paid_on)::date as month,
  sum(p.amount) as revenue,
  (select coalesce(sum(e.amount),0) from public.expenses e
    where date_trunc('month', e.expense_date) = date_trunc('month', p.paid_on)) as expenses
from public.payments p
group by 1
order by 1 desc;

create or replace view public.v_pending_payments
with (security_invoker = true) as
select i.invoice_number, coalesce(pr.full_name, 'Guest') as customer, i.total, i.paid, i.balance, i.due_date
from public.invoices i
left join public.profiles pr on pr.id = i.customer_id
where i.balance > 0 and i.status <> 'cancelled'
order by i.due_date nulls last;

create or replace view public.v_low_stock
with (security_invoker = true) as
select id, name_en, stock_qty, reorder_level, unit
from public.products
where stock_qty <= reorder_level and is_active;
```

Because these views use `security_invoker`, RLS on the base tables still applies, so only admins see money data.

---

## 15. Instructions for Antigravity

> Use Supabase as the backend for this project. Follow `SUPABASE.md` exactly: create the tables, functions, triggers, RLS policies, and storage buckets from the SQL sections, then wire up the Next.js app with `@supabase/ssr` (browser and server clients). Connect the public enquiry form, quote calculator, date availability check, and kirana order list to Supabase. Build the admin dashboard (enquiries, calendar, menu/packages, catalog/stock, orders, quotations, invoices, payments, staff, expenses, reports) with role-based route protection. Never expose the service role key to the browser. Ask before changing the database schema.
