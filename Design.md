# Make My Marriage — UI Design System

**Version:** 1.0  
**Purpose:** Visual and interaction guidelines for the Make My Marriage MVP  
**Product feel:** Elegant, calm, warm, modern, trustworthy, easy for families to use

---

## 1. Design Vision

Make My Marriage should feel like a premium wedding-planning companion, not a corporate finance dashboard and not a heavily decorated wedding invitation website.

The interface should combine:
- The warmth of a wedding editorial
- The clarity of a modern SaaS dashboard
- The simplicity of a family-friendly planner

Keep the experience clean and spacious. Use wedding-inspired details sparingly. Prioritize readability, useful information, and clear actions over decoration.

## 2. Visual Direction

### Overall style
- Modern, minimal, elegant, warm
- Soft ivory backgrounds with white content surfaces
- Deep forest/sage green for primary actions
- Muted gold used only as a small accent
- Dark charcoal text
- Thin borders and very subtle shadows
- Medium rounded corners, not pill-shaped everything
- Light, purposeful motion only

### Avoid
- Too many gradients
- Strong neon colors
- Heavy drop shadows
- Large decorative floral patterns behind content
- Overly ornate typography for body text
- Dense tables and tiny labels
- Excessive cards inside cards
- Too many charts
- Huge empty hero sections that push useful information below the fold

## 3. Color Tokens

Use these as the initial design tokens. Keep colors consistent across all pages.

| Token | Hex | Usage |
|---|---|---|
| Background | `#F7F6F1` | Main app background |
| Surface | `#FFFFFF` | Cards, menus, forms |
| Surface Soft | `#F0F2EB` | Subtle highlighted panels |
| Primary | `#315C4C` | Primary buttons, active navigation, key icons |
| Primary Hover | `#264A3D` | Hover state for primary actions |
| Primary Soft | `#E6EEE8` | Soft green background |
| Gold Accent | `#B99A5B` | Small decorative details and highlights only |
| Text Primary | `#202720` | Main headings and important text |
| Text Secondary | `#6F776F` | Descriptions and supporting labels |
| Border | `#E5E7DF` | Card borders, separators, form outlines |
| Success | `#32765B` | Completed/paid status |
| Warning | `#A66B22` | Due soon/attention |
| Danger | `#B54747` | Destructive actions and errors |
| Neutral Soft | `#F1F2EE` | Neutral badges and secondary surfaces |

Do not use gold for long text or small text on a white background. Keep text contrast accessible.

## 4. Typography

Use a clean sans-serif for most of the interface and an optional elegant serif only for wedding-specific display moments.

- **UI font:** Inter, Geist, or a similar readable sans-serif
- **Display accent:** Playfair Display or DM Serif Display, used sparingly for the wedding title or a small welcome heading
- **Page title:** 28–32 px desktop, 24–28 px mobile, semibold
- **Section title:** 16–20 px, semibold
- **Body:** 14–16 px
- **Supporting text:** 12–14 px
- **Button text:** 14 px, medium/semibold
- Keep line-height comfortable and avoid all-caps for normal labels.

## 5. Layout and Spacing

### Desktop
- App shell with fixed-width left sidebar: approximately 240–256 px
- Main content max width: approximately 1440 px
- Main content padding: 32 px on wide screens, 24 px on medium screens
- Use a consistent 8 px spacing rhythm
- Dashboard grid: 4 summary cards in one row on wide screens; 2 × 2 on medium screens
- Use a 12-column grid or simple responsive CSS grid for content sections

### Mobile
- Sidebar becomes a drawer or compact mobile navigation
- Content padding: 16 px
- Summary cards: 2 columns where space permits, otherwise 1 column
- Tables become responsive rows/cards or horizontally scrollable with clear affordance
- Primary actions remain easy to tap
- No horizontal page overflow

### Shape and elevation
- Main cards: 16 px radius
- Inputs and buttons: 10–12 px radius
- Small badges: 999 px radius
- Border: 1 px solid Border token
- Shadows should be subtle, for example a soft shadow with low opacity; prefer borders over strong shadows.

## 6. App Shell and Navigation

### Sidebar
- Product mark: simple line-art ring/flower or monogram-style symbol; avoid a detailed illustration
- Wordmark: **Make My Marriage**
- Small subtitle: **Wedding planner**
- Main navigation:
  1. Dashboard
  2. Expenses
  3. Invitations
  4. Family Coordination
  5. Settings & Admin
- Use Lucide-style line icons with consistent 18–20 px size.
- Active item: pale green background, primary-green icon and text, a small active indicator if needed.
- Inactive items: neutral text and icon.
- Bottom of sidebar: small profile area with initials/avatar, user name, and role.

### Top bar
- Breadcrumb or page context on the left when useful
- Search is optional; do not add it if it makes the header crowded
- Notifications are optional and should not be a major focus in the MVP
- Profile/avatar menu on the right
- Use consistent height and alignment across pages.

## 7. Dashboard Homepage

The first page should be a useful dashboard, not a marketing landing page. It should answer at a glance: “How is our wedding planning going?”

### Header
- Small eyebrow: `YOUR WEDDING OVERVIEW`
- Warm welcome heading such as `Let’s make this celebration unforgettable`
- One-line supporting text: `Your plans, budget, and family tasks — all in one place.`
- Show the wedding name or couple names in a small elegant context line.
- Primary action: `+ Add Expense`
- Secondary action: `Add Function` or `View Invitation`

