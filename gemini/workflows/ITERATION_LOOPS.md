# Workflow: Iteration Loops

Goal: fewer than **3 passes** from draft → shippable direction.

---

## Loop A — Product / Copy (Director Gem)

```
Pass 1: Generate (brief or copy)
Pass 2: Critique (/critique) + your KEEP/TWIST/SCRAP
Pass 3: Final polish only (cut words / sharpen CTA / quest fact check)
STOP. Ship to art or code.
```

If still weak after Pass 3 → **SCRAP structure**, don’t micro-edit forever.

---

## Loop B — Visual (Art Director Gem)

```
Pass 1: Generate with STYLE LOCK + BASICHIRO lock + icon reference
Pass 2: Consistency repair prompt (fix drifts only)
Pass 3: Crop/lighting/framing tweak OR accept
STOP. Do not redesign BasicHiro mid-campaign.
```

**Hard stop rule:** if Pass 2 still breaks identity anchors → regenerate from Pass 1 with stricter negative prompt.

---

## Loop C — Layout (mobile-safe)

```
Pass 1: Propose max-lg: only change with explicit desktop parity note
Pass 2: /critique for lg+ regression risk
Pass 3: Acceptance checklist from PANELS_AND_LAYOUT.md
STOP. If desktop touched unintentionally → SCRAP.
```

---

## Feedback language cheat sheet

| You say | Meaning |
|---------|---------|
| `TWIST: more RPG` | Lean into stat humor / menu voice |
| `TWIST: more honest` | Less joke, more real project status |
| `TWIST: shorter` | Cut bio / quest objective length |
| `FIX LOCK: portrait` | Pixel avatar repair |
| `FIX LOCK: purple panel` | Kill glass/SaaS drift |
| `ENERGY: +quest` | Stronger EXPLORE hooks |
| `ENERGY: -corporate` | Remove LinkedIn tone |
| `MOBILE ONLY` | Forbidden to change desktop |
| `SHIP IT` | End loop |

---

## Skill ampers (use Gemini as coach)

Weekly 15-min drills:

1. **Bio budget drill:** bio in ≤3 sentences, all facts true  
2. **Quest drill:** one status update with correct URL + category  
3. **Panel drill:** one panel hierarchy without new components  
4. **Mobile drill:** one max-lg improvement with zero lg+ diff  
5. **Item lore drill:** one inventory item in modal format  

Ask Gemini after each drill:  
`What craft skill did I just train, and what’s tomorrow’s 10-min drill?`
