<div align="center">

# 🎬 Remotion + Claude AI — Programmatic Video Creation

### Build broadcast-quality motion graphics entirely through code and AI.
### No After Effects. No subscriptions. No design skills needed.

[![Remotion](https://img.shields.io/badge/Remotion-4.0-blue?style=flat-square)](https://remotion.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Claude AI](https://img.shields.io/badge/Claude-AI_Generated-orange?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-Free_for_teams_≤3-green?style=flat-square)](https://remotion.dev/license)

</div>

---

## 🌟 What Is This Project?

This is an **open-source motion graphics studio** that combines [Remotion](https://remotion.dev) (a React-based video rendering framework) with **Claude AI** to create stunning, broadcast-quality video animations — entirely through code.

Whether you're a **YouTuber**, a **developer**, a **data journalist**, or a **content creator**, this project gives you a free, reusable library of video components you can customize and render into MP4 files for your own content.

**The workflow is simple:**
- You describe what you want in plain English
- Claude writes the React/Remotion/TypeScript code
- Remotion renders it to MP4 — at any resolution, any framerate
- No timeline dragging. No keyframe hell. No expensive software.
- Every animation is code — so it's **version-controlled, reusable, and infinitely customizable**

---

## 🎯 Who Is This For?

| If you are... | This helps you... |
|---|---|
| **A YouTuber** | Create professional intros, lower thirds, and transitions without paying for After Effects |
| **A travel / geography creator** | Get cinematic animated globes, flight routes, and location reveals |
| **A data journalist** | Animate bar charts, maps, counters, and infographics from real data |
| **A developer** | Learn how to build video programmatically with React and ship reusable video components |
| **A freelancer / agency** | Build a library of reusable motion graphic templates for clients |
| **A SaaS founder** | Generate personalized video content at scale for your users |
| **A beginner** | See real working examples and adapt them — zero video editing experience required |

---

## 🚀 Why This Matters

Traditional motion graphics require expensive tools (After Effects costs ~$55/month), years of expertise, and hours of manual keyframing per video.

With **Remotion + Claude AI**:

✅ **Free** — Remotion is free for individuals and teams up to 3 people, including commercial use  
✅ **Fast** — Describe what you want, Claude writes the code, preview instantly in your browser  
✅ **Scalable** — One codebase can generate thousands of unique videos via JSON props  
✅ **Version controlled** — All animations live in Git, not a proprietary binary file format  
✅ **Reusable** — Every component you build can be dropped into any future project  
✅ **No experience needed** — If you can describe a video in words, Claude can build it  

---

## ✨ Featured Example — Animated Flight Globe

### 🌍 `FlightGlobe` — Interactive 3D Globe with Flight Path Animation

*Perfect for: Travel vlogs, geography content, international news explainers, aviation route reveals, documentary intros*

A cinematic animated globe showing a flight route between any two cities in the world — built entirely with real geographic data, d3-geo projections, and React/SVG.

**What the animation does (9 seconds, 30fps):**

| Timestamp | What happens |
|---|---|
| 0–2s | Deep space background fades in with a star field. Globe appears centered on the departure city. |
| 2–3s | Origin city pin pulses into view — Google Maps-style teardrop marker with drop shadow and city label. |
| 3–7s | Globe rotates smoothly (eased cubic) from departure city toward destination. A red dashed flight arc draws itself in real time along the great-circle route. A plane icon travels the arc. |
| 7–8s | Destination city pin and label fade in as the globe settles centered on the arrival city. |
| 8–9s | Info card slides up from the bottom — Distance, Flight Time, Direction. |

**How to change the cities — 2 lines of code:**
```tsx
// src/FlightGlobe.tsx
const MUMBAI: [number, number] = [72.8777, 18.9402];   // ← replace with your departure city [lon, lat]
const NEW_YORK: [number, number] = [-74.006, 40.7128]; // ← replace with your destination city [lon, lat]
```
Find any city's coordinates on [latlong.net](https://www.latlong.net) and paste them in. Re-render — done.

**Technical highlights:**
- Real world geography from `world-atlas` — actual country borders at 50m resolution (not hand-drawn)
- `d3-geo` orthographic projection — mathematically accurate globe rendering in SVG
- Correct hemisphere clipping — flight arc stops at the globe edge, never bleeds through the back
- Great-circle routing via `geoInterpolate()` — the actual shortest flight path, not a straight line
- Smooth `easeInOutCubic` rotation — globe starts and ends gently, no jarring snaps
- City pins only render when visible on the front hemisphere — disappear naturally as globe rotates
- Mumbai pin fades out gracefully before going behind the globe

**Specs:** 1920×1080 · 30fps · 270 frames (9 seconds) · Renders to MP4, WebM, or GIF

---

## ⚙️ Prerequisites — Install These First

Before you clone this project, make sure the following are installed on your machine:

| Tool | Version | Why you need it | Install |
|---|---|---|---|
| **Node.js** | v18 or higher | Runs the Remotion dev server and render pipeline | [nodejs.org](https://nodejs.org) |
| **npm** | v9 or higher | Installs all project dependencies (comes with Node.js) | Included with Node |
| **FFmpeg** | Any recent version | Encodes rendered frames into MP4/WebM/GIF | [ffmpeg.org](https://ffmpeg.org/download.html) |
| **Git** | Any | Clone this repository | [git-scm.com](https://git-scm.com) |

### Check if you already have them

```bash
node -v          # should print v18.x or higher
npm -v           # should print v9.x or higher
ffmpeg -version  # should print FFmpeg version info
git --version    # should print git version info
```

> **Note:** FFmpeg is automatically bundled inside Remotion for rendering — but having it installed globally improves compatibility. If `npm run dev` works but `render` fails, install FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html).

### What gets installed automatically via `npm install`

All JavaScript/TypeScript dependencies are handled for you — no manual installs beyond the four tools above:

| Package | Version | Purpose |
|---|---|---|
| `remotion` + `@remotion/cli` | 4.0.476 | Core video rendering framework |
| `react` + `react-dom` | 19.x | Component rendering engine |
| `d3-geo` | 3.x | Geographic projections for the globe animation |
| `topojson-client` | 3.x | Converts world map topology data to GeoJSON |
| `world-atlas` | 2.x | Real country boundary data at 50m resolution |
| `typescript` | 5.9 | Type safety across all components |
| `tailwindcss` | 4.x | Utility CSS (available for building new compositions) |

---

## 🛠️ How to Use This

### 1. Clone & Install

```bash
git clone https://github.com/swatimitra88/remotion-usage-in-claude.git
cd remotion-usage-in-claude
npm install
```

### 2. Preview in Remotion Studio

```bash
npm run dev
```

Opens a visual editor in your browser at `localhost:3000`. Scrub through frames, select compositions, and preview in real time — no rendering required.

### 3. Customize the Globe

Open `src/FlightGlobe.tsx` and update these two lines:

```tsx
const MUMBAI: [number, number] = [72.8777, 18.9402];   // ← your departure city [lon, lat]
const NEW_YORK: [number, number] = [-74.006, 40.7128]; // ← your destination city [lon, lat]
```

You can also update the info card text at the bottom of the file:

```tsx
{ label: "Distance", value: "12,556 km" },
{ label: "Flight Time", value: "~16 hrs" },
{ label: "Direction", value: "North Atlantic" },
```

### 4. Render to MP4

```bash
# Render the flight globe to MP4
npx remotion render FlightGlobe

# Render as GIF (great for social media previews)
npx remotion render FlightGlobe --codec=gif

# Export a single frame as PNG (for thumbnails)
npx remotion still FlightGlobe --frame=135

# Render at a specific quality
npx remotion render FlightGlobe --crf=18
```

---

## 🧱 Tech Stack

| Technology | Role |
|---|---|
| [Remotion 4.x](https://remotion.dev) | React-based video rendering framework — turns React components into MP4 |
| React 19 + TypeScript | Writing animation components with full type safety |
| [d3-geo](https://d3js.org/d3-geo) | Accurate geographic projections (orthographic globe) |
| [topojson-client](https://github.com/topojson/topojson-client) | Converting compressed world topology to renderable GeoJSON |
| [world-atlas](https://github.com/topojson/world-atlas) | Real country + continent boundary data (50m resolution) |
| [Claude AI](https://anthropic.com) | AI pair programmer — wrote every component from plain-English descriptions |
| FFmpeg (via Remotion) | Encodes frames into MP4, WebM, or GIF |

---

## 📁 Project Structure

```
remotion-usage-in-claude/
├── src/
│   ├── Root.tsx              # Registers all video compositions
│   ├── FlightGlobe.tsx       # 🌍 Animated Flight Globe — the main example
│   ├── index.ts              # Entry point
│   └── index.css             # Global styles
├── public/                   # Drop your images, audio, video clips here
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗺️ Roadmap — What's Coming

These compositions are planned for future releases:

| Composition | Description | Good for |
|---|---|---|
| `HistoricalTimeline` | Scrolling animated events timeline | History / documentary channels |
| `KenBurnsSlideshow` | Pan + zoom on photos with smooth transitions | Photo montages, memory videos |
| `LowerThird` | Reusable name / location bar overlay | Any YouTube content |
| `EpisodeIntro` | Full animated channel intro sequence | Series-style YouTube channels |
| `VintageFilm` | Film grain, sepia tone, scratches overlay | History / retro content |
| `PopulationCounter` | Animated stat counter (population, GDP, etc.) | Data / explainer content |
| `ThenVsNow` | Animated split-screen before/after comparison | History, renovation, tech channels |
| `BarChartRace` | Animated ranking bar chart from CSV data | Data journalism, rankings videos |
| `AudioWaveform` | Waveform visualizer synced to audio | Podcasts, music videos |

---

## 🤖 How Claude AI Was Used

Every component in this repo was written with **Claude AI** (Claude Sonnet 4.6) as the coding pair. The workflow:

1. Describe the video scene in plain English
2. Claude writes the full React/Remotion/TypeScript component
3. Preview in Remotion Studio, identify what needs fixing
4. Describe the fix — Claude updates the code
5. Repeat until the animation looks right → render to MP4

**The exact prompt that generated the FlightGlobe composition:**
> *"Create a Remotion composition showing a globe rotating from Mumbai to New York City. Use real country data from world-atlas, ocean in Google Maps blue, white countries with borders, a red dashed flight arc that draws as the globe rotates, Google Maps-style teardrop pins for both cities with drop shadow, and a smooth easeInOutCubic rotation. The Mumbai pin should fade out before going behind the globe. Add a star field background, a plane icon traveling the arc, and a flight info card at the bottom. 1920×1080, 30fps, 9 seconds."*

No video editing experience required. Just describe what you want.

---

## 📚 The Remotion Skill for Claude

This project was built using a reusable **`Remotion_skill`** — a comprehensive reference document for Claude AI covering:

- All Remotion APIs and hooks with ready-to-copy code examples
- 50+ use case templates organized by category (YouTube, data viz, travel, SaaS, motion graphics)
- Claude prompting rules and best practices for best results
- Animation patterns: fade, slide, spring, typewriter, counter, Ken Burns, stagger, SVG path draw

If you use Claude Code, you can load this skill in any project by typing `Remotion_skill` and Claude will automatically suggest the best Remotion use cases for your specific project.

---

## 🙏 Acknowledgements

- [Remotion](https://remotion.dev) by Jonny Burger — the incredible open-source framework making all of this possible
- [world-atlas](https://github.com/topojson/world-atlas) — free, accurate world map data
- [d3](https://d3js.org) — the gold standard library for geographic and data visualization
- [Claude AI](https://anthropic.com) — the AI pair programmer that wrote every line of animation code

---

## 📄 License

Remotion itself is **free for individuals and teams up to 3 people**, including commercial use.  
For teams of 4+, see [Remotion's licensing page](https://remotion.dev/license).

---

<div align="center">

**Built with Remotion + Claude AI**

*If this helped you, give it a ⭐ and share it with other creators!*

</div>
