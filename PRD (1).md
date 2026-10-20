# PRD: Abu Maa's Event Management Group Website

**Version:** 1.0
**Date:** 17 October 2026
**Owner:** Abu Maa's Event Management Group
**Build tool:** Google Antigravity

---

## 1. Overview

### 1.1 Product Summary
A responsive, mobile-first website and management system for **Abu Maa's Event Management Group**, a catering and grocery supply business in India. The website has two purposes:

1. **Public website** to showcase services and capture enquiries/bookings.
2. **Internal dashboards** to run the business: leads, bookings, menu, grocery stock, quotations, invoices, payments, and staff.

### 1.2 Business Background
- **Catering:** Full-service bulk catering for weddings and other events (food preparation, service, staff).
- **Grocery (Kirana) Supply:** Bulk supply of groceries (atta, rice, dal, oil, spices, sugar, etc.). Customers who do not want full catering can order only groceries.

### 1.3 Problem Statement
The business currently works offline (phone, word of mouth). This causes:
- No online presence, so new customers cannot find or trust the business.
- Enquiries, dates, and payments tracked manually, leading to missed leads and double bookings.
- Quotations and invoices prepared by hand, which is slow.

### 1.4 Goals
| # | Goal | Success Metric |
|---|------|----------------|
| G1 | Establish a professional online presence | Site live, indexed on Google within 2 weeks of launch |
| G2 | Generate more enquiries | 30+ quote requests per month within 3 months |
| G3 | Reduce manual work | Quotation created in under 3 minutes |
| G4 | Avoid double bookings | Zero date conflicts via booking calendar |
| G5 | Track money clearly | Every booking shows advance, paid, and balance |

### 1.5 Non-Goals (Version 1)
- Native mobile app.
- Full e-commerce with cart checkout and delivery tracking for groceries (V1 uses an "order list / request quote" flow).
- Accounting/GST filing software integration.
- Multi-branch support.

---

## 2. Target Users

| Persona | Description | Main Need |
|---------|-------------|-----------|
| **Event Host (Customer)** | Family planning a wedding, engagement, walima, aqiqah, birthday | See menus and prices, get a quote fast, book a date |
| **Grocery Buyer** | Individual, hotel, mess, or another caterer needing bulk groceries | Browse catalog, send a bulk order request, get a price |
| **Corporate Client** | Company planning an office event | Packages, professional quotation, invoice |
| **Owner / Admin** | Abu Maa's (business owner) | Manage everything from one place |
| **Manager / Staff** | Event supervisors, cooks, waiters | See assigned events and checklists |

---

## 3. Scope and Phases

| Phase | Scope | Target |
|-------|-------|--------|
| **Phase 1** | Public website, enquiry form, WhatsApp integration | Week 1-2 |
| **Phase 2** | Admin dashboard: enquiries, booking calendar, menu, grocery catalog, orders | Week 3-5 |
| **Phase 3** | Customer login, quotations, invoices, payment tracking, online payments | Week 6-8 |
| **Phase 4** | Staff dashboard, reports, vendor module | Week 9-12 |

---

## 4. Public Website Requirements

### 4.1 Global Requirements
- Mobile-first, responsive (most visitors use phones).
- Languages: **English and Hindi** with a language toggle in the header.
- Floating **WhatsApp** button and **Call** button on every page.
- Sticky header with logo, navigation, and a "Get Free Quote" button.
- Footer with address, phone, WhatsApp, email, social links, quick links.
- Page load under 3 seconds on a 4G connection.
- SEO basics: meta tags, sitemap, schema markup (LocalBusiness), clean URLs.

### 4.2 Pages

