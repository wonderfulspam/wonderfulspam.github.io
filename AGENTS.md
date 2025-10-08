# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

This is the static website for Festival of Endless Gratitude (FoEG), a
non-profit music and arts festival in Copenhagen. The site is built with
[Cobalt](https://cobalt-org.github.io), a static site generator written in Rust.

## Commands

### Development
- `cobalt serve` - Start local development server with live reload
- `cobalt build` - Build the static site (output goes to `_site/`)
- `cobalt clean` - Clean build artifacts (useful when things seem off)
- `cobalt new -f src/artists "Artist Name"` - Create a new artist page from template

### Creating Content
- New artist: `cobalt new -f src/artists "Artist Name"` (uses `src/_defaults/posts.md` as template)
- New page: `cobalt new -f src/ "Page Title"` or copy `index.liquid` to a new file

## Architecture

### Site Configuration
- `_cobalt.yml` - Main site configuration, defines source directory, posts directory (`artists`), and global site data
- Posts (artists) are stored in `src/artists/` with subdirectories by year (2021, 2022, 2023, 2024)
- Static assets in `src/assets/` including CSS (Sass), images, and JavaScript

### Content Organization

**Artists**: Each artist is a markdown file in `src/artists/YEAR/` with frontmatter:
- `title` - Artist name
- `layout` - Typically `default.liquid`
- `is_draft` - Boolean, controls visibility
- `categories` - Array containing year (e.g., `2024`)
- `data.img` - Path to artist image
- `data.country` - Country code (displayed on lineup)

**Event Data**: Stored in YAML files at `src/_data/`:
- `events.yml` - Current festival schedule (year, days, times, artist lineup)
- `events2021.yml`, `events2022.yml`, `events2023.yml` - Historical event data
- `art.yml` - Art installations/visual artists
- `partners.yml` - Sponsor/partner logos and links

### Layouts & Templates

**Layouts** (`src/_layouts/`):
- `default.liquid` - Standard page layout with header/footer
- `landing.liquid` - Homepage layout with special background styling
- `about.liquid` - About page layout

**Includes** (`src/_includes/`):
- `assign_event_data.liquid` - Filters events by slug and collects artists for an event
- `day_schedule.liquid` - Renders schedule table for a single day
- `artist_li.liquid` - Artist list item rendering
- `artist_right.liquid` - Artist detail view (right column)
- `header.liquid` - Site navigation
- `head.liquid` - HTML head with meta tags
- `partners.liquid` - Partner logo grid
- `artists_hidden.liquid` - Hidden artist details for JavaScript-powered right column

### Key Pages

- `src/index.liquid` - Landing page (uses `landing.liquid` layout)
- `src/lineup.liquid` - Artist lineup page with two-column layout (list on left, detail on right)
- `src/schedule.liquid` - Festival schedule by day
- `src/art.liquid` - Art installations page
- `src/info.md` - Festival information
- `src/tickets.md` - Ticketing information
- `src/about.md` - About the festival

### Styling

- `src/assets/css/style.scss` - Main stylesheet with Sass (automatically compiled by Cobalt)
- `src/_sass/_variables.scss` - Sass variables
- `src/_sass/_header.scss` - Header-specific styles
- Custom fonts: OverusedGrotesk and BogueSlab loaded from `src/assets/fonts/`
- Background images configured per layout (landing page has special dual-background setup)

### JavaScript Interactions

- `src/assets/js/site.js` - Interactive features including `addCopyClickHandler()` for lineup/schedule pages
- Artist details load dynamically into right column when clicked on lineup/schedule pages

## Data Flow Patterns

1. **Artist Listing**: `lineup.liquid` loops through events, uses `assign_event_data.liquid` to filter artists by category/year, renders list with `artist_li.liquid`

2. **Schedule Rendering**: `schedule.liquid` loops through `site.data.events`, each day uses `day_schedule.liquid` which matches schedule entries to artist posts by title

3. **Event Assignment**: The `assign_event_data.liquid` include is used to match event data from YAML to content collections based on slug/category matching

## Important Notes

- Artist visibility is controlled by `is_draft` field in frontmatter (false = visible)
- Artist categories array must match event slug for proper filtering (e.g., category `2024` matches event slug `2024`)
- Schedule entries in `events.yml` link to artists by exact title match
- Navigation links must be manually added to `src/_includes/header.liquid` when creating new pages
- The site uses a two-column layout pattern extensively (`.wide-left` class): left column for lists/schedules, right column for details
