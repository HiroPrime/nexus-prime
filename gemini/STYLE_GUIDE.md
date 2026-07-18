# Nexus Prime — Style Guide (CANON)

## Master visual style lock (paste into every image / UI prompt)

```
Retro RPG portfolio UI: deep void background (#030308), purple battle-menu panels
(rgba(139,48,211,0.82)), hard 2px black borders, neon green CTAs (#20FF00),
pink accent headlines (#FE9DFE), gold stat values (#FFD700), pixel-art icons with
crisp image-rendering, Barlow Condensed headings + VT323 body + Press Start 2P
micro-labels, full-viewport game shell (100dvh), NOT glass SaaS dashboard,
NOT purple gradient landing page, NOT Inter/Roboto corporate hero,
NOT photoreal headshot portfolio, NOT soft pastel kawaii RPG.
```

## Style pillars

| Pillar | Do | Don’t |
|--------|----|-------|
| Surface | Flat purple panels + black borders | Frosted glass / neumorphism |
| Accent | Green CTAs, pink subtitles, gold stats | Random cyan SaaS glow soup |
| Type | Barlow Condensed + VT323 + Press Start 2P | Inter-only startup landing |
| Imagery | Pixel icons + portrait crop | Stock photo hero |
| Layout | Desktop multi-column panels; mobile stacked | Break desktop at lg+ |
| Motion | Panel enter, blink boot text | Infinite particle spam |
| Background | bg-intro hero / bg-inner panels | Solid white or light mode |

## Palette tokens (from shipping `globals.css`)

| Token | Value | Role |
|-------|-------|------|
| `--green` | `#20FF00` | CTAs, LVL number, active quest status, boot text |
| `--gold` | `#FFD700` | Stat values, paused quest status |
| `--white` | `#FFFFFF` | Primary headings / body |
| `--panel-bg` | `rgba(139, 48, 211, 0.82)` | All RPG panels |
| `--panel-border` | `#000000` | Hard borders (2px) |
| `--purple-full` | `rgba(139, 48, 211, 1.0)` | Modals, solid fills |
| `--brand-red` | `rgba(237, 41, 41, 0.9)` | HATE MAIL button |
| `--brand-pink` | `rgba(254, 157, 254, 0.9)` | LOVE button, complete quest, tagline |
| `--neon-pink` | `#FF2D95` | Sparingly — neon accent |
| `--neon-cyan` | `#00E5FF` | Sparingly — cross-node Dex energy only |
| Canvas | `#030308` | Page background |

## Typography

| Class / use | Font | Role |
|-------------|------|------|
| `font-logo` / `.type-heading` | Barlow Condensed 700–900 | Panel titles, name, PlayfulText headings |
| `.type-body` / body | VT323 | Bio, descriptions, mobile tagline |
| `.type-subtitle` / labels | Barlow Condensed uppercase | Stat labels, ability types |
| `font-pixel` | Press Start 2P | Buttons, micro UI, desktop tagline |
| `.type-label` | Press Start 2P small | Item names, quest labels |

**Pattern:** Condensed headings shout RPG menu; VT323 reads like in-game dialogue; pixel font = affordances.

## Logo lock

```
{NEXUS | PRIME}
Development Portfolio
```

- Braces `{` `}` around wordmark  
- Pipe separator with muted opacity between NEXUS and PRIME  
- Tagline `#fe9dfe` — pixel font desktop, VT323 body size mobile  

## Panel chrome

- Background: `bg-[rgba(139,48,211,0.82)]`  
- Border: `border-2 border-black`  
- Dividers: `.col-divider` / `.row-divider` (black rules between columns/rows)  
- Titles: white + `PlayfulText` component energy  
- EXPLORE buttons: green fill, black border, pixel font  

## Background images

| Class | Asset | Desktop position | Mobile position |
|-------|-------|------------------|-----------------|
| `.bg-intro` | `/bg-intro.png` | `64% center` | `72% center` |
| `.bg-inner` | `/bg-inner.png` | center | center |

## Portrait crop

`.portrait-image` — object-fit crop for pixel avatar in bordered frame. Never stretch; keep `imageRendering: pixelated`.

## Mobile typography bumps

`globals.css` media queries raise minimum readable sizes on `max-lg`. New copy must survive mobile clamps — avoid paragraphs that require desktop-only tiny pixel text.

## Layout breakpoints (CANON)

| Viewport | Shell |
|----------|-------|
| `lg+` | Desktop header nav, multi-column panels, original clamps |
| `< lg` | App shell, bottom tab bar (icons only), stacked panels, accordion Quest Log |

**Rule:** scope mobile changes with `max-lg:` — never alter desktop shipped layout without explicit promotion.

## Consistency checklist (run before accepting art or UI mock)

- [ ] Purple panel + black border present  
- [ ] Green/pink/gold accent roles respected  
- [ ] Typography trio (Barlow / VT323 / Press Start) — no Inter drift  
- [ ] Pixel icons crisp, not blurry upscale  
- [ ] Desktop lg+ matches canon multi-column energy  
- [ ] Mobile shows tab bar, not desktop nav clone  
- [ ] No light mode / white hero  
- [ ] No generic SaaS dashboard cards  

## Negative prompt block (append often)

```
glassmorphism SaaS dashboard, Inter font landing page, white background,
soft gradient purple startup, photoreal corporate headshot, 3D blender mascot,
rounded-xl card grid, neumorphism, light mode, stock photo developer,
blurry pixel art, chibi mobile game UI, gacha shop, battle pass modal
```

## Reference components (code anchors)

| Surface | File |
|---------|------|
| Shell + slides | `components/HomeExperience.tsx` |
| Character | `components/CharacterPanel.tsx` |
| Equipment + inventory | `components/EquipmentInventoryPanel.tsx` |
| Abilities | `components/AbilitiesPanel.tsx` |
| Quest Log | `components/QuestLogPanel.tsx` |
| Nav / tab bar | `components/IntroMenu.tsx` |
| Logo | `components/Logo.tsx` |
| Tokens | `app/globals.css` |
