# Portfolio v2 — Spec

## Concept & Vision
A dark, premium portfolio that feels like a high-end product page from a top-tier design agency. Deep blacks with neon cyan accents, cinematic scroll-driven animations, and live GitHub/LinkedIn data. The experience should feel alive — elements reveal themselves as you scroll, the background responds subtly to movement, and every interaction has tactile feedback.

## Design Language

### Aesthetic
Inspired by: Linear.app meets Vercel's dark mode — sleek, dark, purposeful. Premium without being gaudy.

### Color Palette
- Background: `#050505` (near black)
- Surface: `#0a0a0a` / `#111111`
- Border: `#1a1a1a`
- Primary: `#4DD9D9` (neon cyan/teal)
- Accent: `#00ff88` (electric green for highlights)
- Text Primary: `#fafafa`
- Text Muted: `#666666`
- Glow: `rgba(77, 217, 217, 0.15)`

### Typography
- Font: `Inter` for body, `JetBrains Mono` for code/accents
- Headings: Massive, tight tracking (`-0.04em`)
- Labels: Uppercase, wide letter-spacing (`0.2em`), monospace

### Motion Philosophy
Every section reveals via scroll — nothing is static. Animations use spring physics (stiffness 300, damping 30). Parallax depth on background elements. Magnetic hover effects on interactive elements. Smooth scroll-linked progress.

### Visual Assets
- Icons: Lucide React (consistent stroke weight)
- 3D: Three.js via React Three Fiber (floating particles/geometry in hero)
- GitHub/LinkedIn: Live API data with skeleton loading states

## Layout & Structure

1. **Hero** — Full viewport, name + animated subtitle, 3D particle background, scroll indicator
2. **GitHub Live Stats** — Streak, contribution graph summary, top repos (fetched live)
3. **About** — Bio, location, education cards, animated stat counters
4. **Experience** — Vertical timeline with animated progress line, company cards
5. **Skills** — Category tabs with animated progress bars
6. **Projects** — Bento grid with tilt-on-hover cards, live GitHub repo data
7. **LinkedIn** — Profile summary, connection count, live data
8. **Contact** — Minimal form with magnetic button
9. **Footer** — Social links, copyright

### Responsive Strategy
Mobile-first. Single column on mobile, multi-column on desktop. Nav collapses to floating dock on desktop, bottom bar on mobile.

## Features & Interactions

### GitHub Integration (Live)
- Fetch from `api.github.com/users/prajwal2308` — avatar, name, bio, public repos, followers
- Top 6 repos sorted by stars, fetched via `api.github.com/users/prajwal2308/repos?sort=stars&per_page=6`
- Contribution streak and stats
- Data cached with ISR (revalidate every hour)
- Graceful fallback to static data if API rate limited

### LinkedIn Integration (Simulated)
- Since LinkedIn OAuth is complex, we display the profile info from resume + a styled LinkedIn card
- Link to actual LinkedIn profile for full data

### Scroll Animations (Framer Motion)
- **Parallax**: Background elements move at different speeds
- **Reveal**: Sections fade + slide up with blur clearing on scroll-into-view
- **Stagger**: Child elements animate in sequence
- **Tilt**: Project cards tilt based on mouse position
- **Magnetic**: Buttons subtly follow cursor
- **Text scramble**: Hero subtitle cycles through characters
- **Counter**: Stats count up when visible
- **Progress line**: Timeline line draws as you scroll
- **Floating dock**: Section indicators appear after scroll threshold

### Interactions
- Hover: Cards lift with glow border, buttons have magnetic pull
- Click: Smooth scroll to section
- Form: Magnetic submit button, success animation
- 404: Custom not-found page

## Component Inventory

### Navigation
- Transparent on hero, frosted glass on scroll
- Logo (name initials), section links, GitHub/LinkedIn icons
- Mobile: bottom tab bar

### HeroSection
- 3D particle field (React Three Fiber)
- Massive name typography with gradient
- Typing effect subtitle
- CTA buttons with magnetic hover
- Social icon buttons

### GitHubStats
- Contribution streak card
- Top repositories bento cards (tilt + glow)
- Language distribution bar
- Stars + forks counts

### TimelineCard
- Company logo placeholder, role, period
- Animated border glow for current role
- Tech stack pills
- Expandable bullet points

### SkillBar
- Animated fill on view
- Percentage label
- Hover lift effect

### ProjectCard (Bento)
- Tilt on hover (3D transform)
- Glare effect following cursor
- GitHub link, live link
- Tech stack pills
- Featured badge for important projects

### ContactForm
- Name, email, message fields
- Magnetic submit button
- Success animation on submit

## Technical Approach

### Stack
- Next.js 15 (App Router)
- TypeScript
- Framer Motion 11
- React Three Fiber + Drei (3D)
- Tailwind CSS 4
- Shadcn UI components
- Lucide React icons

### Architecture
- Client components for all animation-heavy sections
- Server components for static data
- API routes for GitHub proxy (to handle CORS + rate limits)
- ISR for GitHub data (revalidate: 3600)

### API Routes
- `GET /api/github` — Proxied GitHub API (user info + repos)
- `GET /api/github/[username]/repos` — Specific user repos

### Performance
- Dynamic imports for Three.js (no SSR)
- Image optimization for avatar
- Font subsetting
- Skeleton loaders during data fetch
