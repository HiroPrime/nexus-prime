# Intro Flow — System Lock (CANON)

**Scope:** Intro → Loading → Game slide sequence  
**Code anchors:** `HomeExperience.tsx`, `IntroSlide.tsx`, `LoadingScreen.tsx`, `StartScreen.tsx`  

---

## Three-slide pipeline

```
┌─────────┐     Enter      ┌──────────┐    Complete    ┌──────────┐
│  INTRO  │ ─────────────► │ LOADING  │ ─────────────► │   GAME   │
│ bg-intro│                │ bg-intro │                │ bg-inner │
└─────────┘                └──────────┘                └──────────┘
```

---

## Intro slide

- Background: `.bg-intro` (hero landscape)  
- Primary job: emotional hook + **enter** into experience  
- Copy includes BasicHiro green highlight on name  
- CTA triggers `setSlide("loading")`  

**Mobile:** tighter padding; hero bg position `72% center` (desktop `64% center`).

---

## Loading slide

- Retro boot aesthetic — pixel font, green blink text energy  
- On complete: reset view to **Character**, enter **game** slide  
- Must feel like game boot, not SaaS spinner  

---

## Game slide

- Background switches to `.bg-inner`  
- Default panel: **Character**  
- Desktop: header nav visible  
- Mobile: tab bar + footer pattern active  

Logo click (when not on intro): returns to intro slide — preserve this wayfinding.

---

## Header/footer rules (intro + game)

| Element | Intro | Game desktop | Game mobile |
|---------|-------|--------------|-------------|
| Logo + tagline | ✓ | ✓ (click → intro) | ✓ |
| Section nav | hidden | ✓ | hidden (use tab bar) |
| SocialMedia | ✓ | ✓ | ✓ |
| SiteFooter | ✓ | ✓ | ✓ above tab bar |

---

## Boot state (hydration)

Pre-mount: centered "Booting" pixel green blink on `#030308`.  
Prevents layout flash — do not remove in redesigns without replacement.

---

## DRAFT

| Idea | Label |
|------|-------|
| Skip intro toggle for return visitors | `DRAFT` |
| Playable mini-game instead of panels | `DRAFT` |
| Video intro cutscene | `DRAFT` |
| Sound on enter (without user gesture policy) | `DRAFT` |

---

## Acceptance criteria (intro change)

- [ ] Enter still advances intro → loading → game  
- [ ] Game lands on Character panel  
- [ ] Background class swaps correctly per slide  
- [ ] Mobile intro readable without horizontal scroll  
- [ ] Boot hydration guard preserved  
