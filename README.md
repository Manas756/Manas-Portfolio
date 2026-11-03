# Manas Kapoor — Portfolio

A cinematic, scroll-driven portfolio. React 19 · Vite · Tailwind CSS v4 · Motion · GSAP (ScrollTrigger) · React Three Fiber.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages). No backend.

## Where things live

```
src/
  App.jsx                    intro → reveal → done phases, scroll lock
  components/
    IntroAnimation.jsx       black screen, skip on click/key, mobile + reduced-motion fallbacks
    IntroScene.jsx           R3F chrome MK monogram (lazy-loaded, unmounted after the intro)
    Navbar.jsx               floating pill; adapts to light/dark sections via data-nav
    Hero.jsx, RotatingText.jsx
    ProjectShowcase.jsx      index + five project panels + "lab" strip
    ProjectSection.jsx       sticky GSAP-scrubbed panel (desktop), stacked flow (mobile)
    mockups/                 per-project mockups driven by one 0→1 progress value
    About.jsx, SystemDiagram.jsx, Skills.jsx, Achievements.jsx, Resume.jsx, Contact.jsx, Footer.jsx
    ui/                      Button, RevealText, SectionLabel, MonogramMark, BrandIcons
  data/                      ALL site copy: profile, projects, achievements, skills, timeline
  lib/monogram.js            the MK shape, shared by the 3D intro, logo and favicon
  assets/projects/           screenshots of the live sites
public/resume/Manas_Kapoor_Resume.pdf
resume/
  resume.json                single source of truth for the résumé (edit this)
  build_resume.py            → PDF + DOCX + website preview image
  Manas_Kapoor_Resume.docx   editable version
```

## Updating the résumé

Edit `resume/resume.json`, then:

```bash
pip install reportlab python-docx pymupdf pillow
python resume/build_resume.py
```

It regenerates the PDF the site serves, the DOCX, and the preview image, and warns if it spills past one page.

## Placeholders to fill in

- `src/data/projects.js`: Chaitanya 2K26 GitHub link (shown as "coming soon"); CampusPulse repo link and full stack.
- Chaitanya's stack (Nuxt 3 / Vue 3 / Three.js / GSAP) was read from the live site's bundle. Confirm it.
