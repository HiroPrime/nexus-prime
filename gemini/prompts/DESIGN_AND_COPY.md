# Design & Copy Prompt Pack

Paste into the **Nexus Prime Director** Gem after knowledge files are loaded.

---

## `/ideas` — Idea sprint

```
/ideas
Context: Nexus Prime RPG portfolio (PRODUCT_BIBLE + STYLE_GUIDE + systems/).
Goal: [e.g. new inventory item / quest status update / mobile panel polish / intro CTA]
Generate 8 options. For each: 1-line pitch, why it fits canon, desktop/mobile risk, ship-speed 1–5.
Rank top 3. Recommend 1. End with KEEP / TWIST / SCRAP.
Label all as DRAFT. Flag anything that touches desktop lg+ layout as high risk.
```

---

## `/brief` — One-panel brief

```
/brief
Panel: [Character / Equipment / Abilities / Quest Log / Intro / Loading]
Viewport: [desktop lg+ / mobile max-lg / both with split rules]
Job-to-be-done: …
Constraints: purple panel + black border, canon stats/quests, no desktop breakage.
Deliver:
1) One-sentence visual thesis
2) Hierarchy (title → content → CTA)
3) Component list (match existing panel zones)
4) Copy deck (all strings)
5) Acceptance criteria from systems/PANELS_AND_LAYOUT.md
```

---

## `/copy` — UI / quest / item strings

```
/copy
Write [N] variants for: [element]
Voice: retro RPG menu + honest indie dev. Playful stats OK; facts must stay true.
Include: pixel-button micro copy + VT323 body option where relevant.
Cross-check ECOSYSTEM.md if quest-related.
```

---

## `/quest` — Quest Log entry

```
/quest
Action: [new / update status / rewrite objective]
Quest name: …
Target category: [active / paused / complete]
Deliver full quest object fields: type, objective, statusLabel, statusDetail, reward?, exploreUrl?, companion?
Match QUESTS shape in QuestLogPanel.tsx. Label DRAFT until LOCK.
```

---

## `/panel` — Single panel deep dive

```
/panel
Panel: [Character / Equipment / Abilities / Quest Log]
Focus: [copy / layout / new row / modal / mobile-only]
Confirm desktop lg+ unchanged. List max-lg: classes if mobile work.
Deliver wire hierarchy in text + all user-visible strings.
```

---

## `/mobile` — Mobile-only proposal

```
/mobile
Propose change for max-lg only: …
Explicitly state what desktop lg+ must NOT change.
Reference tab bar, accordion, grid 2×3, container-fit fonts as applicable.
```

---

## `/critique`

```
/critique
Review this brief / mock / copy for:
1) Brand vocabulary (PRODUCT_BIBLE)
2) Style guide compliance
3) Panel layout physics (desktop sacred)
4) Ecosystem / quest accuracy
5) Mobile readability
Give KEEP / TWIST / SCRAP recommendation.
```

---

## `/lock`

```
/lock
Promote this DRAFT into CANON paste-ready markdown for:
[target file: PRODUCT_BIBLE / ECOSYSTEM / PANELS / persona / quest array note]
Output only the section to paste — no commentary.
```

---

## `/compare`

```
/compare
Side-by-side A / B / C for: [decision]
Score on: canon fit, ship speed, desktop safety, mobile UX.
Recommend one. End KEEP / TWIST / SCRAP.
```
