# Remotion Video Studio — Theo Through Time

> Programmatic video creation using **Remotion + React + Claude AI**
> Built for the **Theo Through Time** YouTube channel — cinematic history & travel content

---

## What This Repo Does

This project uses [Remotion](https://www.remotion.dev/) to create **motion graphic video assets** entirely through code. Every animation is written in React/TypeScript and renders to a production-ready `.mp4` file.

Claude AI writes the code. Remotion renders it. No After Effects. No subscriptions.

---

## Features

### 🎬 Composition 1 — NYC Cinematic Title Card (`MyComp`)
A dramatic, cinematic animated title sequence for YouTube episodes.

**What it shows:**
- Dark cinematic background with radial vignette
- "United States of America" location tag fades in
- **"New York City"** slides up in large serif type
- Gold divider line expands from center
- **"1905"** fades in (italic gold)
- "Theo Through Time" channel name fades in last

**Animation features:**
- `interpolate()` for smooth fade + slide timing
- Warm gold color palette (`#c8a96e`, `#f5f0e8`)
- Sepia grain texture overlay for historical feel
- 1920×1080 @ 30fps — 5 seconds (150 frames)

---

### 🌍 Composition 2 — Flight Globe Animation (`FlightGlobe`)
A fully animated 3D globe showing the flight route from **Mumbai → New York City**.

**What it shows:**
- Rotating globe with real country borders and land masses
- Ocean in Google Maps-style blue gradient
- Countries in warm white with dark border lines
- Animated latitude/longitude graticule grid
- Star field space background
- Flight arc draws itself in real-time as globe rotates
- Dashed red flight path with glow effect
- Plane icon travels along the arc
- Google Maps-style teardrop location pins (red = Mumbai, blue = NYC)
- White label boxes with city name + country
- Smooth globe rotation — Mumbai slides back, NYC comes forward
- Bottom info card: Distance · Flight Time · Direction

**Technical features:**
- Real world geography from `world-atlas` (50m resolution)
- `d3-geo` orthographic projection with native hemisphere clipping
- `topojson-client` for country feature extraction
- `geoPath()` used for arc rendering — prevents back-face bleed
- `geoInterpolate()` for great-circle path (200 points)
- `easeInOutCubic` for buttery smooth globe rotation
- 1920×1080 @ 30fps — 9 seconds (270 frames)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Remotion 4.x](https://remotion.dev) | Video rendering framework |
| React 19 + TypeScript | Component authoring |
| `d3` + `d3-geo` | Geographic projections |
| `topojson-client` | Country border data processing |
| `world-atlas` | Real world map data (countries-50m) |
| Claude AI (Anthropic) | Code generation & iteration |
| FFmpeg (via Remotion) | Final MP4 rendering |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm v10+

### Install
```bash
git clone https://github.com/swatimitra88/remotion-theo-through-time.git
cd remotion-theo-through-time
npm install
```

### Preview in Remotion Studio
```bash
npm run dev
```
Opens the visual studio in your browser. Select a composition from the dropdown.

### Render to MP4
```bash
npx remotion render MyComp
npx remotion render FlightGlobe
npx remotion render FlightGlobe --codec=gif
npx remotion still FlightGlobe --frame=135
```

---

## Project Structure

```
remotion/
├── src/
│   ├── Root.tsx              # Registers all compositions
│   ├── Composition.tsx       # NYC Cinematic Title Card
│   ├── FlightGlobe.tsx       # Mumbai → NYC Flight Globe
│   ├── index.ts              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets (images, audio, video)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Remotion_skill

This project was built using the **`Remotion_skill`** AI reference — type `Remotion_skill` in any Claude session to load the full skill including all APIs, 50+ use cases, animation patterns, and prompting rules.

---

## Roadmap

- [ ] Historical timeline animation
- [ ] Ken Burns photo slideshow
- [ ] Lower thirds / location overlay templates
- [ ] Theo Through Time episode intro sequence
- [ ] Vintage film grain / sepia overlay
- [ ] NYC population growth bar chart
- [ ] Then vs Now split screen
- [ ] Audio waveform visualizer
- [ ] AWS Lambda batch rendering pipeline

---

## Channel

**Theo Through Time** — AI-generated history & travel YouTube channel.
Motion graphics built with Remotion. Cinematic scenes via PAI Pro (Utopai Studios) + Runway ML.

---

## License

UNLICENSED — Private project.
Remotion is free for teams up to 3 people (commercial use included).
