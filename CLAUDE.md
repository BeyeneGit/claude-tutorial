# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite project using React 19.2.6 and a minimal setup for hot module replacement (HMR) with ESLint. The project uses a dual TypeScript configuration pattern with separate configs for application code and Vite build tooling.

## Commands

### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (runs TypeScript check then Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Running Tests
There are no test scripts configured in package.json. To run tests:
1. Add test scripts to package.json first, or
2. Use Vite's built-in testing: `npx vitest` (requires installing vitest)

## Project Structure

```
src/
  App.tsx          - Main application component with hero section and documentation links
  main.tsx         - React entry point, renders App in StrictMode
  index.css        - Global styles with CSS custom properties for theming
  App.css          - Application-specific styles
public/
  favicon.svg      - Site favicon
  icons.svg        - SVG sprites for social icons (GitHub, Discord, X, Bluesky)
  hero.png         - Hero image asset
assets/
  react.svg        - React logo
  vite.svg         - Vite logo
```

## Architecture

### Entry Points
- **src/main.tsx**: Bootstraps React, imports global styles via `./index.css`, renders `<App />` wrapped in `<StrictMode>`
- **index.html**: HTML shell with root div, loads main.tsx as ES module

### Styling Pattern
The CSS uses CSS custom properties (CSS variables) for theming:
- Light mode defaults in `:root`
- Dark mode via `@media (prefers-color-scheme: dark)`
- Variables include text colors, backgrounds, accent colors, shadows
- Layout constrained to 1126px width, auto-centered
- Hero section with framework logos and counter demo
- "Next steps" section with documentation and social media links

### Build Pipeline
- TypeScript compiled via `tsc -b` (project reference mode using tsconfig.app.json and tsconfig.node.json)
- Vite handles bundling with HMR for dev and production builds
- ESLint configured with standard React hooks and refresh plugins

## ESLint Configuration

Current config uses:
- `@eslint/js` - ESLint v10 recommended rules
- `typescript-eslint` - TypeScript-aware linting
- `eslint-plugin-react-hooks` - React hooks rules
- `eslint-plugin-react-refresh` - Vite-specific rules

For enhanced React linting in production, consider:
- `eslint-plugin-react-x` for additional React rules
- `eslint-plugin-react-dom` for DOM rules

## TypeScript Setup

Uses project reference TypeScript configuration:
- `tsconfig.json` - Root config
- `tsconfig.app.json` - Application source code
- `tsconfig.node.json` - Vite build tooling types

## CSS Architecture

- Uses CSS containment via `var(--sans)` and `var(--heading)` font families
- CSS custom properties for theming support
- Media queries at 1024px breakpoint for responsive typography
- SVG icons loaded from sprites in `/icons.svg`

## Common Tasks

### Edit and Hot Reload
- Modify `src/App.tsx` and `src/App.css` - changes appear in browser instantly via HMR
- Modify `src/index.css` - changes appear instantly
- HMR is enabled by default via Vite plugin

### Preview Production Build
1. Run `npm run build`
2. Run `npm run preview`
3. Open http://localhost:5173/

### Add New Component
1. Create component file in `src/` (e.g., `src/MyComponent.tsx`)
2. Import and use in `App.tsx`
3. Apply CSS classes to style it

### Add New Asset
1. Place images/SVGs in `src/assets/` for ES module imports
2. Place static assets (like favicon) in `public/`

### Enable TypeScript Strict Mode
Add to `tsconfig.app.json`:
```json
"compilerOptions": {
  "strict": true
}
```

## Dependencies Summary

### Runtime
- react 19.2.6
- react-dom 19.2.6

### Development
- vite 8.0.12
- @vitejs/plugin-react 6.0.1
- typescript 6.0.2
- eslint 10.3.0

### Type Definitions
- @types/react 19.2.14
- @types/react-dom 19.2.3
- @types/node 24.12.3