| # | Page | Route | Key Content |
|---|------|-------|-------------|
| 1 | Home | `/` | Hero banner with CTA, services overview, popular packages, stats (events done, years, guests served), gallery preview, testimonials, quote form |
| 2 | About Us | `/about` | Business story, experience, team, values, hygiene and quality promise |
| 3 | Catering Services | `/catering` | Cards for Wedding, Engagement, Walima, Aqiqah, Birthday, Corporate, Other events |
| 4 | Event Detail (per type) | `/catering/[type]` | Description, suggested menu, packages, photos, enquiry button |
| 5 | Menu and Packages | `/menu` | Veg / Non-veg / Mixed packages (Silver, Gold, Premium), per-plate rate, item lists, custom menu option |
| 6 | Kirana Supply | `/kirana` | Category-wise catalog, search, filter, quantity input, "Add to Order List" |
| 7 | Order List | `/kirana/order-list` | Review items, enter contact details, submit as bulk order request |
| 8 | Quote Calculator | `/quote` | Inputs: event type, guest count, menu/package, date, city. Output: estimated cost range and "Send Request" |
| 9 | Gallery | `/gallery` | Photos and videos filtered by event type |
| 10 | Testimonials | `/testimonials` | Customer reviews with name and event type |
| 11 | FAQ | `/faq` | Advance amount, minimum guests, booking process, cancellation, areas served |
| 12 | Contact | `/contact` | Form, phone, WhatsApp, address, Google Map, working hours |
| 13 | Login / Register | `/login` | For customers, staff, admin |

### 4.3 Functional Requirements (Public)

**FR-P1: Enquiry / Quote Form**
- Fields: name, phone (required), email (optional), event type, event date, approximate guests, city/venue, message.
- On submit: save to database, show confirmation, notify admin by WhatsApp link/email.
- Basic spam protection (honeypot or captcha).

**FR-P2: Quote Calculator**
- Estimated total = guests x per-plate rate of the selected package + optional add-ons (decoration, extra staff, tent, etc.).
- Show as an approximate range with the note "Final quotation will be shared by our team."
- Admin can edit rates without code changes.

**FR-P3: Kirana Order List**
- Browse by category: Atta and Flour, Rice, Dal and Pulses, Oil and Ghee, Spices, Sugar and Salt, Dry Fruits, Beverages, Packaging, Others.
- Each product: name, image, unit (kg/litre/packet), indicative price (or "Price on request"), minimum quantity.
- Visitor adds items to an order list, then submits with name, phone, delivery address, required date.
- No payment at this stage; the admin replies with a quotation.

**FR-P4: Date Availability**
- Visitor can check if a date is available (shows "Available" or "Limited / Booked" without revealing customer details).

**FR-P5: Language Toggle**
- All public pages and forms available in English and Hindi.

---

## 5. Dashboard Requirements

### 5.1 Roles and Permissions

| Role | Access |
|------|--------|
| **Admin (Owner)** | Everything |
| **Manager** | Enquiries, bookings, orders, staff assignment; no financial reports or settings |
| **Staff** | Own assigned events, attendance, checklists |
| **Customer** | Own bookings, quotations, invoices, payments |
| **Vendor** (Phase 4) | Own purchase orders and payments |

### 5.2 Admin Dashboard

**A1. Home / Overview**
- Today's events, upcoming events (next 7 days), new enquiries, pending payments, low-stock alerts.
- Monthly revenue and expense summary cards.

**A2. Enquiries and Leads**
- List with filters (status, event type, date, source).
- Status pipeline: New, Contacted, Quotation Sent, Negotiation, Confirmed, Lost.
- Notes, follow-up date and reminders, one-click WhatsApp/call.
- Convert lead to booking.

**A3. Booking Calendar**
- Month/week/day view with color-coded events (tentative, confirmed, completed, cancelled).
- Prevent or warn on double booking beyond set capacity.
- Event detail: customer, venue, guests, menu, staff, payments, notes.

**A4. Menu and Package Management**
- CRUD for menu items (name, category, veg/non-veg, image, cost per plate).
- Create packages (Silver/Gold/Premium) from items with per-plate price.
- Activate/deactivate items and packages; edit in Hindi and English.

