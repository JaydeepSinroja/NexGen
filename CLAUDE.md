## Overview
- Single-page marketing site built with Vite + React 18 + TypeScript and styled with Tailwind CSS/shadcn-ui. Animations and interactions rely heavily on Framer Motion.
- Landing experience is fully client-side: `main.tsx` mounts `App`, which wraps React Query, tooltip, toaster providers, and a `BrowserRouter` with routes for `/` and a `*` catch-all (`NotFound`).
- The home page (`/`) is assembled from section components: `Header`, `HeroSection`, `ServicesSection`, `WhyChooseUs`, `PortfolioSection`, `ContactSection`, and `Footer`. Navigation uses in-page anchors (`#home`, `#services`, `#portfolio`, `#contact`).
- UI primitives live in `src/components/ui/` (shadcn-style buttons, cards, dialogs, etc.) with utility helpers in `src/lib/utils.ts`. Global styling/theme tokens are defined in `src/index.css` and `tailwind.config.ts`.

## Getting Started
- Install: `npm install`
- Develop: `npm run dev` (Vite, default port 5173 unless overridden)
- Lint: `npm run lint`
- Build: `npm run build` (use `npm run build:dev` for dev mode) and preview with `npm run preview`

## Project Structure
- `src/main.tsx` – React entry; imports global styles and renders `App`.
- `src/App.tsx` – Sets up providers (`QueryClientProvider`, `TooltipProvider`, `Toaster`/`Sonner`) and routes.
- `src/pages/Index.tsx` – Composes the landing sections; all navigation anchors terminate here.
- `src/pages/NotFound.tsx` – Simple 404 page logging the missing path to console.
- `src/components/` – Page sections and supporting pieces:
  - `Header` – Sticky header with mobile menu, CTA button, and smooth scroll anchors; Framer Motion animations.
  - `HeroSection` – Hero card with CTA buttons, stats, animated badge, and a Spline 3D scene (`@splinetool/react-spline`).
  - `ServicesSection`, `WhyChooseUs`, `PortfolioSection`, `ContactSection`, `Footer` – Thematic content blocks with motion/hover effects and gradients. Contact form simulates submission, shows toasts, and resets after a delay; replace the simulated promise with real API wiring as needed.
  - `NavLink.tsx` – React Router compatible wrapper that keeps `activeClassName`/`pendingClassName` ergonomics.
- `src/components/ui/` – Generated shadcn UI primitives (accordion, dialog, button, card, tooltip, toast, etc.) plus custom helpers (`spotlight`, `splite` Spline wrapper, etc.).
- `src/hooks/` – `use-toast` (toast helper) and `use-mobile` (mobile viewport detection).
- `src/index.css` – Tailwind layers, HSL design tokens, gradients, glow utilities, and animation keyframes.
- `tailwind.config.ts` – Tailwind setup, color tokens mapped to CSS vars, container sizing, custom animations/backgrounds, and shadcn plugin.

## Styling & Design System
- Tailwind with CSS variables declared in `:root` for colors, radii, gradients, and glow effects. Dark mode via `class` strategy.
- Utility classes like `glass`, `gradient-text`, `hover-lift`, `animate-gradient`, etc., centralize visual treatments.
- Components often expect `variant` props (e.g., `Button` variants `glow`, `hero`, `hero-outline`) defined in `src/components/ui/button.tsx`.

## Data & State Notes
- No backend calls are wired today. The contact form currently fakes submission with a timeout and uses `toast` for feedback; integrate with an API or email service to make it functional.
- React Query is configured but unused beyond provider setup—available for future data fetching.
- Images in `PortfolioSection` are remote Unsplash links; replace with hosted assets if needed for production stability.

## Routing & Navigation
- Routes are defined in `App.tsx`; add new pages by placing components under `src/pages/` and extending `<Routes>`.
- Existing navigation uses anchor links; if you add new sections, ensure matching `id` attributes on the target sections.
- Keep `NotFound` as the last `Route` to preserve the catch-all behavior.

## Working on UI Components
- Follow shadcn patterns: import primitives from `src/components/ui/*` and compose with Tailwind utility classes.
- Shared helpers: `cn` from `src/lib/utils.ts` for class merging; `NavLink` wrapper for router-aware styling.
- For animation consistency, prefer Framer Motion variants as used in sections; consider `useInView` for scroll-triggered reveals.

## Common Tasks
- Add a new section to the landing page: create it under `src/components/`, then import and place it inside `Index.tsx` in the desired order; wire a `#anchor` if it should be navigable from the header/footer.
- Connect the contact form: swap the simulated `setTimeout` in `ContactSection` with an async call, handle errors, and surface status via `toast`.
- Update theming: adjust CSS variables in `src/index.css` for brand colors and gradients; Tailwind tokens map directly to these vars.

## Testing & Quality
- No automated tests are present. Run `npm run lint` after changes.
- Manual QA focus: responsive layout (header/menu, grids), animation performance, anchor scrolling, form validation/submission paths, and third-party embeds (Spline) loading.

















