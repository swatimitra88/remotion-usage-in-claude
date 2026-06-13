<div align="center">

# 🎬 Remotion Video Studio — AI Motion Graphics for YouTube

### Create cinematic, professional motion graphics entirely through code + AI.
### No After Effects. No subscriptions. No design skills needed.

[![Remotion](https://img.shields.io/badge/Remotion-4.0-blue?style=flat-square)](https://remotion.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Claude AI](https://img.shields.io/badge/Claude-AI_Generated-orange?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-Free_for_teams_≤3-green?style=flat-square)](https://remotion.dev/license)

</div>

---

## 🌟 What Is This Project?

This is an **open-source motion graphics studio** that uses [Remotion](https://remotion.dev) (a React-based video framework) and **Claude AI** to create stunning, broadcast-quality video animations — entirely through code.

Whether you're a **YouTuber**, a **developer**, a **data journalist**, or a **content creator**, this project gives you a free, reusable library of video components you can customize and render into MP4 files for your own content.

**The idea is simple:**
- You describe what you want → Claude writes the React/Remotion code → Remotion renders it to MP4
- No timeline dragging. No keyframe hell. No expensive subscriptions.
- Every animation is code — so it's **version-controlled, reusable, and infinitely customizable**

---

## 🎯 Who Is This For?

| If you are... | This helps you... |
|---|---|
| **A YouTuber** | Create professional intros, title cards, lower thirds, and transitions without paying for After Effects |
| **A history/travel creator** | Get cinematic animated location reveals, globe animations, and era transitions |
| **A data journalist** | Animate bar charts, maps, counters, and infographics from real data |
| **A developer** | Learn how to build video programmatically with React and ship reusable video components |
| **A freelancer/agency** | Build a library of reusable motion graphic templates for clients |
| **A SaaS founder** | Generate personalized video content at scale for your users |
| **A beginner** | See real working examples of Remotion + AI and adapt them for your needs — zero video editing experience required |

---

## 🚀 Why This Matters

Traditional motion graphics require expensive tools (After Effects costs ~$55/month), years of expertise, and hours of manual keyframing for every video.

With **Remotion + Claude AI**:

✅ **Free** — Remotion is free for teams up to 3 people, including commercial use
✅ **Fast** — Describe what you want, Claude writes the code, preview instantly
✅ **Scalable** — One codebase can generate thousands of unique videos via JSON props
✅ **Version controlled** — All your animations live in Git, not a proprietary file format
✅ **Reusable** — Every component you build can be dropped into any future project
✅ **No experience needed** — If you can describe a video, Claude can write it

---

## ✨ What's Inside — Current Compositions

### 🏙️ 1. Cinematic Title Card (`MyComp`)
*Perfect for: History channels, travel vlogs, documentary-style YouTube, episode intros*

A dramatic, cinematic animated title sequence — the kind you'd see on Netflix or BBC historical documentaries.

**What it animates:**
- Location tag slides in from below ("United States of America")
- Large city name fades and rises ("New York City")
- Gold art-deco divider line draws itself from center outward
- Year appears in italic gold ("1905")
- Channel name fades in last

**Why it helps you:**
> Instead of spending 2 hours in After Effects building an intro, you describe it in plain English and get production-quality code in minutes. Change the city, year, colors, and fonts in seconds — and render a new version instantly.

**Specs:** 1920×1080 · 30fps · 5 seconds · Renders to MP4

---

### 🌍 2. Animated Flight Globe (`FlightGlobe`)
*Perfect for: Travel vlogs, geography content, international news explainers, route reveals*

A photorealistic animated globe showing a flight route between any two cities in the world — with real country borders, ocean colors, and smooth rotation.

**What it animates:**
- Space background with star field fades in
- Globe appears centered on departure city
- Origin city pin pulses with city label (Google Maps style)
- Globe rotates smoothly as flight arc draws itself in real time
- Plane icon flies along the great-circle route
- Destination city pin and label appear on arrival
- Info card slides up: Distance · Flight Time · Direction

**Why it helps you:**
> Travel YouTubers, geography educators, and news channels pay thousands for animated globe graphics. This gives you the same quality for free — and you can change the cities, colors, and route in under 60 seconds. Replace Mumbai/NYC with any two coordinates and re-render.

**Specs:** 1920×1080 · 30fps · 9 seconds · Renders to MP4

**Technical highlights:**
- Real world geography from `world-atlas` (50m resolution country data)
- `d3-geo` orthographic projection — geographically accurate globe
- Correct hemisphere clipping — flight arc never bleeds through the back of the globe
- Great-circle routing (the actual shortest flight path)
- Smooth eased rotation (`easeInOutCubic`)

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
node -v        # should print v18.x or higher
npm -v         # should print v9.x or higher
ffmpeg -version  # should print FFmpeg version info
git --version  # should print git version info
```

> **Note:** FFmpeg is automatically bundled inside Remotion for rendering — but having it installed globally improves compatibility. If `npm run dev` works but `render` fails, install FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html).

### What gets installed automatically via `npm install`

All JavaScript/TypeScript dependencies are handled for you — no manual installs needed beyond the table above:

| Package | Version | Purpose |
|---|---|---|
| `remotion` + `@remotion/cli` | 4.0.476 | Core video rendering framework |
| `react` + `react-dom` | 19.x | Component rendering engine |
| `d3-geo` | 3.x | Geographic projections for the globe |
| `topojson-client` | 3.x | Converts world map data to GeoJSON |
| `world-atlas` | 2.x | Real country boundary data (50m resolution) |
| `typescript` | 5.9 | Type safety for all components |
| `tailwindcss` | 4.x | Utility CSS (available for custom compositions) |

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
Opens a visual editor in your browser. Scrub through frames, select compositions, preview in real time.

### 3. Customize
Open `src/FlightGlobe.tsx` and change:
```tsx
const MUMBAI: [number, number] = [72.8777, 18.9402];   // ← your departure city
const NEW_YORK: [number, number] = [-74.006, 40.7128];  // ← your destination city
```

Open `src/Composition.tsx` and change:
```tsx
// Change "New York City", "1905", "United States of America" to your content
```

### 4. Render to MP4
```bash
# Render title card
npx remotion render MyComp

# Render flight globe
npx remotion render FlightGlobe

# Render as GIF (for social media)
npx remotion render FlightGlobe --codec=gif

# Export a single frame as PNG (thumbnail)
npx remotion still FlightGlobe --frame=135
```

---

## 🧱 Tech Stack

| Technology | Role |
|---|---|
| [Remotion 4.x](https://remotion.dev) | React-based video rendering framework |
| React 19 + TypeScript | Writing animation components |
| [d3-geo](https://d3js.org) | Accurate geographic projections for globe |
| [topojson-client](https://github.com/topojson/topojson-client) | Converting world map data to GeoJSON |
| [world-atlas](https://github.com/topojson/world-atlas) | Real country + continent boundary data |
| [Claude AI](https://anthropic.com) | AI code generation for all components |
| FFmpeg (via Remotion) | Encoding frames to MP4 |

---

## 📁 Project Structure

```
remotion/
├── src/
│   ├── Root.tsx              # Registers all video compositions
│   ├── Composition.tsx       # 🏙️ NYC Cinematic Title Card
│   ├── FlightGlobe.tsx       # 🌍 Animated Flight Globe
│   ├── index.ts              # Entry point
│   └── index.css             # Global styles
├── public/                   # Drop your images, audio, video clips here
├── package.json
├── tsconfig.json
├── SESSION_BACKUP.md         # Full development session log
└── README.md
```

---

## 🗺️ Roadmap — What's Coming

These compositions are planned for future releases:

| Composition | Description |
|---|---|
| `HistoricalTimeline` | Scrolling animated events timeline |
| `KenBurnsSlideshow` | Photo pan+zoom effect for historical images |
| `LowerThird` | Reusable location/name bar template |
| `EpisodeIntro` | Full channel intro sequence |
| `VintageFilm` | Film grain + sepia + scratches overlay |
| `PopulationCounter` | Animated stat counter (population, GDP, etc.) |
| `ThenVsNow` | Split-screen before/after comparison |
| `BarChartRace` | Animated ranking bar chart from CSV data |
| `AudioWaveform` | Waveform visualizer synced to audio |

---

## 🤖 How Claude AI Was Used

Every component in this repo was written with **Claude AI** (Claude Sonnet 4.6) as the coding pair. The workflow:

1. Describe the video scene in plain English
2. Claude writes the full React/Remotion/TypeScript component
3. Preview in Remotion Studio, identify issues
4. Describe the fix — Claude updates the code
5. Repeat until perfect → render MP4

**Example prompt that generated FlightGlobe:**
> *"Create a Remotion composition showing a globe rotating from Mumbai to New York City. Use real country data from world-atlas, ocean in Google Maps blue, white countries with borders, a red dashed flight arc that draws as the globe rotates, Google Maps-style teardrop pins for both cities, and a smooth easeInOutCubic rotation. 1920x1080, 30fps, 9 seconds."*

No video editing experience required. Just describe what you want.

---

## 📚 The Remotion_skill

This project was built using a reusable **`Remotion_skill`** — a comprehensive AI reference document covering:
- All Remotion APIs and hooks with code examples
- 50+ ready-to-use animation templates organized by category
- Claude prompting rules for best results
- Animation patterns: fade, slide, spring, typewriter, counter, Ken Burns, stagger, SVG draw

If you use Claude Code, you can load this skill in any project by typing `Remotion_skill`.

---

## 🙏 Acknowledgements

- [Remotion](https://remotion.dev) by Jonny Burger — the incredible framework making all of this possible
- [Chloe VS History](https://www.youtube.com/@ChloeVSHistory) — inspiration for what AI-powered history content can look like
- [world-atlas](https://github.com/topojson/world-atlas) — beautiful free world map data
- [d3](https://d3js.org) — the gold standard for data visualization

---

## 📄 License

This project is **UNLICENSED** (private use).

Remotion itself is **free for individuals and teams up to 3 people**, including commercial use.
For teams of 4+, see [Remotion's licensing](https://remotion.dev/license).

---

<div align="center">

**Built with ❤️ using Remotion + Claude AI**

*If this helped you, give it a ⭐ and share it with other creators!*

</div>