**A5. Kirana Catalog and Stock**
- CRUD for products, categories, units, price, minimum order quantity.
- Stock quantity, reorder level, low-stock alerts.
- Bulk import via Excel/CSV.

**A6. Orders**
- Catering orders and grocery orders in separate tabs.
- Order status: Requested, Quoted, Confirmed, In Progress, Delivered/Completed, Cancelled.
- Convert request to quotation in one click.

**A7. Quotation and Invoice**
- Create quotation: customer, line items (plates, packages, add-ons, groceries), discount, tax (optional GST), terms.
- Generate branded **PDF**; share via WhatsApp or email.
- Convert accepted quotation into invoice; sequential invoice numbers.

**A8. Payments**
- Record advance, partial, and final payments (cash, UPI, bank transfer, cheque, online).
- Auto-calculate balance due; due-date reminders.
- Payment receipt PDF.

**A9. Staff Management**
- Staff list (cooks, waiters, helpers, drivers) with phone, role, daily rate.
- Assign staff to events; track attendance and wages payable.

**A10. Expenses**
- Log expenses per event or general (raw material, transport, wages, rent, other).
- Attach bill photos.

**A11. Reports**
- Monthly revenue, expense, and profit.
- Revenue by event type; top customers; most-ordered items.
- Pending payments report.
- Export to Excel/PDF.

**A12. Content and Settings**
- Edit gallery, testimonials, FAQs, banners, contact details.
- Business profile: logo, address, GST number, bank/UPI details, invoice terms.
- User and role management.

### 5.3 Customer Dashboard
- My bookings and their status.
- View and approve/reject quotations.
- View invoices, payment history, and download PDFs.
- Reorder a previous grocery or catering order.
- Update profile; contact support via WhatsApp.

### 5.4 Staff / Manager Dashboard
- Today's and upcoming assigned events with venue, time, and contact person.
- Event checklist (utensils, raw material, vehicles, staff count) with tick-off.
- Attendance check-in/out.
- Manager: assign staff, update event status.

### 5.5 Vendor Dashboard (Phase 4)
- Purchase orders placed by Abu Maa's.
- Delivery status and payment status.

---

## 6. Data Model (High Level)

| Entity | Key Fields |
|--------|-----------|
| **User** | id, name, phone, email, role, language, created_at |
| **Enquiry** | id, name, phone, email, event_type, event_date, guests, message, source, status, notes, follow_up_date |
| **Booking / Event** | id, customer_id, event_type, date, time, venue, guests, package_id, status, total_amount |
| **MenuItem** | id, name_en, name_hi, category, is_veg, image, cost |
| **Package** | id, name, type (veg/non-veg/mixed), price_per_plate, items[] |
| **Product** | id, name_en, name_hi, category_id, unit, price, min_qty, stock_qty, reorder_level, image |
| **Order** | id, customer_id, type (catering/grocery), status, items[], delivery_address, required_date |
| **Quotation** | id, number, customer_id, items[], discount, tax, total, status, pdf_url |
| **Invoice** | id, number, quotation_id, total, paid, balance, status |
| **Payment** | id, invoice_id, amount, method, date, reference |
| **Staff** | id, name, phone, role, daily_rate |
| **EventStaff** | event_id, staff_id, attendance, wage |
| **Expense** | id, event_id (optional), category, amount, date, bill_image |
| **GalleryItem / Testimonial / FAQ** | content fields in English and Hindi |

---

## 7. Technical Requirements

### 7.1 Recommended Stack
| Layer | Choice |
|-------|--------|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend / DB / Auth | Supabase (PostgreSQL, Auth, Storage) |
| PDF generation | react-pdf or server-side PDF library |
| i18n | next-intl (English, Hindi) |
| Payments (Phase 3) | Razorpay (UPI, cards, netbanking) |
| Hosting | Vercel |
| Notifications | WhatsApp click-to-chat links (V1); WhatsApp Business API (later) |

