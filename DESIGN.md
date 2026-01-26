# Design Profile — <APP_NAME>

This file defines the **unique visual identity** of this application.

It extends the global UI rules defined in:

- `agents/tailwind.md`
- `agents/frontend.md`

All UI built for this application **must follow this design profile**.

## Quick Fill — Design Tokens (REQUIRED)

Fill these values when creating a new app from this template.
These tokens define the app identity and must be reflected in Tailwind config/theme.

### Identity

- App name: `Anime Portal`
- Tone: `Playful + warm optimism`
- Density: `Standard`

### Typography (Font Names)

- Primary font (UI): `Rubik`
- Secondary font (Headings): `Rubik Medium`
- Monospace font (Code): `JetBrains Mono`

### Radius / Shadows / Motion

- Radius: `rounded-xl`
- Shadow level: `subtle`
- Motion: `minimal` (micro-interactions only)

### Semantic Color Tokens (Tailwind Classes)

Neutrals:

- Page: `bg-background text-foreground`
- Card: `bg-card text-card-foreground border-border`
- Muted text: `text-muted-foreground`

Brand:

- Primary button: `bg-primary text-primary-foreground hover:bg-primary/90`
- Secondary button: `bg-secondary text-secondary-foreground hover:bg-secondary/85`
- Accent: `bg-accent text-accent-foreground`
- Destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`

Focus:

- Focus ring: `focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background`

Layout:

- Container: `max-w-6xl mx-auto px-gutter`
- Section spacing: `py-section sm:py-section`
- Default gap: `gap-layout`
- Card padding: `p-card`

---

## 1. Brand Intent

Anime Portal embraces cozy accessibility with warm metallic accents. The UI should feel like browsing an elegantly curated library: soft off-white backgrounds, charcoal typography, brushed-metal buttons, and golden focus cues inspired by studio spotlights.

- Tone: Playful optimism anchored by mature typography
- Visual density: Standard (room for artwork and metadata)
- Corners: Rounded-xl across surfaces
- Shadows: Subtle and feathered (no harsh drop shadows)
- Motion: Minimal — fade/slide micro-interactions only

> Future refinement: Once final hero illustrations arrive, reevaluate the accent ramp to balance against promo artwork saturation.

## 2. Color System (Semantic Tokens)

Only **semantic Tailwind tokens** are allowed.  
No hex colors. No inline CSS colors. No `var()` in `className`.

### Neutrals

- Page background: `bg-background` (White Smoke)
- Card background: `bg-card` (bright paper white)
- Foreground text: `text-foreground` (Dim Grey)
- Muted text: `text-muted-foreground` (Shadow Grey @ 70%)
- Borders: `border-border` (Shadow Grey wash)

### Brand Colors

- Primary:
  - Background: `bg-primary` (Metallic Gold)
  - Text: `text-primary-foreground` (Shadow Grey)
- Secondary:
  - Background: `bg-secondary` (Honey Bronze)
  - Text: `text-secondary-foreground` (White Smoke)
- Accent:
  - Background: `bg-accent` (Shadow Grey)
  - Text: `text-accent-foreground` (White Smoke)
- Destructive:
  - Background: `bg-destructive` (vivid safety red placeholder)
  - Text: `text-destructive-foreground`

### Examples

- Page: `bg-background text-foreground`
- Card: `bg-card border border-border`
- Muted text: `text-muted-foreground`

## 3. Typography

Define the typography scale used across the app.

### Headings

- H1: `text-4xl font-heading tracking-tight text-foreground`
- H2: `text-3xl font-heading text-foreground`
- H3: `text-2xl font-heading text-foreground`

### Body Text

- Default body: `text-base leading-relaxed text-foreground font-sans`
- Muted text: `text-sm text-muted-foreground`
- Small text / captions: `text-xs text-muted-foreground`

### Rules

- Headings are used for structure, not styling.
- Body text must remain readable at all breakpoints.
- Avoid custom font sizes outside this scale.

## 4. Spacing & Layout Defaults

- Page container width: `max-w-6xl mx-auto px-gutter`
- Section vertical spacing: `py-section sm:py-section`
- Default gap between elements: `gap-layout`
- Card padding: `p-card`

Spacing tokens are powered by CSS variables, so adjusting `--space-gutter`, `--space-section-y`, `--space-gap`, or `--space-card-padding` in `src/styles.css` updates the whole app.

> Spacing must follow the global spacing scale from `tailwind.md`.

## 5. Component Recipes (REQUIRED)

- These are the **approved base styles** for this app.
- All UI components must be based on these recipes.

### Button

Use these as the only approved button styles for this app.

- Primary:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-subtle disabled:opacity-50 disabled:pointer-events-none">
  Primary
</button>
```

- Secondary:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none">
  Secondary
</button>
```

- Outline:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-border bg-transparent text-foreground hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none">
  Outline
</button>
```

- Destructive:

```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none">
  Delete
</button>
```

### Input / Form Field (REQUIRED)

```tsx
<div className="space-y-2 text-foreground">
  <label className="text-sm font-medium">Label</label>
  <input className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50" />
  <p className="text-xs text-muted-foreground">Helper text</p>
</div>
```

### Card (REQUIRED)

```tsx
<div className="rounded-xl border border-border bg-card p-card text-foreground shadow-subtle">
  {/* content */}
</div>
```

## 6. Interaction States (REQUIRED)

- All interactive elements must define:
  - Hover state: ...
  - Focus state (visible): ...
  - Disabled state: ...
  - Loading state (if applicable): ...
- Focus styles are mandatory and must be clearly visible.

## 7. Do / Don’t

- Do:
  - Follow this file for all UI decisions.
  - Use component recipes as the base.
  - Keep UI consistent across the app.

- Don’t:
  - Introduce new visual styles without updating this file.
  - Use hex colors or inline styles for design.
  - Create one-off button or input styles.

## 8. When to Update This File

- Update this file when:
  - A new UI pattern is introduced.
  - A component recipe changes.
  - The visual identity of the app evolves.
- This file is the source of truth for the app’s design.
