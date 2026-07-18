# Panels & Layout — System Lock (CANON)

**Scope:** Four RPG panels + shell layout physics  
**Code anchors:** `HomeExperience.tsx`, `IntroSlide.tsx`, `IntroMenu.tsx`, panel components  

---

## Shell states

| Slide | Background | Purpose |
|-------|------------|---------|
| `intro` | `.bg-intro` | Hero + enter CTA |
| `loading` | `.bg-intro` | Boot / loading sequence |
| `game` | `.bg-inner` | Nav + active panel |

Viewport: `h-[100dvh] overflow-hidden` — no page scroll in game shell.

---

## Navigation (CANON)

### Desktop (`lg+`)

- Header: Logo (with tagline) · center `IntroMenu` (when game) · SocialMedia  
- Four views: **Character · Equipment · Abilities · Quest Log**  
- Icon + label nav in header — **unchanged from shipping**

### Mobile / tablet (`< lg`)

- Header: Logo + SocialMedia only (no center nav)  
- Bottom **tab bar** — icons only, black top/bottom borders  
- Same four views via `IntroMenu variant="tabbar"`  
- Footer sits **above** tab bar (background visible at viewport bottom)

---

## Panel inventory

### Character (`CharacterPanel.tsx`)

| Zone | Desktop | Mobile |
|------|---------|--------|
| Col 1 | LVL badge + portrait | Row: badge + portrait side by side |
| Col 2 | Name, stats, resistances | Stacked under row |
| Col 3 | Bio + LOVE/HATE | Bio + buttons; extra gap before buttons (`max-lg:mt-8`) |

- LOVE/HATE: local vote state; counters removed on all layouts  
- LVL badge: stacked LVL / 1337, container-fitting font  

### Equipment (`EquipmentInventoryPanel.tsx`)

| Zone | Desktop | Mobile |
|------|---------|--------|
| Left 50% | 4 equipment rows | Top section (~52vh max) |
| Right 50% | 4×4 inventory grid | Bottom; **2×3 grid** (6 slots) |

- Item click → centered modal on purple solid background  
- Modal: icon, name (green label), description, Close (green button)  

### Abilities (`AbilitiesPanel.tsx`)

| Zone | Desktop | Mobile |
|------|---------|--------|
| Layout | Two equal columns, original clamps | Stacked cells, **container-fitting font** |

Abilities (locked):
1. Domain Expansion: .nexus — AoE  
2. Cursor Overdrive — Active  

### Quest Log (`QuestLogPanel.tsx`)

| Zone | Desktop | Mobile |
|------|---------|--------|
| Layout | Split pane: list + detail | **Accordion** — one quest expanded at a time |

Categories:
- Main Quests (active)  
- Side Quests (paused)  
- Completed Quests (complete)  

Status colors: active `#20ff00` · paused `#ffd700` · complete `#fe9dfe`  

EXPLORE button: green pixel CTA → external .nexus URL  

---

## Layout non-negotiables

1. **Never change desktop `lg+` panel structure** without explicit user promotion.  
2. Mobile-only classes use `max-lg:` prefix.  
3. Do not add a fifth panel without updating bible + this file.  
4. Intro desktop layout stays as shipped — mobile may stack intro content only where code already does.  
5. Tab bar is icon-only on mobile — do not add labels without lock.  

---

## DRAFT ideas (not shipped)

| Idea | Label |
|------|-------|
| Fifth panel (e.g. Map, Party, Settings) | `DRAFT` |
| Desktop tab bar | `DRAFT` — forbidden unless promoted |
| Scrollable full-page layout on desktop | `DRAFT` — breaks viewport lock |
| Inline Population HUD in header | `DRAFT` |

---

## Acceptance criteria (panel change)

- [ ] Desktop screenshot parity at `lg+` unless change is mobile-only  
- [ ] Mobile: all four tabs reachable without horizontal scroll  
- [ ] Panel titles use PlayfulText + type-heading scale  
- [ ] Black borders preserved on panels and modals  
- [ ] Quest Log accordion does not break desktop split pane  
