# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Runs Next.js dev server with SSR
- **Build for production**: `npm run build` - Creates static export in `out/` directory  
- **Start production server**: `npm start` - Serves the built application
- **Run tests**: `npm test` - Runs unit tests using Vitest

## Architecture Overview

This is a React 18 application for bhguides.com, a community resource for Bit Heroes guides and game calculators. It's built with Next.js and shipped as a static export (`next build` writes to `out/`); the dev server renders pages on the fly, but there's no Node server in production.

### Tech Stack
- **Frontend Framework**: React 18 with Material-UI v6
- **Build Tool**: Next.js 15 with static export (`output: 'export'` in `next.config.js`)
- **State Management**: No Redux — a single React Context (`src/context/theme.jsx`) for dark/light theme, plus local component state (`useState`/`useMemo`) and statically-imported JSON for everything else
- **Routing**: Next.js Pages Router (file-based routing), including catch-all `[[...tab]].js` routes for tabbed calculator pages
- **Styling**: CSS Modules + Material-UI components
- **Testing**: Vitest
- **Markdown Support**: react-markdown v9

### Key Application Structure

**Main App Flow**:
- `pages/_app.js` - Root component: sets up the MUI theme (driven by `ThemeContext`), renders `HashRedirect`, `Header`, page content, and `Footer`
- `pages/index.js` - Home page that renders the Guides component
- File-based routing with individual pages for each route
- Tabbed sections (`boost-calcs`, `eggs`, `familiar-calc`) use a catch-all route (e.g. `pages/boost-calcs/[[...tab]].js`) with `getStaticPaths`/`getStaticProps` to pre-render each tab as a static page, since the site is a static export
- Legacy URLs redirect client-side: `pages/item-find.js` → `/boost-calcs`, `pages/rng-me.js` → `/eggs`
- Per-route `<title>`/meta tags are set via `updatePageMeta()` in `src/utils/seo.js`, called from each page's `useEffect`
- `public/changelog.json` is generated at `predev`/`prebuild` time by `scripts/gen-changelog.mjs`, which reads `git log` — it's build output, not checked-in data

**Major Feature Components** (`src/components/`):
- `Guides/` - Main guides browser with search, lightbox, markdown/HTML rendering, and deep-linkable anchors
- `BoostCalcs/` + `Familiars/` - Tabbed wrapper components (used by the catch-all routes above) that switch between sibling calculators via `Subheader`
- `ItemFind/` - Simple and standard item-find calculators
- `CaptureRate/` - Capture rate calculator
- `Experience/` - Experience calculator
- `FamiliarCalc/` - Familiar stats and persuade calculators
- `Eggs/` - Egg cracker and accessory chest calculator, with `StreakChart/` for lucky/unlucky streak visualization
- `TurnRateCalc/` - Turn rate calculation tool
- `Changelog/` - Renders `public/changelog.json`
- `About/` - Credits and acknowledgments
- `Header/` / `Footer/` / `Subheader/` - Navigation chrome
- `ThemeToggle/` - Dark/light theme switching component (reads/writes `ThemeContext`)
- `HashRedirect/` - One-time redirect for legacy hash-router URLs (e.g. `#/item-find`) from an older version of the site, mapping them to today's routes
- `ItemFindCapRateWrapper/` - Shared layout/CSS wrapper for the boost-calc tab pages

### Data Sources

**Static JSON Files** in `src/redux/`:
- `guides.json` - All guide metadata, categories, and file references
- `familiars.json` - Familiar stats for calculator
- `calcOptions.json` - Calculator configuration options

(The folder is named `redux` from when the app used Redux for state; it now just holds static data imported directly by components.)

**Public Assets**:
- `public/guide-files/` - Guide images, PDFs, videos, and markdown/HTML files
- `public/changelog.json` - Generated build output (see above), not hand-edited

### Adding New Guides

1. Scan files with antivirus, add to `public/guide-files/` following naming conventions
2. Add guide entry to `src/redux/guides.json` with metadata (build, familiars, etc.)
3. Add author credit to `src/components/Guides/index.jsx`

The guides system includes custom in-memory search indexing that processes guide metadata at page load for fast filtering.

Each guide is deep-linkable: clicking a guide title (or the copy icon shown on hover, desktop only) copies a `#<anchor>` link, and visiting that link scrolls to the guide. The attachment viewers (image lightbox, video, markdown, and HTML modals) also show a share icon that copies the same link. Anchors come from each guide's `slug` in `guides.json`, which is conventionally `<category-id>-<name-slug>` (e.g. `t08d4-crows-pic-guide`). The slug keeps the link stable across renames. If a guide has no `slug`, the anchor falls back to `<category-id>-<name-slug>` derived at render time.

### Component Patterns

- CSS Modules for component-specific styling (`*.module.css`)
- Material-UI components with dark/light theme (`ThemeContext` + `useTheme()`) throughout
- Local component state (`useState`) and static JSON imports for data — no global store
- Custom lightbox and markdown/HTML rendering components
- Modular component structure with dedicated folders

Guide status badges (in-tier, obsolete) in `Guides/index.jsx` render both a text pill and a MUI icon; CSS shows the pill on desktop and swaps to the icon under the `max-width: 1000px` media query. MUI injects its own `MuiSvgIcon-root` class after CSS Modules styles with equal specificity, so a bare `.icon-class { display: none }` loses to MUI's `display: inline-block` regardless of media query — qualify these icon selectors with the element type (e.g. `svg.in-tier-icon`) to win on specificity instead of source order.

### Testing

Limited test coverage currently exists: `src/utils/utils.spec.js` covers calculator utilities, and `src/redux/guidesSlice.spec.js` covers the guide-name natural-sort helper (the filename is a holdover from the pre-Context Redux days — there is no slice there anymore).