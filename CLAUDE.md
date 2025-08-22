# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js portfolio site built with TypeScript, React 18, TailwindCSS, and shadcn/ui. Use pnpm as the package manager.

**Development:**
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

**Installation:**
- `pnpm install` - Install dependencies

## Architecture Overview

This is a personal portfolio website with the following key structure:

**Core Configuration:**
- `src/data/resume.tsx` - Single config file containing all personal data, work experience, projects, and contact info
- All content is driven by the DATA export from this file

**App Structure (Next.js 14 App Router):**
- `src/app/layout.tsx` - Root layout with theme provider, typography, and responsive container
- `src/app/page.tsx` - Main portfolio page displaying work, education, projects, and contact sections
- `src/app/blog/` - Blog functionality with MDX support

**Component Architecture:**
- `src/components/ui/` - shadcn/ui components (Avatar, Badge, Button, Card, etc.)
- `src/components/magicui/` - Magic UI components (BlurFade, Dock, TweetCard)
- `src/components/` - Custom components (Navbar, ProjectCard, HackathonCard, Section, etc.)
- Uses composition pattern with reusable components like ListRow and Section

**Key Features:**
- Dark/light theme support via next-themes
- Framer Motion animations with BlurFade effects
- Responsive design optimized for mobile
- Blog with MDX support and syntax highlighting (rehype-pretty-code, shiki)
- Social media integration with Twitter card previews

**Styling:**
- TailwindCSS with custom design system
- CSS custom properties for theming
- Typography plugin for blog content
- Consistent spacing and animation delays

**Data Flow:**
- Central DATA object in resume.tsx drives all content
- Components receive props from DATA and render accordingly
- Blog posts managed separately in src/data/blog.ts

The codebase follows modern React patterns with TypeScript, uses shadcn/ui for consistency, and is optimized for Vercel deployment.