### Budget summary
Use four clear summary cards:
1. **Total Budget** — e.g. `₹5,00,000`
2. **Total Spent** — e.g. `₹1,42,500`
3. **Remaining Budget** — e.g. `₹3,57,500`
4. **Pending Tasks** — e.g. `8 tasks`

Rules:
- Use realistic sample data only for the design prototype.
- Add a subtle progress indicator for budget spent, if it helps.
- Keep values large and labels clear.
- Do not use a different bright color for every card.
- Remaining budget should be visually easy to find.
- Avoid implying that the figures are real user data when using demo content.

### Main content row
Left area (wider):
- **Upcoming Functions** card
- Show 2–3 upcoming events with a date badge, function name, time, venue, and subtle status or edit affordance.
- Example events: Mehndi, Nikah, Reception.
- Include a small `View all functions` link.

Right area:
- **Budget Overview** card
- Show spent vs remaining as a restrained progress bar or donut chart.
- Include `X% of your budget used`.
- Keep the chart simple and accessible.

### Lower content row
Left:
- **Recent Expenses** list/table with expense name, category or function, date, amount, and payment status.
- Include `View all expenses`.

Right:
- **Family Tasks** card with task title, assigned person, due date, and status.
- Include `View all tasks`.
- Use 3–4 sample tasks maximum.

### Empty state
When no wedding data exists, show a friendly setup state:
- Heading: `Let’s plan your wedding`
- Supporting copy: `Add your wedding details to get your budget, functions, and family tasks organized.`
- Primary action: `Set up your wedding`
- Do not show misleading zero-heavy charts.

## 8. Component Guidelines

### Buttons
- Primary: Primary green background, white text
- Secondary: white/surface background, neutral border, dark text
- Tertiary: text button, no heavy container
- Destructive: danger color, only for delete actions
- Button heights: around 40–44 px
- Include clear hover, focus, disabled, and loading states.

### Cards
- White surface
- Thin border
- 16 px radius
- 20–24 px padding desktop, 16 px mobile
- Clear title and optional helper text
- Avoid putting every small item in a separate card.

### Forms
- Always show visible labels
- Placeholder text should be an example, not the only label
- Use helpful inline validation
- Group related fields
- Keep forms short and split into sections only when needed
- Use ₹ for Indian currency by default.

### Status badges
- Paid / Completed: soft green background
- Partially Paid / In Progress: soft amber background
- Unpaid / Pending: neutral or pale amber background
- Overdue / Error: soft red background
- Pair color with text; never rely on color alone.

### Tables and lists
- Clear column labels
- Comfortable row height
- Light separators
- Amounts right-aligned
- Status visible without dominating the row
- Provide helpful empty states and filters where relevant.

### Modals and drawers
- Use for short add/edit forms
- Do not open a modal for every simple action if an inline form is clearer
- Keep confirmation dialogs for destructive actions.

## 9. Motion and Micro-interactions

Use restrained, purposeful motion:
- Sidebar active state transitions: 150–200 ms
- Button hover/focus transitions: 150 ms
- Cards may subtly lift on hover only if clickable
- Page content can fade in lightly
- Respect reduced-motion preferences
- No parallax, floating decorations, or constant animated backgrounds.

## 10. Responsive Behavior

### Desktop: 1280 px and above
- Full sidebar
- Four summary cards in a row
- Two-column content grid
- Generous spacing

### Tablet: 768–1279 px
- Narrower sidebar or collapsible sidebar
- Two summary cards per row
- Stack content cards if necessary

### Mobile: below 768 px
- Mobile navigation drawer
- One or two summary cards per row depending on width
- Stack main content sections
- Full-width primary actions when appropriate
- Inputs and tap targets should be comfortable
- Keep page headings and action buttons from overlapping

## 11. Accessibility

- Meet WCAG AA contrast as closely as practical
- Use semantic headings and buttons
- All inputs need labels
- Support keyboard navigation and visible focus states
- Do not communicate status by color alone
- Use descriptive icon labels for icon-only buttons
- Provide accessible names for charts and progress indicators.

## 12. Sample Dashboard Data for UI Mockups

Use this sample data only for the prototype:

- Wedding: Ayesha & Zayan
- Budget: ₹5,00,000
- Total spent: ₹1,42,500
- Remaining: ₹3,57,500
- Pending tasks: 8
- Upcoming functions:
  - Mehndi — 18 November, 6:00 PM — Garden Lawn
  - Nikah — 20 November, 11:00 AM — Grand Hall
  - Reception — 21 November, 7:00 PM — The Courtyard
- Recent expenses:
  - Catering advance — ₹45,000 — Partially Paid
  - Wedding outfits — ₹28,500 — Paid
  - Venue booking — ₹35,000 — Partially Paid
- Family tasks:
  - Confirm guest count — Due in 2 days
  - Finalize invitation wording — Due tomorrow
  - Confirm transport — Due in 4 days

Clearly treat all names, dates, and amounts as illustrative demo data. Avoid hardcoding these as permanent production values.

## 13. Design Acceptance Checklist

The design is ready when:
- The dashboard looks polished, calm, and easy to scan.
- The visual hierarchy is clear without excessive decoration.
- Only the five agreed main navigation items are shown.
- Primary actions are easy to find.
- The budget and task summaries are understandable at a glance.
- All cards, buttons, tables, forms, and badges use consistent tokens.
- The interface works at desktop, tablet, and mobile sizes.
- Empty, hover, focus, and disabled states are designed.
- The interface does not rely on color alone to communicate meaning.
- The design can be implemented in React and Tailwind without complex custom effects.
