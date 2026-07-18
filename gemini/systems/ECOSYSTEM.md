# Ecosystem — Quest & Node Canon (CANON)

**Scope:** Quest Log entries and cross-links to .nexus constellation  
**Code anchor:** `components/QuestLogPanel.tsx` — `QUESTS` array  

---

## Constellation map

```
                    ┌─────────────────┐
                    │   CORE NODE     │
                    │  (stats layer)  │
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
  │ NEXUS PRIME  │   │ PRIME PORTAL │   │  SAVE POINT  │
  │   (hub)      │   │  (TCG lab)   │   │   (arcade)   │
  └──────────────┘   └──────┬───────┘   └──────────────┘
                            │
                     Dex the Ghost
                            │
                   ┌────────┴────────┐
                   │ GRIMM FRACTURE  │
                   │  (side quest)   │
                   └─────────────────┘
```

---

## Quest entries (shipping)

### Prime Portal — Main Quest · **active**

| Field | Value |
|-------|-------|
| URL | https://primeportal.nexus |
| Objective | Liberate TCG data from corporate big dogs; build ultimate search + analytics |
| Companion | Dex the Ghost → primeportal.nexus |
| Status | In Progress — Search engine live; Dashboards under construction |
| Icon | `/pixel-icons/nav-star.png` |

### SavePoint — Main Quest · **active**

| Field | Value |
|-------|-------|
| URL | https://savepoint.nexus |
| Objective | Restore lost magic of ad-free retro arcade |
| Status | In Progress — One game live, high scores active; user accounts next |
| Icon | `/pixel-icons/nav-campfire.png` |

### Grimm Fracture — Side Quest · **paused**

| Field | Value |
|-------|-------|
| URL | https://grimmfracture.nexus |
| Objective | Generate high-quality AI-assisted graphic novel |
| Status | Paused — Awaiting Mana / Budget Regeneration |
| Icon | `/pixel-icons/item-orb-purple.png` |

### Nexus Prime HUB — Quest · **complete**

| Field | Value |
|-------|-------|
| URL | (on-site — no external explore required) |
| Objective | Central portfolio + launchpad for .nexus ecosystem; attract indie collabs |
| Status | Complete — "You are looking at it." |
| Reward | +1000 EXP, Digital Hub Unlocked |
| Icon | `/pixel-icons/nav-gem.png` |

---

## Sibling product one-liners (for cross-copy)

| Node | One-liner |
|------|-----------|
| **Prime Portal** | Gamified TCG data lab — free search Trojan Horse → paid analytics |
| **Save Point** | Ad-free retro arcade — Candy Blitz live; no paywalls ever |
| **Grimm Fracture** | AI-assisted graphic novel — paused for budget |
| **Nexus Prime** | RPG portfolio hub — you are here |

Use sibling kits for deep canon:
- `prime-portal-nexus/gemini/` — Dex, Lab, funnel  
- `The_Tank_Game/gemini/` — Save Point, Candy Blitz  
- `grimm-fracture/gemini/` — comic series bible  

---

## Abilities ↔ ecosystem mapping

| Ability | Nodes touched |
|---------|---------------|
| Domain Expansion: .nexus | SavePoint, Prime Portal, CoreNode — shared traffic & resources |
| Cursor Overdrive | Rapid prototype/deploy — games + landing pages |

---

## Inventory lore ↔ ecosystem

| Item | Lore tie |
|------|----------|
| CoreNode Crystal | Powers .nexus realm — servers, data, latency |
| Cursor Compass | AI codebase navigation |
| Scroll of Reactivity | React re-render metaphor |
| Flask of Tailwind | Utility styling |
| Sprite-Sheet Satchel | Pixel art + AI assets |

Do not rename items without updating `EquipmentInventoryPanel.tsx` + this file.

---

## Promotion checklist (new quest)

When adding or updating a quest:

1. Set `category`: active | paused | complete  
2. Set real `exploreUrl` if external  
3. Match status copy to actual project state  
4. Pick icon from `/public/pixel-icons/`  
5. Run `/ip-check` if lore references third-party IP  
6. Update this file + user says `LOCK`  

---

## DRAFT quests (not in shipping array)

Any new node or quest Gemini proposes must be labeled `DRAFT` until pasted into code and this file.

Examples:
- New main quest for a unreleased .nexus domain  
- "Complete" status for Prime Portal before user locks it  
- Fictional URLs not owned by BasicHiro  
