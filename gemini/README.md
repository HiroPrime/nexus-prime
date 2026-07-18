# Nexus Prime — Gemini Production Kit

AI-assisted **design & direction** pipeline for **BasicHiro / Core Node / Nexus Prime**.

Upload this folder into a Gemini Gem (or paste key files into Gemini knowledge) so every portfolio brief, panel copy block, quest update, and image prompt pulls from the same locked RPG-portfolio canon.

**Source anchors**
- Live app: this repo (`nexus-prime` → nexusprime.nexus)
- Brand lock: `{NEXUS | PRIME}` wordmark + purple RPG panels
- Constellation: Core Node reads `/api/stats` for Population
- Ecosystem nodes: Prime Portal, Save Point, Grimm Fracture

## What this kit solves

| Pain | Fix |
|------|-----|
| Portfolio voice drifts into generic SaaS landing page | Locked promise + vocabulary in `PRODUCT_BIBLE.md` |
| UI looks like random purple gradient template | Style lock in `STYLE_GUIDE.md` + panel tokens |
| Desktop layout breaks when mobile ideas ship | Layout physics in `systems/PANELS_AND_LAYOUT.md` |
| Quest / ecosystem copy contradicts live nodes | Canon in `systems/ECOSYSTEM.md` |
| Stats / Core Node integration invented wrong | API contract in `systems/CORE_NODE.md` |
| BasicHiro portrait / stats drift between gens | Persona lock in `personas/BASICHIRO.md` |
| Slow iteration with Gemini | Sprint + pipeline + feedback loops in `workflows/` |

## Folder map

```
gemini/
  README.md                 ← you are here
  GEM_SYSTEM.md             ← paste as Gem instructions
  PRODUCT_BIBLE.md          ← mission, vocabulary, non-negotiables
  STYLE_GUIDE.md            ← visual + UI + typography lock
  personas/                 ← BasicHiro + template for companions
  systems/                  ← panels, intro flow, Core Node, ecosystem
  prompts/                  ← copy-paste prompt blocks
  workflows/                ← how to run sessions day-to-day
```

## Quick start (15 minutes)

1. Create a Gemini Gem named **Nexus Prime Director**.
2. Paste the full contents of `GEM_SYSTEM.md` into the Gem instructions.
3. Attach / upload these as knowledge files (priority order):
   - `PRODUCT_BIBLE.md`
   - `STYLE_GUIDE.md`
   - `personas/BASICHIRO.md`
   - `systems/PANELS_AND_LAYOUT.md`
   - `systems/ECOSYSTEM.md`
   - `systems/CORE_NODE.md`
   - `systems/INTRO_FLOW.md`
4. Optionally create a second Gem: **Nexus Prime Art Director** with style + persona files, focused on image / UI visual prompts only.
5. Run session type A from `workflows/IDEA_SPRINT.md`.

## Daily design loop (short)

1. **Idea sprint** (10–20 min) → pick 1 angle  
2. **Brief lock** (20–40 min) → one panel / one quest / one surface  
3. **Copy + UI spec** (iteration loop) → approve / revise  
4. **Visual prompts** from style + BasicHiro locks  
5. **Generate → critique → regenerate** (max 3 passes)  
6. **Ship brief to code** → log what locked vs drifted  

Full detail: `workflows/DESIGN_PIPELINE.md`

## Identity IDs (always use these names in prompts)

| ID | Display | Role |
|----|---------|------|
| `BASICHIRO` | BasicHiro | Creator, LVL 1337, portfolio host |
| `NEXUS_PRIME_HUB` | Nexus Prime | Central portfolio / launchpad |
| `DEX_GHOST` | Dex the Ghost | Prime Portal companion (cross-node) |
| `SAVE_POINT` | SavePoint | Arcade node |
| `PRIME_PORTAL` | Prime Portal | TCG data lab node |
| `GRIMM_FRACTURE` | Grimm Fracture | Graphic novel side quest |
| `CORE_NODE` | Core Node | Constellation stats / infrastructure |

When prompting Gemini Image:  
**Reference the persona ID + paste the LOCKED VISUAL BLOCK from that file.** Never paraphrase BasicHiro from memory.

## Canon hierarchy (what wins conflicts)

1. Persona LOCKED VISUAL BLOCKS (`personas/`)  
2. `PRODUCT_BIBLE.md` non-negotiables  
3. Active system file (`systems/*.md`)  
4. `STYLE_GUIDE.md`  
5. New sprint ideas (must be marked `DRAFT` until you say lock)

### Shipping vs DRAFT

| Topic | CANON (ship today) | DRAFT (future) |
|-------|--------------------|----------------|
| Layout | Desktop `lg+` unchanged; mobile app shell + tab bar | New desktop breakpoints |
| Panels | Character, Equipment, Abilities, Quest Log | Fifth panel without brief |
| Quests | Prime Portal + Save Point active; Grimm paused; Hub complete | New main quest without status update |
| Engagement | LOVE / HATE local UI feedback | Full vote persistence UX |
| Stats API | `GET /api/stats` → Population | Additional public metrics |
| Game slide | Intro → Loading → Game shell | Playable mini-game in hub |

## How to promote a new idea into canon

1. Generate options in an Idea Sprint.  
2. Mark winner as `CANDIDATE`.  
3. After you approve, move it into the matching `systems/` or bible file.  
4. Update persona locks only if BasicHiro appearance truly changes (rare).

## Reference art in this repo

| Asset | Path |
|-------|------|
| Intro hero background | `/public/bg-intro.png` |
| Inner panel background | `/public/bg-inner.png` |
| BasicHiro portrait | `/public/pixel-icons/avatar-portrait-2.png` |
| Dex companion icon | `/public/pixel-icons/dex-profile.png` |
| Nav / quest icons | `/public/pixel-icons/` |
| Equipment + inventory icons | `/public/pixel-icons/eq-*.png`, `item-*.png` |

## Production credit (public)

**Heavy design & production:** BasicHiro  
**Generative design & direction assistance:** Gemini  

Gemini accelerates briefs, idea sprints, copy, and consistent RPG-portfolio prompting from locked files. Final direction and shipping decisions remain with BasicHiro.
