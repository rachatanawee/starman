# Layout and Theme System

## Overview
This document describes the layout structure and theme system implementation in the Starman ERP prototype.

## Layout Structure

### Desktop Layout
- **Header**: Fixed top bar with user controls (user icon, language switcher, logout)
- **Sidebar**: Fixed left sidebar (256px width) with:
  - Company/project switcher
  - Navigation menu with collapsible sections
  - Scroll position persistence via localStorage
  - Fade overlays (top/bottom) when content is scrollable
- **Main Content**: Flexible area that adjusts based on sidebar width

### Mobile Layout
- **Header**: Fixed top bar with hamburger menu
- **Drawer**: Slide-in from right (288px width) with:
  - Search functionality for menu items
  - Collapsible sections
  - User controls at bottom (email, language, logout)
  - Auto-height based on content (max-h-screen)

### Key Components
- `project-layout.tsx` - Main layout wrapper with header and sidebar
- `project-sidebar.tsx` - Desktop sidebar with navigation
- `mobile-menu.tsx` - Mobile drawer menu

## Theme System

### Architecture
The theme system uses CSS variables for dynamic theming without page reload.

### Available Themes
1. **Tangerine** (Default) - Orange/warm tones
2. **Royal Purple** - Purple/elegant tones
3. **Ocean Breeze** - Blue/calm tones
4. **Forest Green** - Green/natural tones
5. **Crimson Red** - Red/bold tones
6. **Clean Slate** - Gray/neutral tones
7. **Claude** - Beige/warm neutral
8. **Twitter** - Blue/social media inspired

### Theme Files
Located in `public/themes/*.css`, each theme defines:
- `--primary` - Main brand color
- `--primary-dark` - Darker shade for gradients
- `--primary-darker` - Darkest shade for gradients
- `--primary-foreground` - Text color on primary background
- `--background` - Page background
- `--foreground` - Main text color
- `--card`, `--card-foreground` - Card backgrounds
- `--muted`, `--muted-foreground` - Subtle backgrounds
- `--accent`, `--accent-foreground` - Accent colors
- `--border` - Border colors
- `--ring` - Focus ring colors

### Theme Loading
1. **Initial Load**: Inline script in `app/layout.tsx` loads theme before React hydration
2. **Theme Switching**: Dynamic `<link>` tag injection via `theme-loader.tsx`
3. **Persistence**: Theme preference stored in localStorage as `selected_theme`

### Theme-Aware Components
- **Login Page**: Left side gradient uses `--primary`, `--primary-dark`, `--primary-darker`
- **Sidebar**: Active menu items use `bg-primary/10 text-primary`
- **Data Grid**: Highlights use `bg-primary/5`, `bg-primary/10`, `bg-primary/20`, `bg-primary/30`
- **Buttons**: Primary buttons use `bg-primary text-primary-foreground`

### Preventing Flash of Wrong Theme
The root layout includes an inline script that:
1. Reads theme from localStorage
2. Sets `data-theme` attribute immediately
3. Loads theme CSS before React hydration
4. Uses white background with opacity fade-in to prevent color flash

## State Persistence

### Sidebar
- **Scroll Position**: Saved to `sidebar_scroll_position` in localStorage
- **Collapsed Sections**: Saved to `sidebar_collapsed_sections` in localStorage

### Mobile Menu
- **Collapsed Sections**: Saved to `mobile_sidebar_collapsed` in localStorage

## Styling Conventions

### Colors
- Use CSS variables (`var(--primary)`) instead of hardcoded colors
- Use opacity modifiers for variations (`bg-primary/10`, `bg-primary/20`)
- Avoid Tailwind color classes (e.g., `bg-orange-500`) for theme-aware elements

### Spacing
- Compact spacing for data-dense views
- Consistent padding: `p-2` for containers, `px-2.5 py-1.5` for menu items
- Reduced gaps: `gap-2`, `gap-2.5` for icon-text combinations

### Typography
- Headers: `text-base font-bold` or `text-lg font-semibold`
- Body: `text-sm font-medium`
- Labels: `text-xs font-semibold uppercase`

## Best Practices

1. **Always use CSS variables** for colors that should change with theme
2. **Test theme switching** to ensure no hardcoded colors remain
3. **Keep localStorage keys consistent** across components
4. **Use `useMemo`** for expensive computations (menu filtering, etc.)
5. **Prefer CSS solutions** over JavaScript for layout issues
6. **Keep mobile and desktop layouts separate** for clarity
