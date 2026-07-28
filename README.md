# Shrishail Hiremath — Cinematic Portfolio

> **AI & ML Engineer · Full Stack Developer**  
> A fullscreen, cinematic personal portfolio built with Next.js, Three.js, and GSAP.

---

## ✨ Live Demo

🔗 **[shrishail-hiremath.vercel.app](https://shrishail-hiremath.vercel.app)**

---

## 📸 Preview

| Section | Description |
|---|---|
| 🎬 **Hero** | Fullscreen split-layout video hero with Three.js bokeh particles |
| 💼 **Work** | Real GitHub project cards with per-project accent colors |
| 🧠 **Skills** | 6-group tech grid (AI/ML, Web, Data, Creative, Languages, Tools) |
| 👤 **About** | Bio, stats, and animated "Currently" status card |
| 🔗 **Footer** | Brand, navigation, social links, copyright |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router, React 19) | Core framework |
| **Three.js** | Ambient bokeh particle canvas with mouse parallax |
| **GSAP + ScrollTrigger** | Entrance animations & scroll-driven reveals |
| **CSS Modules** | Scoped styling — zero utility classes |
| **@fontsource** | Self-hosted Fraunces, Manrope, JetBrains Mono |

---

## 📁 Project Structure

```
cinematic-portfolio/
├── app/
│   ├── layout.js           # Root layout — font imports, metadata
│   ├── page.js             # Page composition (all sections)
│   └── globals.css         # Design tokens (CSS variables)
│
├── components/
│   ├── Navbar/             # Sticky nav — transparent → glass on scroll
│   ├── VideoIntro/         # Hero — split layout, video right, text left
│   ├── CinematicLayer/     # Three.js bokeh particle canvas
│   ├── WorkSection/        # Project cards linked to GitHub repos
│   ├── SkillsSection/      # 6-group skill grid with per-group accents
│   ├── AboutSection/       # Bio, stats grid, status card
│   └── Footer/             # Brand, nav links, social icons
│
├── public/
│   └── videos/
│       └── hero.mp4        # Your talking-head / intro video
│
└── next.config.mjs         # Next.js config (dev indicators disabled)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/shrishailhiremath2006/cinematic-portfolio.git
cd cinematic-portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 Swapping Your Video

Replace `public/videos/hero.mp4` with your own clip (keep the filename), or update `VIDEO_SRC` in `components/VideoIntro/VideoIntro.jsx`:

```js
const VIDEO_SRC = "/videos/your-video.mp4";
```

The same file feeds both the sharp foreground layer (right panel) and the full-bleed ambient blur background.

---

## 🎨 Customization

### Colors & Fonts
Edit CSS variables in `app/globals.css`:
```css
:root {
  --color-void: #0b0908;       /* Background */
  --color-ember: #ff8a3d;      /* Accent orange */
  --color-monitor: #5fb2ff;    /* Accent blue */
  --color-paper: #f4ede1;      /* Text */
}
```

### Personal Info
| What | Where |
|---|---|
| Name / eyebrow / role | `components/VideoIntro/VideoIntro.jsx` |
| Projects list | `components/WorkSection/WorkSection.jsx` → `PROJECTS` array |
| Skills | `components/SkillsSection/SkillsSection.jsx` → `SKILL_GROUPS` array |
| Bio / stats / location | `components/AboutSection/AboutSection.jsx` |
| Social links / email | `components/Footer/Footer.jsx` → `LINKS` array |
| Page title & meta | `app/layout.js` → `metadata` |

### Particle System
In `components/CinematicLayer/CinematicLayer.jsx`:
```jsx
<CinematicLayer particleCount={220} />  {/* increase for denser bokeh */}
```

---

## ☁️ Deployment (Vercel — Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo — Vercel auto-detects Next.js
4. Click **Deploy** — live URL in ~60 seconds

> ⚠️ Make sure `public/videos/hero.mp4` is committed to the repo so it deploys correctly.

---

## ♿ Accessibility & Performance

- Respects `prefers-reduced-motion` — GSAP animations collapse to near-instant, particle drift slows, scroll-line pulse disables
- All interactive controls are keyboard-focusable with visible focus rings
- Three.js scene capped at **1.75× pixel ratio**, uses `low-power` GPU preference, fully disposes geometry / material / texture / renderer on unmount
- Self-hosted fonts — no runtime dependency on Google Fonts CDN

---

## 📬 Contact

| Platform | Link |
|---|---|
| GitHub | [@shrishailhiremath2006](https://github.com/shrishailhiremath2006) |
| LinkedIn | [linkedin.com/in/shrishailhiremath](https://linkedin.com/in/shrishailhiremath) |
| Email | shrishailhiremath2006@gmail.com |

---

## 📄 License

MIT — feel free to fork and make it your own.
