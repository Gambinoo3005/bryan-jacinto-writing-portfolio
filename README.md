# Bryan Jacinto - Writing Portfolio

A modern, high-performance portfolio website showcasing copywriting, SEO content, and web development work. Built with Astro 5, this project features an interactive card-based interface, optimized mobile experience, and a comprehensive toolset showcase.

## Overview

This portfolio serves as a professional showcase for Bryan Jacinto's work as a copywriter, SEO content strategist, and aspiring web developer. The site emphasizes clean design, smooth interactions, and optimal performance across all devices.

## Key Features

### Interactive Experience Cards
- Card stack interface with swipe/click navigation through work experiences
- Smooth transitions with layered depth effects
- Mobile-optimized touch gestures with horizontal swipe detection
- Progressive text reveal animations

### Client Testimonials Carousel
- Auto-rotating testimonial showcase with manual controls
- Polished glass-morphism effects
- Keyboard navigation support (arrow keys)
- Responsive layout with optimized spacing

### Comprehensive Toolset Grid
- Organized display of professional tools across multiple categories:
  - AI & Writing Tools
  - SEO & Analytics
  - CMS & Web Platforms
  - Design & Creative
  - Email & Marketing Automation
  - Project Management
  - Presentation Tools
- Scroll-reveal animations for enhanced visual engagement
- Hover effects with depth and elevation

### Theme System
- Seamless dark/light mode toggle with optimized 300ms transitions
- Persistent theme preference via localStorage
- System preference detection on initial load
- Smooth color transitions without layout shift

### Content Management
- MDX-powered blog posts and case studies
- Type-safe content schemas with Zod validation
- Dynamic routing for articles and work samples
- Structured metadata for SEO optimization

### Performance Optimizations
- Static site generation for instant page loads
- Optimized asset delivery
- Minimal JavaScript footprint
- Hardware-accelerated CSS transitions
- Lazy-loaded images and components

### Mobile-First Responsive Design
- Strict uniform spacing system (4rem/3rem padding)
- Hero section viewport management
- Overlay-based mobile navigation (no content push)
- Touch-optimized interactive elements
- Pan-y scroll behavior for horizontal swipe components

## Tech Stack

### Core Technologies
- **Astro 5.13.8** - Static site generator with partial hydration
- **TypeScript** - Type-safe development environment
- **Tailwind CSS 4.1.13** - Utility-first CSS framework with custom design system
- **MDX 4.3.5** - Markdown with JSX support for rich content

### Additional Libraries
- **@tailwindcss/typography** - Prose styling for article content
- **@emailjs/browser** - Contact form integration
- **Zod** - Runtime type validation for content schemas

## Project Structure

```
bryan-jacinto-writing-portfolio/
├── public/
│   ├── toolset-icons/          # Tool and technology logos (42 icons)
│   ├── footer-icons/            # Technology badges
│   ├── Bryan_hero_image.webp    # Hero section image
│   ├── Bryan Jacinto - Resume.pdf
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Background.astro              # Animated background effects
│   │   ├── CardStack.astro               # Interactive experience cards
│   │   ├── ClientTestimonialCarousel.astro  # Testimonial slider
│   │   ├── Footer.astro                  # Site footer with tech badges
│   │   ├── Header.astro                  # Navigation and theme toggle
│   │   ├── InteractiveReadingExperience.astro  # Article reading interface
│   │   ├── SimpleWritingShowcase.astro   # Writing samples display
│   │   └── ToolsetGrid.astro             # Professional toolset showcase
│   ├── content/
│   │   ├── config.ts                     # Content collections schema
│   │   ├── posts/                        # Blog articles (MDX)
│   │   │   ├── aptean-aps-manufacturing-efficiency.mdx
│   │   │   ├── aptean-quoting-estimating-manufacturing.mdx
│   │   │   └── monok-affiliate-marketing-tracking.mdx
│   │   └── work/                         # Case studies (MDX)
│   │       └── aptean-erp-case-study.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro              # Root layout with meta tags
│   │   ├── BlogLayout.astro              # Article page layout
│   │   └── CaseStudyLayout.astro         # Case study page layout
│   ├── pages/
│   │   ├── index.astro                   # Homepage
│   │   ├── about.astro                   # About page
│   │   ├── contact.astro                 # Contact page with form
│   │   ├── articles/
│   │   │   ├── index.astro               # Articles listing
│   │   │   └── [slug].astro              # Dynamic article pages
│   │   └── work/
│   │       ├── index.astro               # Work portfolio listing
│   │       └── [slug].astro              # Dynamic case study pages
│   ├── styles/
│   │   └── global.css                    # Global styles and CSS variables
│   └── types/
│       └── emailjs.d.ts                  # EmailJS type definitions
├── astro.config.mjs                      # Astro configuration
├── tailwind.config.js                    # Tailwind configuration
├── tsconfig.json                         # TypeScript configuration
└── package.json                          # Project dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gambinoo3005/bryan-jacinto-writing-portfolio.git
cd bryan-jacinto-writing-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install project dependencies |
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build production-ready static site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## Content Management

### Adding Blog Articles

1. Create a new `.mdx` file in `src/content/posts/`:
```markdown
---
title: "Article Title"
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2", "tag3"]
pubDate: 2025-01-15
draft: false
---

