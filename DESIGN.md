# Design System

## Direction

Japanese café menu with a contemporary editorial rhythm: crisp white surfaces, mineral matcha green, dark brown-black ink, and small strawberry signals. Product imagery should provide the richest color. The design is restrained in structure but not generic in voice.

## Color

All color tokens use OKLCH.

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `oklch(1 0 0)` | Page background |
| `--color-surface` | `oklch(0.975 0.008 170)` | Soft sections and product media |
| `--color-ink` | `oklch(0.19 0.025 55)` | Body text and navigation |
| `--color-primary` | `oklch(0.42 0.105 170)` | Matcha actions and brand marks |
| `--color-primary-soft` | `oklch(0.92 0.035 170)` | Tinted surfaces |
| `--color-accent` | `oklch(0.66 0.18 25)` | Strawberry tags and small moments |
| `--color-muted` | `oklch(0.48 0.025 55)` | Secondary text |
| `--color-line` | `oklch(0.88 0.018 75)` | Dividers and quiet borders |

## Typography

- Display: `Fraunces`, with generous, editorial forms and a soft personality.
- Body/UI: `DM Sans`, readable at small mobile sizes.
- Headings use balanced wrapping and never exceed a six-rem display scale.

## Shape and spacing

- Page rhythm uses a 4px base unit with larger 24px, 40px, 64px, and 96px section steps.
- Product cards use a 14px radius; buttons and tags may use full-pill shapes.
- Borders are used sparingly. Cards prefer a defined surface and compact shadow over a border-plus-shadow combination.

## Motion

Use short ease-out entrances and press feedback for interactive elements. Do not animate product images. Every non-essential transition has a `prefers-reduced-motion` alternative.
