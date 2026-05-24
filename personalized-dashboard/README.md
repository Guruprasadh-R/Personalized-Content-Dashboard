# 🌟 Personalized Content Dashboard - Next.js Internship Project

Welcome to the **Personalized Content Dashboard**, a state-of-the-art Next.js 15 application built as an advanced frontend portfolio project. It serves as a unified feed for technology news, real-time trending movie recommendations, and social updates.

---

## ⚡ Core Features Implemented

1. **❤️ Advanced Favorites System**:
   - Save or remove cards dynamically across all categories directly via the Redux state.
   - 100% hydration-safe `localStorage` synchronization preventing system render flashes.
   - Dedicated `/favorites` route displaying saved items dynamically in an elegant layout with an animated custom empty state.

2. **🔍 Debounced Global Search**:
   - Integrated with `lodash.debounce` inside the navigation header.
   - Performs real-time, lightweight searches across news headlines, trending movie logs, and social posts.
   - Ultra-responsive typing with immediate feedback using optimized React local states coupled with Redux queries.

3. **🌓 Display Theme Controller (Dark/Light Mode)**:
   - Full dark mode theme supported across all components.
   - Custom transitions and toggle switches on the `/settings` page.
   - Persists state instantly to `localStorage` and updates document root schemas dynamically.

4. **🔥 Horizontal Trending Deck**:
   - Mixed trending cards showcasing hot topics from both News and TMDB movies.
   - Horizontal navigation triggers with scrolling limits.
   - Subtle hover zoom scaling and overlay visual animations.

5. **🎯 Interactive Drag-and-Drop Ordering**:
   - Integrated using `@dnd-kit/core` and `@dnd-kit/sortable`.
   - Allows users to reorder the content feed arbitrarily in a responsive multi-column layout.
   - Configured with `distance: 8px` pointers so standard clicks register seamlessly on internal links/buttons without false drag triggers.

6. **🔄 Infinite Scroll Pagination**:
   - Intersection Observer triggers incremental page loading when scrolling to the bottom of the feed.
   - Elegant glowing loader animation for simulated loading states.

7. **⚙️ Preferences settings Panel**:
   - Interactive category controls for **Technology**, **Sports**, **Finance**, and **Entertainment**.
   - Custom icons and check indicators per card.
   - Real-time updates: the homepage immediately adjusts to query APIs/fallbacks matching active categories!

8. **🛡️ Resilient Failover Architecture**:
   - In case API keys are missing or blocked by CORS policies, the app is integrated with elegant, topic-aligned fallback data representing mock headlines, trending posters, and pictures.
   - Ensures the interface remains completely full, gorgeous, and operational immediately out-of-the-box.

---

## 🛠️ Technological Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit & React-Redux
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **HTTP client**: Axios
- **Icons**: React Icons
- **Utility**: Lodash.debounce

---

## 🚀 Getting Started & Local Execution

### 1. Installation

Clone the repository and install all dependencies:
```bash
npm install
```

### 2. Configure Environment Keys

Create a `.env.local` file in the project root folder (matching the layout in `.env.example`):
```ini
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 3. Run Development Server

Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to inspect the live dashboard.

---

## 🧪 Testing Suite Execution

The project comes with a comprehensive three-tier testing architecture (Unit, Integration, and E2E):

### 1. Execute Unit & Integration Tests (Jest)

Run the Jest test runner to verify Redux states, card components, and search integration:
```bash
npx jest
```

The test runner will execute:
- `favoriteSlice.test.ts` (Redux mutations test)
- `ContentCard.test.tsx` (Isolated card details rendering test)
- `FeedIntegration.test.tsx` (Search integration within dynamic Redux contexts)

### 2. Execute E2E Tests (Playwright)

To verify multi-page navigation flows and layout structures using Playwright:
```bash
npx playwright test
```

---

## 📦 Production Building & Vercel Deployment

To prepare the application for production or deploy it to Vercel:

### Build Locally

Compile and bundle the production assets:
```bash
npm run build
```

### Deploy to Vercel

1. Install the Vercel CLI or log into [Vercel Dashboard](https://vercel.com).
2. Connect your Git repository.
3. Configure the environment variables (`NEXT_PUBLIC_NEWS_API_KEY` and `NEXT_PUBLIC_TMDB_API_KEY`) in your Vercel Project settings.
4. Click **Deploy**!