Your content here...
```

2. The article will automatically appear in the `/articles` listing page
3. Dynamic routes handle individual article pages at `/articles/[slug]`

### Adding Case Studies

1. Create a new `.mdx` file in `src/content/work/`:
```markdown
---
title: "Project Title"
summary: "One-line project summary"
client: "Client Name"
industry: "Industry Type"
tags: ["SEO", "copywriting", "content strategy"]
pubDate: 2025-01-15
results: "+45% conversion rate"
challenges: ["Challenge 1", "Challenge 2"]
benefits: ["Benefit 1", "Benefit 2"]
draft: false
---

Detailed case study content...
```

2. Case studies appear in the `/work` portfolio section
3. Featured projects can be prioritized in the sorting logic

### Updating Experience Cards

Modify the `experienceCards` array in `src/pages/index.astro`:
```javascript
const experienceCards = [
  {
    id: "unique-id",
    title: "Job Title",
    company: "Company Name",
    period: "Date Range",
    location: "Location",
    description: "Role description and achievements",
    link: "/work/case-study-slug"
  },
  // Add more experiences...
];
```

### Managing Toolset

Update the `tools` array in `src/pages/index.astro`:
```javascript
const tools = [
  { 
    id: "tool-id", 
    name: "Tool Name", 
    category: "Category Name", 
    icon: "icon-filename.webp" 
  },
  // Add more tools...
];
```

Icons should be placed in `public/toolset-icons/` as WebP format (recommended dimensions: 128x128px).

## Component Architecture

### CardStack Component
Interactive card stack for showcasing work experience with swipe gestures, keyboard navigation, and smooth animations. Implements touch event handling to prevent scroll conflicts on mobile.

### ClientTestimonialCarousel Component
Auto-rotating carousel with manual controls, pause on hover, and keyboard accessibility. Features polished glass effects and optimized text visibility.

### ToolsetGrid Component
Category-based grid layout with scroll-reveal animations. Tools are organized into logical groups with consistent styling and hover interactions.

### Header Component
Responsive navigation with mobile overlay menu and theme toggle. Implements smooth transitions and maintains theme preference across sessions.

## Customization

### Theme Colors

Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-link: #0066cc;
  --color-border: #e5e7eb;
  /* Additional variables... */
}

.dark {
  --color-bg: #000000;
  --color-text: #f8f9fa;
  /* Dark mode overrides... */
}
```

### Typography

Update typography plugin configuration in `tailwind.config.js` or modify prose styles in `global.css`.

### Navigation

Edit navigation items in `src/components/Header.astro`:
```javascript
const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // Add more navigation items...
];
```

### Hero Section

Modify hero content in `src/pages/index.astro`:
- Update roles array for displayed badges
- Edit hero text and CTA button
- Replace hero image in `public/`

## Performance Considerations

### Build Optimization
- Static HTML generation for all routes
- Automatic CSS purging with Tailwind
- Optimized asset bundling with Vite

### Runtime Performance
- Minimal JavaScript hydration (only interactive components)
- CSS transitions use hardware acceleration (`transform`, `opacity`)
- Lazy loading for below-fold content
- Optimized image formats (WebP)

### Mobile Optimization
- Touch event optimization with passive listeners
- Pan-y scroll behavior for horizontal interactions
- Viewport-based layout calculations
- Reduced animation complexity on mobile

## Deployment

### Build Production Site
```bash
npm run build
```

The static site will be generated in `./dist/` directory.

### Deployment Platforms

This Astro project can be deployed to various platforms:

- **Vercel** - Automatic deployments from Git
- **Netlify** - Git-based continuous deployment
- **GitHub Pages** - Free hosting for public repositories
- **Cloudflare Pages** - Fast global CDN deployment

### Environment Variables

For contact form functionality, configure EmailJS credentials:
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari iOS 13+
- Chrome Android (last 2 versions)

## License

Copyright (c) 2025 Bryan Jacinto. All rights reserved.

## Contact

For inquiries or collaborations, visit the contact page or connect via the portfolio website.

---

Built with Astro, Tailwind CSS, and modern web technologies.
