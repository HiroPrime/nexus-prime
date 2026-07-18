# Nexus Prime — Product Bible (CANON)

**Format:** Retro RPG portfolio / ecosystem launchpad  
**Creator:** BasicHiro (Jacob Lovell — Development & Creative)  
**Label:** Core Node constellation hub  
**Domain:** nexusprime.nexus  
**Status:** Live — intro shell + four RPG panels + stats API  

---

## Logline

A retro game-menu portfolio that turns “hire me / explore my work” into Character, Equipment, Abilities, and Quest Log screens — routing visitors across the .nexus constellation with honest indie-dev voice and zero corporate landing-page fluff.

---

## The Prime Directive (non-negotiable)

1. **Show the work through RPG metaphor** — stats, gear, abilities, and quests map to real skills and projects.
2. **Desktop at `lg+` is sacred** — do not redesign the shipped desktop layout unless explicitly promoted.
3. **Mobile feels like an app** — `100dvh`, bottom tab bar (icons only), footer above tab bar.
4. **Ecosystem links are quests** — Prime Portal, Save Point, Grimm Fracture use in-world copy + real URLs.
5. **Honest bio** — solo dev, AI-leveraged, ad-free arcades, TCG data lab, flat-rate landing pages for indies.
6. **Retro UI, modern stack** — Next.js 15, React 19, Tailwind v3 (preflight off), Supabase for votes/metrics.
7. **Stay indie** — no fake enterprise logos, no “10x engineer” LinkedIn cosplay.

---

## Vocabulary (use consistently)

| Term | Meaning |
|------|---------|
| **Nexus Prime / Hub** | This portfolio site — constellation launchpad |
| **BasicHiro** | Creator persona — LVL 1337, real name Jacob Lovell |
| **Panel** | One RPG screen: Character, Equipment, Abilities, Quest Log |
| **Quest** | A .nexus project entry in Quest Log |
| **Main Quest** | Active flagship project (Prime Portal, Save Point) |
| **Side Quest** | Paused or secondary project (Grimm Fracture) |
| **Equipment** | Dev gear metaphor (headphones, keyboard, IDE, energy drinks) |
| **Inventory** | Clickable item grid with lore modals |
| **Ability** | Signature skill blocks (Domain Expansion, Cursor Overdrive) |
| **LOVE / HATE MAIL** | Playful engagement buttons on Character panel |
| **Population** | Public metric from `/api/stats` — unique visitors |
| **Core Node** | Constellation infrastructure / shared stats layer |
| **Constellation** | Linked .nexus properties sharing traffic and identity |
| **Intro slide** | Hero with “enter” into loading → game shell |
| **Game shell** | Post-loading viewport with nav + panels (not a playable RPG battle) |

**Avoid in new copy:** “AI-powered platform,” “synergy,” “disrupt,” generic “portfolio website,” “users” (prefer visitors / players / collaborators).

---

## Tone & themes

- Retro game menu sincerity  
- Indie dev confidence without arrogance  
- Playful stats that map to real traits  
- Quest log as honest project status board  
- Cross-promote sibling nodes without ad-farm energy  

**Not:** Dribbble gradient hero, corporate case-study PDF tone, gacha monetization language, fake shipped features.

---

## The four panels (CANON)

| Panel | Job | Key elements |
|-------|-----|--------------|
| **Character** | Who is BasicHiro | LVL 1337, portrait, stats, resistances, bio, LOVE/HATE |
| **Equipment** | Dev loadout metaphor | 4 equipment slots + inventory grid (4×4 desktop, 2×3 mobile) |
| **Abilities** | Signature skills | Domain Expansion: .nexus, Cursor Overdrive |
| **Quest Log** | Ecosystem map | Active / paused / complete quests with EXPLORE links |

---

## Character canon (shipping)

**Stats:** Bandwidth 999 · Creative Vision 255 · Execution 99 · Agile Dev 60 · Bug Resistance 404  

**Resistances:** Scope Creep 99% · Shiny Object 40% · Tutorial Paralysis IMMUNE  

**Bio (paraphrase allowed; facts locked):**  
Solo creator behind .nexus — Save Point ad-free retro arcades, Prime Portal TCG data, flat-rate landing pages for indie studios. Builds fast, leverages AI, skips corporate BS.

---

## Tech stack (native web)

| Layer | Lock |
|-------|------|
| Frontend | Next.js 15 + React 19 + Tailwind v3 (preflight disabled) |
| Fonts | Barlow Condensed, VT323, Press Start 2P, Bebas Neue |
| Backend | Supabase — `site_metrics`, `portfolio_votes`, etc. |
| Public stats | `GET /api/stats` → `{ population, metric: "Unique Visitors" }` |
| Deploy | Vercel — auto from `main` |

---

## User journey (visitor)

1. **Land on intro** — hero background, enter CTA  
2. **Loading screen** — retro boot sequence  
3. **Game shell** — logo, social, nav (desktop) or tab bar (mobile)  
4. **Explore panels** — learn bio, gear, abilities, quests  
5. **EXPLORE quest** — outbound to primeportal.nexus, savepoint.nexus, etc.  

---

## Engagement (shipping vs DRAFT)

| Feature | CANON | DRAFT |
|---------|-------|-------|
| LOVE / HATE buttons | Local UI state + thank-you line | Persisted vote counts in UI |
| `/api/votes` | Exists in codebase | Full Character panel wiring |
| Stats display | API for Core Node consumption | On-site Population HUD |

---

## Cross-node promotion rules

- Prime Portal = main quest, Dex companion, search + analytics in progress  
- Save Point = main quest, Candy Blitz live, accounts next  
- Grimm Fracture = paused side quest, budget/mana framing  
- Nexus Prime Hub = complete quest (“You are looking at it”)  

Never mark a sibling node “complete” unless the user locks it.

---

## Production credit (public)

**Heavy design & production:** BasicHiro  
**Generative design & direction assistance:** Gemini  
