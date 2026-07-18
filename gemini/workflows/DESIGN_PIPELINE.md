# Workflow: Design Pipeline (Speed)

Optimized for frequent UI/copy/direction drops with Gemini assistance — then handoff to code.

## Cadence options

| Mode | Brief | Visual | Ship to code |
|------|-------|--------|--------------|
| **Sprint** | 1 panel / weekend | 1 key visual / day | Continuous |
| **Steady** | 1 copy block / day | Prompt pack as needed | PR-sized chunks |
| **Arc burst** | Full quest log refresh | Batch panel mocks | Weekly theme drop |

Pick one; don’t mix mid-panel.

---

## Pipeline stages

### 0) Canon load (once)
Gem knowledge = bible + style + BasicHiro + systems.

### 1) Brief lock
`/ideas` → KEEP → `/brief` or `/panel` → paste into issue/PR or `systems/` notes.

### 2) Direction factory
For each surface:
1. `/copy` for strings  
2. KEEP/TWIST once  
3. `/prompt` for visual (Art Director Gem)  
4. Generate with style + BASICHIRO locks + pixel refs  
5. Consistency checklist (`STYLE_GUIDE.md`)  
6. Hand to Cursor/code with acceptance criteria from `PANELS_AND_LAYOUT.md`  

### 3) Buffer
Never design only what you’re coding today. Keep **+1 panel brief** ahead.

### 4) Changelog
After each ship, note:

```
## Direction log
- YYYY-MM-DD: shipped [surface]
- Drift caught: …
- Lock updates: none / [file]
- Desktop lg+ touched: yes/no (must be no unless intentional)
```

---

## Roles split (recommended two Gems)

| Gem | Owns |
|-----|------|
| **Nexus Prime Director** | ideas, briefs, copy, quests, critique |
| **Nexus Prime Art Director** | image prompts, pixel consistency, UI mock repair |

Same knowledge files; different `GEM_SYSTEM` emphasis (copy/product vs image).

---

## Definition of Done (single surface)

- [ ] Serves panel job without new desktop columns  
- [ ] Style checklist passes  
- [ ] Vocabulary = Quest / Panel / BasicHiro / .nexus  
- [ ] Quest facts match `ECOSYSTEM.md` if applicable  
- [ ] Mobile-readable (`max-lg` rules respected)  
- [ ] DRAFT vs CANON labeled  
- [ ] Stats API unchanged unless explicitly scoped  

---

## Speed multipliers

1. Reuse inventory modal shell for new items.  
2. One BasicHiro portrait ref → crop for social.  
3. Keep green EXPLORE button as the only bright CTA pattern.  
4. Script silent UI states when copy stalls (loading boot lines).  
5. Quest status updates → edit `ECOSYSTEM.md` + code in one PR.

---

## Code handoff template

```
## Ship brief: [Panel / Quest / Intro]
### Copy (final)
- …

### Layout
- Desktop lg+: unchanged / [explicit diff if promoted]
- Mobile max-lg: …

### Files likely touched
- components/[Panel].tsx
- gemini/systems/[FILE].md (if canon lock)

### Acceptance
- [ ] PANELS_AND_LAYOUT checklist
- [ ] STYLE_GUIDE checklist
```
