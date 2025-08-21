# Nuxt 4 + Baserow Migration Guide

## Overview
This migration moves the Abundance of Works project from Gridsome to Nuxt 4 with Baserow as the data source, providing better performance, modern Vue 3 features, and active maintenance.

## Key Changes

### Framework Migration
- **From**: Gridsome (Vue 2, abandoned project)
- **To**: Nuxt 4 (Vue 3, actively maintained)

### Data Source Migration  
- **From**: Airtable
- **To**: Baserow (open source, similar API)

### Modern Features
- Vue 3 Composition API
- Auto-imports (no need to import `ref`, `computed`, etc.)
- Built-in TypeScript support
- Server-side rendering + Static generation
- Better performance and SEO

## Project Structure

```
/
├── pages/           # File-based routing
├── components/      # Vue components (auto-imported)
├── composables/     # Reusable composition functions
├── layouts/         # Page layouts
├── server/api/      # API routes for Baserow integration
├── public/          # Static assets
└── nuxt.config.ts   # Nuxt configuration
```

## Migration Progress

### ✅ Completed
- [x] Nuxt 4 project initialization
- [x] Baserow API integration with server routes
- [x] Composable for data fetching (`useBaserow`)
- [x] Basic layout and navigation
- [x] Home page migration
- [x] Tailwind CSS configuration

### 🚧 In Progress
- [ ] All page migrations
- [ ] Dynamic route templates (work/[slug], creator/[slug], etc.)
- [ ] Search functionality
- [ ] Component migrations

### 📋 Todo
- [ ] Chart.js integration for statistics
- [ ] Form submissions
- [ ] SEO optimization
- [ ] Performance optimization

## Key Files

### API Integration
- `server/api/baserow/table/[tableId].js` - Fetch table data
- `composables/useBaserow.js` - Client-side data fetching
- `nuxt.config.ts` - Environment variable configuration

### Environment Variables
```bash
# Required Baserow configuration
BASEROW_API_TOKEN=your_token_here
BASEROW_WORKS_TABLE_ID=123
BASEROW_CREATORS_TABLE_ID=456
# ... etc for all tables
```

## Baserow Setup

1. **Export from Airtable**: Export all tables as CSV
2. **Import to Baserow**: Create database and import CSV files
3. **Configure API**: Generate API token in Baserow settings
4. **Get Table IDs**: Find IDs in Baserow URLs when viewing tables

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

## Deployment

The site is configured for Netlify deployment with the `netlify` preset in `nuxt.config.ts`.

## Nuxt 4 Features Used

### Auto-imports
No need to import Vue composition functions or Nuxt utilities:
```vue
<script setup>
// These are auto-imported in Nuxt 4
const data = ref()
const router = useRouter()
const config = useRuntimeConfig()
</script>
```

### File-based Routing
- `pages/index.vue` → `/`
- `pages/works.vue` → `/works`
- `pages/work/[slug].vue` → `/work/any-slug`

### Server API Routes
- `server/api/baserow/table/[tableId].js` → `/api/baserow/table/123`

### SEO & Meta
Built-in SEO with `useSeoMeta()`:
```vue
<script setup>
useSeoMeta({
  title: 'Page Title',
  description: 'Page description'
})
</script>
```

## Migration Notes

1. **GraphQL Removed**: Nuxt doesn't include GraphQL by default. Data fetching is done via REST API calls to Baserow.

2. **Static Queries**: Replaced with `onMounted()` or `await $fetch()` calls in server routes.

3. **g-link → NuxtLink**: All Gridsome links updated to use NuxtLink.

4. **Components**: Auto-imported, no need to register in components object.

5. **Layouts**: Moved from `src/layouts/` to `layouts/` with different syntax.

## Testing the Migration

1. Set up Baserow database with your data
2. Configure environment variables in `.env`
3. Run `npm run dev`
4. Verify data loads correctly on homepage
5. Test navigation and search

## Performance Benefits

- **Faster builds**: Nuxt 4 has significantly faster build times
- **Better tree-shaking**: Smaller bundle sizes
- **Modern bundling**: Uses Vite for development
- **Auto-optimization**: Built-in performance optimizations