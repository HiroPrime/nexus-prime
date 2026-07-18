# Panel Prompt Pack

Deep prompts for each RPG panel — paste into **Nexus Prime Director** when editing one surface.

---

## Character — stats / bio / engagement

```
/panel Character
Load: personas/BASICHIRO.md + systems/PANELS_AND_LAYOUT.md
Task: [rewrite bio variant / new stat joke / LOVE-HATE copy / LVL badge tweak]
Hard locks: LVL 1337 stacked, stat numbers canon, pixel portrait, no vote counters.
Mobile: max-lg stacked layout only. Desktop three-column unchanged.
Deliver 3 copy variants + recommendation. DRAFT until LOCK.
```

---

## Equipment — gear rows

```
/panel Equipment
Load: EquipmentInventoryPanel canon items
Task: [new equipment slot line / stat joke / slot rename]
Hard locks: 4 slots — Head, Weapon, Armor, Accessory. Pixel icons from /pixel-icons/eq-*
Format: "+N Stat · EFFECT" style. Do not add fifth slot without DRAFT label.
```

---

## Inventory — items + modal

```
/panel Equipment
Focus: inventory grid + item modal
Task: [new item lore / replace empty slot flavor / modal copy]
Hard locks: 5 named items shipping (scroll, flask, compass, crystal, satchel).
Grid: 4×4 desktop, 2×3 mobile. Modal: green name, VT323 desc, green Close.
Item click opens centered modal — no side drawer.
```

---

## Abilities — skill blocks

```
/panel Abilities
Load: ABILITIES array canon
Task: [tweak description / propose third ability]
Hard locks: Domain Expansion .nexus (AoE), Cursor Overdrive (Active).
Third ability = DRAFT — must not ship in copy without code update.
Desktop: two columns. Mobile: stacked container-fit font cells.
```

---

## Quest Log — list + detail

```
/panel Quest Log
Load: systems/ECOSYSTEM.md
Task: [status update / new objective / companion line / reward text]
Hard locks: category colors, EXPLORE green button, Prime Portal has Dex companion.
Desktop: split pane. Mobile: accordion only.
Deliver quest object fields ready to paste into QUESTS array.
```

---

## Intro + Loading

```
/panel Intro
Load: systems/INTRO_FLOW.md
Task: [hero copy / enter CTA / loading boot lines]
Hard locks: intro → loading → game pipeline, bg-intro then bg-inner.
No skip-intro without DRAFT. Booting hydration state preserved.
```

---

## Shell — nav + tab bar

```
/panel Shell
Load: systems/PANELS_AND_LAYOUT.md
Task: [nav icon mapping / tab order / footer copy]
Hard locks: 4 views same order Character, Equipment, Abilities, Quest Log.
Mobile tab bar icons only — no labels. Desktop header nav unchanged at lg+.
Icons from /pixel-icons/nav-*.png
```

---

## Quick panel critique

```
/critique panel [Character|Equipment|Abilities|Quest Log]
Check: purple+border, typography trio, desktop/mobile split rules, canon data match.
Score 1–5: canon fit, ship speed, desktop safety.
End KEEP / TWIST / SCRAP.
```
