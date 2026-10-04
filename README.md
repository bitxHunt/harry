# Thiha Swan Htet (Harry) · Portfolio

Personal site, styled like an Arch Linux desktop seen through a hologram. Each section is a
familiar terminal tool: `whoami` (hero), `fastfetch` (about), `git log` (experience),
`yazi` (projects), `htop` (stack), `systemctl` (life outside work) and `mail` (contact).

- **Hero:** a 3D particle hologram (three.js). Pick a form and the particles break apart and
  re-form: black hole (harry), Tux the penguin (dev), infinity loop (ops), bridge (pm),
  lightbulb (tutor), heart (care), 8-ball (pool).
- **Keyboard** (applies to the section on screen): ← → switch forms in the hero; `j` / `k`
  move through lists; in About, `h` / `l` change the theme; in Stack, `/` or F3 searches and F6
  changes the sort.
- **Themes:** click a colour block in the fastfetch panel: shwe (gold), holo, Catppuccin Mocha,
  Catppuccin Latte (light), Rosé Pine, Tokyo Night, Decay Green, mono. Without a saved choice
  the site follows the device: Latte in light mode, gold in dark mode.

## Stack

| Part   | Tech |
|--------|------|
| client | React 19, TanStack Router + Query, Tailwind CSS 4, three.js, react-hook-form + zod, Vite |
| server | Express 5, Prisma (PostgreSQL), Resend for email, zod |
| deploy | Vercel (client) |

## Run it locally

```bash
# client (http://localhost:3000)
cd client
pnpm install
echo "VITE_DEV_API_URL=http://localhost:5000/api" > .env
pnpm dev

# server (contact form + newsletter)
cd server
pnpm install
pnpm dev
```

The server reads these from `server/.env`: `PORT`, `APP_URL`, `DATABASE_URL`,
`SENDER_EMAIL`, `SENDER_SOURCE`, `RESEND_API_KEY` (validated in `src/config/env.ts`).

## Where things live (client/src)

```
data/                 all site content, one file per topic. Edit text here, not in components.
  profile.ts          name, links, status, fastfetch lines, the Myanmar touches flag (culture.myanmar)
  experience.ts       roles (git log) and education
  forms.ts            hero forms: names, taglines, powers, origin, known for
  projects.ts         projects (yazi browser); their tags also feed the htop view
  stack.ts            technology groups (htop meters)
  off-clock.ts        hobbies as systemd services
  articles.ts         article previews

components/
  home/               one file per homepage section (hero, about, experience, projects, skills, off-clock, articles, contact)
                      + theme-blocks.tsx (the fastfetch colour blocks / theme switch)
  hologram/           the 3D hero: React wrapper, three.js scene, particle shape builders
  terminal/           shared TUI pieces: terminal window, section heading, form field
  effects/            site-wide visuals: cursor, scroll rail, starfield background
  layout/             header, footer, loading screen
  articles/           full article pages
  ui/                 the few shadcn components the article pages still use

hooks/                reveal-on-scroll, text scramble, section keyboard shortcuts, SGT clock
lib/
  theme.ts            theme list, default (follows the device), apply / cycle, live accent colours
  tech-usage.ts       builds the htop rows from data/ (which tech was used where, and %USE)
  api-client.ts       axios instance for the contact + newsletter API
  utils.ts            class-name helper
routes/               TanStack file routes (/, /articles, /articles/$slug)
styles/index.css      design tokens, themes, fonts, animations
```

### Common edits

- **Change text:** edit the matching file in `data/`.
- **Add a project:** add an entry to `data/projects.ts`. Its `tags` automatically show up in htop.
- **Add a hero form:** add it to `data/forms.ts`, then add a shape for its id in
  `components/hologram/hologram-shapes.ts`.
- **Remove the Burmese touches:** set `culture.myanmar` to `false` in `data/profile.ts`.
- **Add or change a theme:** add an `html[data-accent="id"]` block in `styles/index.css`, add it to
  `THEMES` in `lib/theme.ts`, and add its id + mode to the small script in `index.html`
  (it applies the saved theme before first paint).

## Performance notes

- three.js loads only after the first paint (dynamic import on idle), pauses when off-screen,
  and falls back to a static glow without WebGL.
- Fonts are self-hosted and Latin-only. The Burmese font downloads only when Burmese text renders.
- The starfield, reveals and section animations are CSS-only. The cursor trail canvas stops when the mouse is still.
- Everything decorative respects `prefers-reduced-motion`. The cursor and scroll rail are mouse-only.
