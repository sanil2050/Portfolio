# Portfolio Project

This is a portfolio website built with Next.js, React, and Tailwind CSS. It features a modern design, responsive layouts, and a contact form with API integration.

## File Structure

```text
portfolio/
├── .git/                      # Git repository
├── .gitignore                 # Git ignore file
├── .next/                     # Next.js build output
├── components.json            # shadcn/ui configuration
├── jsconfig.json              # JavaScript configuration
├── next.config.mjs            # Next.js configuration
├── node_modules/              # Project dependencies
├── package.json               # NPM package configuration
├── package-lock.json          # NPM dependency tree lockfile
├── pnpm-lock.yaml             # pnpm lockfile
├── postcss.config.mjs         # PostCSS configuration
└── src/                       # Source code
    ├── app/                   # Next.js App Router
    │   ├── (pages)/           # Route group — no URL segment
    │   │   ├── about/
    │   │   │   └── page.jsx   # About page
    │   │   ├── contact/
    │   │   │   └── page.jsx   # Contact page
    │   │   ├── projects/
    │   │   │   └── page.jsx   # Projects page
    │   │   └── services/
    │   │       └── page.jsx   # Services page
    │   ├── api/
    │   │   └── contact/
    │   │       └── route.js   # Contact form API route
    │   ├── globals.css        # Global CSS styles
    │   ├── layout.jsx         # Root layout
    │   └── page.jsx           # Home page
    ├── components/            # Reusable React components
    │   ├── ui/                # shadcn/ui primitives (auto-generated)
    │   ├── layout/            # Structural/chrome components
    │   │   ├── navbar.jsx
    │   │   └── footer.jsx
    │   ├── sections/          # Full-page sections (used in pages)
    │   │   ├── hero-section.jsx
    │   │   ├── featured-projects.jsx
    │   │   ├── projects-section.jsx
    │   │   ├── student-highlights.jsx
    │   │   ├── smart-insights.jsx
    │   │   ├── logo-roll.jsx
    │   │   └── contact-cta.jsx
    │   └── shared/            # Reusable cross-section components
    │       ├── custom-select.jsx
    │       └── theme-provider.jsx
    ├── hooks/                 # Custom React hooks
    │   ├── use-mobile.js
    │   └── use-toast.js
    └── lib/                   # Utility functions and configurations
        ├── site.js
        └── utils.js
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
