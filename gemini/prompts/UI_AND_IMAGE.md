# UI & Image Prompt Pack

Copy these when generating with Gemini image tools. Attach `/public/pixel-icons/avatar-portrait-2.png` when BasicHiro appears.

---

## Universal wrapper

```
PRODUCT: Nexus Prime — Retro RPG portfolio by BasicHiro / Core Node (nexusprime.nexus).
STYLE LOCK: Deep void #030308, purple battle-menu panels rgba(139,48,211,0.82),
hard 2px black borders, neon green CTAs #20FF00, pink accents #FE9DFE, gold stats
#FFD700, Barlow Condensed + VT323 + Press Start 2P, pixel-art icons crisp,
full-viewport game shell, NOT SaaS dashboard, NOT glassmorphism, NOT light mode,
NOT photoreal headshot portfolio.

[PASTE BASICHIRO LOCKED VISUAL BLOCK IF CHARACTER PRESENT]

SCENE: [describe]
CAMERA / FRAME: [desktop wide panel / mobile stacked / social 1:1]
CONSISTENCY: keep identity anchors; forbid drift list from STYLE_GUIDE.
```

---

## Character panel (desktop)

```
[UNIVERSAL WRAPPER]
[PASTE BASICHIRO LOCKED VISUAL BLOCK]
SCENE: Three-column RPG character sheet — LVL 1337 badge, pixel portrait in black
frame, stats list (Bandwidth 999, Bug Resistance 404), resistances, centered bio
paragraph, pink LOVE and red HATE MAIL pixel buttons at bottom.
```

---

## Character panel (mobile)

```
[UNIVERSAL WRAPPER]
SCENE: Stacked mobile character sheet — top row LVL badge + portrait side by side,
stats and bio below, full-width LOVE/HATE buttons. Tab bar implied at bottom (icons
only). Readable VT323 body sizes — no microscopic pixel text for bio.
```

---

## Equipment + inventory

```
[UNIVERSAL WRAPPER]
SCENE: Split purple panel — left: four equipment rows with pixel icons (headphones,
keyboard, monitor, drink) and RPG stat lines; right: inventory grid of pixel items
on purple cells with black borders. Desktop 4×4 grid energy.
```

---

## Inventory modal

```
[UNIVERSAL WRAPPER]
SCENE: Centered modal on dimmed overlay — solid purple panel, large pixel item icon,
green Press Start item name, VT323 description, green CLOSE button. Black 2px borders throughout.
```

---

## Abilities panel

```
[UNIVERSAL WRAPPER]
SCENE: Two-column abilities menu — "Domain Expansion: .nexus" and "Cursor Overdrive"
with green titles, pink [AoE]/[Active] tags, white body descriptions. Title "Abilities"
in white PlayfulText heading energy.
```

---

## Quest Log (desktop split)

```
[UNIVERSAL WRAPPER]
SCENE: Quest log split pane — left category list (Main Quests, Side Quests, Completed),
right detail with objective, companion Dex icon for Prime Portal quest, green EXPLORE
button. Status colors: green active, gold paused, pink complete.
```

---

## Quest Log (mobile accordion)

```
[UNIVERSAL WRAPPER]
SCENE: Single-column accordion quest list — one expanded quest showing objective +
EXPLORE button; collapsed rows show quest name + status. No desktop split pane.
```

---

## Intro hero

```
[UNIVERSAL WRAPPER]
SCENE: Full-viewport pixel-art landscape hero (bg-intro.png energy) — retro game
start screen mood, {NEXUS | PRIME} wordmark area, enter/play affordance, dark sky
and landscape — not photoreal, not Unreal engine cinematic.
Attach reference: /public/bg-intro.png if available.
```

---

## Logo / wordmark

```
[UNIVERSAL WRAPPER]
SCENE: {NEXUS | PRIME} wordmark — Barlow Condensed extrabold, braces around text,
pipe separator, pink "Development Portfolio" tagline beneath. Transparent or void
background for overlay use.
```

---

## Social share card (1:1)

```
[UNIVERSAL WRAPPER]
SCENE: Square social card — BasicHiro pixel portrait crop, purple panel frame,
green "EXPLORE" or site URL nexusprime.nexus, minimal text, high contrast readable
at phone scale.
```

---

## Negative prompt block (always append)

```
SaaS dashboard, glassmorphism, light mode, white background, Inter font,
purple gradient startup landing, photoreal developer photo, 3D blender character,
rounded card UI, neumorphism, gacha shop, battle pass, stock photo, blurry pixels,
Dex ghost confused with BasicHiro, Prime Portal void navy glass UI (wrong product)
```

---

## Cross-node image rule

When Dex appears (Prime Portal companion in Quest Log only):
- Use `/public/pixel-icons/dex-profile.png` as reference  
- Do **not** merge Dex visual into BasicHiro portrait  
- Dex style = Prime Portal kit; BasicHiro = this kit  
