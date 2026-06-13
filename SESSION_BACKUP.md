# Session Backup — Remotion Project
**Date:** 2026-06-13
**Session:** 08_Youtube_US / New York City

---

## What Was Built This Session

### 1. Remotion Project Setup
- Installed Remotion 4.0.476 at `Claude/Projects/remotion/`
- Node.js v25.8.1 confirmed installed
- Installed additional packages: `d3`, `d3-geo`, `topojson-client`, `world-atlas`
- Renamed from `theo-through-time` to `remotion`

### 2. NYC Cinematic Title Card (MyComp)
- Dark cinematic background, vignette, sepia grain
- Animated: "United States of America" → "New York City" slides up → gold divider → "1905" → "Theo Through Time"
- Gold color palette, serif fonts
- 1920×1080, 30fps, 150 frames (5 seconds)

### 3. Flight Globe Animation (FlightGlobe)
- Real world geography (world-atlas countries-50m.json)
- d3-geo orthographic projection with hemisphere clipping
- Ocean: Google Maps blue gradient
- Countries: warm white (#f0ede6) with dark borders
- Mumbai → NYC great-circle flight arc (200 points, draws progressively)
- Arc uses geoPath() LineString — clips correctly at globe edge (no back-face bleed)
- easeInOutCubic smooth rotation
- Google Maps-style teardrop pins (red=Mumbai, blue=NYC)
- Plane icon follows arc on front hemisphere only
- Bottom info card: Distance, Flight Time, Direction
- 1920×1080, 30fps, 270 frames (9 seconds)

---

## Bugs Fixed During Session
1. Arc showing through back of globe → Fixed by using geoPath(LineString) instead of manual point projection
2. Jerky rotation → Fixed with easeInOutCubic custom easing
3. TypeScript errors (unused vars) → Cleaned up
4. resolveJsonModule missing → Added to tsconfig.json
5. topojson type imports → Used topojson-specification package

---

## Tools & Platforms Researched

### PAI Pro by Utopai Studios
- URL: pai.utopaistudios.com
- Status: Waitlist only (as of June 2026)
- What it does: AI cinematic video — inserts real host into AI-generated historical environments
- Used by: Chloe VS History (1.5M views on Tudor London video)
- Waitlist submitted with history/travel YouTube description

### Reference Video Analyzed
- "I time travelled to Tudor London in 1536!" by Chloe VS History
- 1.5M views in 2 weeks, tool used = PAI Pro
- Login: Google OAuth (no traditional signup form)

### Remotion + Claude Video Learned
- "Create Motion Graphics with Claude Code + Remotion" by Zinho Automates
- Chapters: For editing / For Apps & SaaS / Website → explainer / 5 Pro Tips / Integrate into app / Mistakes to avoid
- Key insight: Remotion creates NEW overlays/assets, not edit existing MP4s

---

## Remotion_skill Global Identifier
- Saved at: `/Users/swatimitra/.claude/skills/Remotion_skill.md`
- Trigger: Type `Remotion_skill` in any Claude project
- Contains: All APIs, 50+ use cases, animation patterns, prompting rules, output formats

---

## Files Created / Modified

### Remotion Project
- `src/Composition.tsx` — NYC title card composition
- `src/FlightGlobe.tsx` — Mumbai→NYC globe animation
- `src/Root.tsx` — Composition registry (updated)
- `tsconfig.json` — Added resolveJsonModule
- `README.md` — Full project documentation
- `SESSION_BACKUP.md` — This file

### Memory Files
- `/Users/swatimitra/.claude/skills/Remotion_skill.md` — Global Remotion skill
- `/Users/swatimitra/.claude/skills/SKILLS_INDEX.md` — Skills index
- `~/.claude/projects/.../memory/remotion_skill.md` — Project memory copy
- `~/.claude/projects/.../memory/remotion_claude_capabilities.md` — Video learnings
- `~/.claude/projects/.../memory/MEMORY.md` — Memory index
- `Claude/Projects/NYC_Video_Project_Backup.md` — Project overview backup

---

## Next Steps
- Wait for PAI Pro waitlist approval
- Use Runway ML in the meantime for AI video scenes
- Build more Remotion compositions (timeline, Ken Burns, lower thirds)
- Combine PAI/Runway scenes + Remotion overlays in video editor
- Set up AWS Lambda for batch rendering when ready
