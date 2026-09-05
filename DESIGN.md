# Design System

Implemented from the approved design canvas (`Hapi Matcha Club.dc.html`). Tokens and components
live in `app/globals.css`; nothing should hard-code a color, font or radius the tokens already carry.

## Direction

Warm and rounded, not clinical. A cream ground with a terracotta accent and a sage second voice,
Caprasimo display headings over Figtree, and over-rounded containers that grow into pills.
Product photography carries the color and is lightly desaturated so it sits back into the page
rather than on top of it. Mobile at 390px is the source of truth; tablet and desktop scale up from it.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f5ead8` | Page ground |
| `--color-surface` | `#ebddc5` | Tinted panels, hours cards |
| `--color-card` | `#fffdf7` | Cards, header, tab bar |
| `--color-ink` | `#201e1d` | Body text, dark bands, primary-dark buttons |
| `--color-ink-soft` | `#4a3628` | Secondary copy, nav links |
| `--color-muted` | `#6b5a4a` | Descriptions and support copy |
| `--color-faint` | `#9a8873` | Monospace micro-labels |
| `--color-accent` | `#c67139` | Order actions, active tab, brand moments |
| `--color-accent-strong` | `#8f4b20` | Accent text at paragraph size, hover/pressed |
| `--color-sage` | `#7a8a5e` | Second voice — eyebrows, the matcha band |
| `--color-berry` | `#a85f68` | House specials and seasonal signals |

Each accent also carries a tint (`--color-accent-tint`, `--color-sage-tint`, `--color-berry-tint`)
used for tags on light surfaces. The accent-to-ground pair clears 3:1 — enough for chrome and large
text, not body copy — so accent-colored paragraph text uses `--color-accent-strong`.

## Typography

- Display: `Caprasimo`, the only display voice. Headings never exceed the 74px hero step.
- Body/UI: `Figtree`, readable at the 11–14px sizes the mobile menu depends on.
- Micro-labels (counts, disclaimers, size names) use `--font-mono` uppercase with wide tracking.

Both faces load through `next/font/google` in `app/layout.tsx`; the variables are set on `<html>`
so `:root` token definitions can reference them.

## Shape and spacing

- Radii: 14px media, 20px cards and panels, 24–28px hero and sheets, `999px` for buttons, chips and tags.
- Page gutter steps with the breakpoint: 18px mobile, 26px tablet, 44px desktop (`--page-x`).
- Content stops widening at 1440px — the width the canvas was drawn at — and centres past that, so a
  large monitor gets margin instead of stretched content on both edges. The header bar stays
  full-bleed while its contents align to the same edge. Everything on a page shares one left edge:
  header, hero, section headings, cards, colored bands and footer.
- Long-form pages (About, Order) cap their reading column but stay flush left, per the direction
  above — never centred, which would break that shared edge.
- Cards prefer a defined surface plus a hairline over a border-and-shadow combination.
- Interactive targets stay at least 40–44px tall.

## Components

| Class | What it is |
| --- | --- |
| `.btn` + `-primary`, `-ink`, `-outline`, `-on-dark`, `-quiet`, `-block` | Actions; primary is the terracotta fill |
| `.tag` + `-bestseller`, `-new`, `-seasonal`, `-special`, `-soldout`; `.tag-float` over photos | Product signals |
| `.card-row` / `.card-tall` | Menu row card and the media-led card used in rails and grids |
| `.chip` | Menu category filter, active state via `aria-current` |
| `.band` + `-sage`, `-ink` | Full-width colored story and ordering blocks |
| `.panel`, `.note-card`, `.hours-card`, `.channel-card`, `.contact-card` | Content surfaces |
| `.photo` / `.photo-needed` | Product photography, and the labelled slot for products without a shot yet |

## Photography

Served through `next/image` as AVIF (WebP fallback) at quality 90 — see `next.config.mjs`. Shots are
lightly desaturated by `.photo` so they sit back into the warm ground.

The current crops are roughly **350x400px**, taken from screenshots of the Instagram grid, and that
is their maximum: the optimizer will not upscale past a source, so anything displayed larger is
being stretched by the browser. Cards and menu rows (88-320px) are within the source resolution and
render sharp. The hero and the product detail image are not — they display at 700-950px, a 2-3x
stretch, doubling again on a high-DPI screen.

**Replacing these with originals of 1080px or wider on the short edge is the single biggest visual
upgrade available to the site.** Ideally 4:5 portrait, which is the crop every surface here uses.

Coverage is also thin: **15 of the 33 products have a photograph**; the other 18 render the
`PHOTO NEEDED` slot. The catalog is the full seeded menu, so several items the canvas never
illustrated (sodas, croffles, the milk drinks) have no shot at all.

## Motion

Two kinds only — entrances that play once as content arrives, and feedback on hover or press.
Nothing loops, and no product photograph is ever moved, scaled or parallaxed; the food holds still
while the interface responds around it.

| Token | Value | Use |
| --- | --- | --- |
| `--dur-press` | `120ms` | Press feedback |
| `--dur-state` | `220ms` | Hover and state changes |
| `--dur-enter` | `700ms` | Page entrances |
| `--dur-reveal` | `900ms` | Scroll reveals |
| `--ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Everything; soft landing, no overshoot |

- **Entrances** (hero, page intros, menu head, product sheet) transition out of `@starting-style`
  rather than a keyframe with `fill: both`. A keyframe entrance holds its hidden first frame until
  the animation is given a start time, so a page that hasn't painted can sit on an invisible hero.
  Here the visible state *is* the base rule — the hidden state only exists as a transition origin,
  and browsers without `@starting-style` simply render the page. No base rule sets `opacity: 0`.
  Because Next remounts on navigation, this doubles as the route-change transition.
- **Reveals**: every component — section headings, cards, tiles, bands, panels, the footer —
  fades up 18px over 900ms as it enters view, once. Children of a rail, tile grid or menu list
  arrive in a 90ms stagger, capped at six so a long list never crawls.

  This is observer-driven (`components/reveal.tsx`), not scroll-linked. Scroll-linked CSS ties the
  fade to the scroll wheel, so a fast scroll snaps it through; observing entry lets each fade play
  at its own pace however the page is scrolled. The hidden state applies only under
  `html.js-reveal`, set by an inline script before first paint so nothing flashes in then out, with
  two ways back out: the script drops the class if the component never mounts, and the component
  drops it if the observer never reports — which means the document isn't being rendered at all.
  The selector list is duplicated between the stylesheet and `TARGETS` in the component; keep them
  in step. The header's scroll shadow stays scroll-linked, since that one *should* track the scroll.
- **Feedback**: buttons lift 1px and settle with a shadow, then press to `0.985`; cards lift 2–3px
  onto `--shadow-md` and warm their price; chips and size options scale down on press; nav links
  wipe an accent rule in from the left; the header picks up a shadow as the page scrolls under it.
- **Reduced motion** switches motion off outright (`animation: none`, near-zero transitions) instead
  of merely shortening it, so every element falls back to its visible base style; the header keeps a
  static hairline in place of its scroll-driven shadow.

## Accessibility

Semantic landmarks, a skip link, logical heading order, descriptive alternatives (decorative images
carry `alt=""`), a 2px accent `:focus-visible` ring on every interactive element, and comfortable
touch targets. The bottom tab bar is a real `<nav>` of links with `aria-current` on the active tab.