### 7.2 Non-Functional Requirements
- **Performance:** Lighthouse score 85+ on mobile.
- **Security:** Role-based access control, row-level security in the database, HTTPS, input validation, hashed credentials via the auth provider.
- **Privacy:** Customer data visible only to authorized roles.
- **Accessibility:** Readable font sizes, sufficient contrast, keyboard-friendly forms.
- **Reliability:** Daily database backups.
- **Browser support:** Latest Chrome, Safari, Edge, Firefox; Android and iOS browsers.
- **Scalability:** Handle 500+ concurrent visitors without issues.

---

## 8. Design Guidelines

- **Look and feel:** Warm, premium, trustworthy.
- **Colors:** Deep green (primary), gold (accent), off-white background, dark charcoal text.
- **Typography:** Clean sans-serif for body; elegant serif for headings. Support for Devanagari (Hindi) fonts such as Noto Sans Devanagari.
- **Imagery:** Large, high-quality food and event photography; consistent aspect ratios.
- **Layout:** Card-based, generous spacing, large tap targets (min 44px) for mobile.
- **Tone of content:** Warm, respectful, simple language.
- **Dashboards:** Clean, data-focused, sidebar navigation, tables with search/filter, mobile-friendly.

---

## 9. User Flows

**Flow 1: Customer requests a quote**
Home, then Quote Calculator or Contact form, then submit, then confirmation, then admin notified, then admin calls/WhatsApps, then quotation shared.

**Flow 2: Grocery bulk order**
Kirana page, then add items to order list, then submit with contact details, then admin receives order request, then admin sends quotation, then customer confirms, then delivery, then invoice and payment.

**Flow 3: Booking confirmation**
Lead status becomes Confirmed, then booking created on calendar, then advance recorded, then staff assigned, then event completed, then final payment, then invoice closed.

---

## 10. Acceptance Criteria (Phase 1 and 2)

- [ ] All 13 public pages are live, responsive, and available in English and Hindi.
- [ ] Enquiry form saves to the database and notifies the admin.
- [ ] WhatsApp and Call buttons work on every page.
- [ ] Kirana order list can be built and submitted as a request.
- [ ] Admin can log in securely and sees only admin features.
- [ ] Admin can manage enquiries, bookings (calendar), menu, packages, and grocery catalog without code changes.
- [ ] Admin can generate a quotation PDF.
- [ ] Double-booking warning works on the calendar.
- [ ] Lighthouse mobile performance score is 85 or higher.

---

## 11. Risks and Assumptions

| Risk / Assumption | Mitigation |
|-------------------|-----------|
| Business photos and logo may not be ready | Use placeholders; replace later through admin panel |
| Menu rates change often | All prices editable in admin |
| Owner is not technical | Simple admin UI; Hindi labels in dashboard |
| Spam enquiries | Captcha / honeypot |
| Scope creep | Strict phase-wise delivery |
| Assumption: payments are collected offline at first | Online payments added in Phase 3 |

---

## 12. Open Questions

1. Business logo, brand colors, and photos available?
2. Service area (cities/districts)?
3. Minimum guest count and standard advance percentage?
4. Is GST applicable on invoices?
5. Preferred domain name (e.g., abumaazevents.com)?
6. Who will manage content (owner or a separate staff member)?
7. Should the grocery catalog show prices publicly or "on request"?

---

## 13. Instructions for Antigravity (Build Prompt)

> Build the project described in this PRD using Next.js (App Router), Tailwind CSS, and Supabase. Start with **Phase 1** (public website with enquiry form and WhatsApp integration), then **Phase 2** (admin dashboard). Use English and Hindi i18n from the start. Use the deep green and gold theme. Create reusable components, seed the database with sample menu items, packages, and grocery products, and keep all business content editable from the admin panel. Ask before starting each new phase.
