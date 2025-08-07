# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` - Runs Vite dev server
- **Build for production**: `npm run build` - Creates production build in `build/` directory  
- **Preview production build**: `npm run serve` - Serves the built application locally
- **Run tests**: `npm test` - Runs unit tests using Vitest

## Architecture Overview

This is a React 18 single-page application for bhguides.com, a community resource for Beat Hazard guides, videos, and game calculators.

### Tech Stack
- **Frontend Framework**: React 18 with Material-UI v6
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router (HashRouter)
- **Styling**: CSS Modules + Material-UI components
- **Testing**: Vitest

### Key Application Structure

**Main App Flow**:
- `src/App.jsx` - Root component with Material-UI dark theme setup
- `src/components/Home/index.jsx` - Main router component with HashRouter
- Default route (`/`) renders the Guides component

**Redux Store** (`src/redux/store.js`):
- `calc` - Calculator options and state
- `gallery` - Photo gallery state  
- `guides` - Game guides data and search functionality
- `videos` - Video content management

**Major Feature Components**:
- `Guides/` - Main guides browser with search, lightbox, and markdown rendering
- `Tools/` - Item find calculators (capture rate, standard IF, simple IF)
- `TurnRateCalc/` - Turn rate calculation tool
- `FamiliarCalc/` - Familiar damage calculator  
- `RNGME/` - Random number generation utility
- `Video/` - Video player with HLS streaming support

### Data Sources

**Static JSON Files** in `src/redux/`:
- `guides.json` - All guide metadata, categories, and file references
- `familiars.json` - Familiar stats for calculator
- `calcOptions.json` - Calculator configuration options
- `gallery.json` - Photo gallery metadata
- `videos.json` - Video metadata and streaming info

**Public Assets**:
- `public/guide-files/` - Guide images, PDFs, and markdown files
- `public/video/` - Video files with HLS streams for adaptive playback
- `public/screenshots/` - Categorized screenshots (bugs, drops, shop, other)

### Adding New Guides

1. Scan files with antivirus, add to `public/guide-files/` following naming conventions
2. Add guide entry to `src/redux/guides.json` with metadata (build, familiars, etc.)
3. Add author credit to `src/components/Guides/index.jsx`

The guides system includes custom in-memory search indexing that processes guide metadata at page load for fast filtering.

### Component Patterns

- CSS Modules for component-specific styling (`*.module.css`)
- Material-UI components with dark theme throughout
- Redux hooks (`useSelector`) for state access
- React Router HashLink for smooth scrolling navigation
- Custom lightbox and markdown rendering components

### Testing

Limited test coverage currently exists - main test file is `src/components/Tools/utils.spec.js` for calculator utilities.