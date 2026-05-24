# Personalized Content Dashboard

A modern, responsive, and interactive content aggregation dashboard built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.  

The application delivers personalized news, movie recommendations, and social content through a unified feed with advanced frontend features like drag-and-drop organization, infinite scrolling, dark mode, debounced search, and persistent user preferences.

---

# 🚀 Features

- 📰 Personalized News Feed
- 🎬 Movie Recommendations
- 📱 Mock Social Media Feed
- ❤️ Favorites Management
- 🔍 Debounced Global Search
- 🌙 Dark / Light Mode
- 🎯 Category-based Preferences
- 🔄 Infinite Scrolling
- 🧩 Drag-and-Drop Feed Reordering
- ⚡ Smooth Animations with Framer Motion
- 💾 Persistent State using localStorage
- 📱 Fully Responsive Design
- 🧪 Unit, Integration & E2E Testing
- 🛡️ Resilient API Fallback Architecture

---

# 🛠️ Tech Stack

## Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## State Management
- Redux Toolkit
- React Redux

## APIs & Data
- NewsAPI
- TMDB API
- Mock Social Feed

## Additional Libraries
- dnd-kit
- Axios
- lodash.debounce
- redux-persist
- react-icons

## Testing
- Jest
- React Testing Library
- Playwright

---

# 📂 Folder Structure

```bash
src/
│
├── app/
├── components/
├── redux/
├── services/
├── types/
├── utils/
└── tests/
```

---

# ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

---

# 📦 Installation & Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
```

## 2. Navigate into Project

```bash
cd personalized-dashboard
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Add Environment Variables

Create:

```bash
.env.local
```

Add your API keys.

## 5. Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🧪 Running Tests

## Unit & Integration Tests

```bash
npx jest
```

## Playwright E2E Tests

```bash
npx playwright test
```

---

# 🎯 Key Architectural Decisions

- Hydration-safe dark mode synchronization for SSR compatibility
- dnd-kit activation constraints to avoid accidental drag events
- Infinite scrolling using Intersection Observer
- Redux-based global state management
- API failover handling using mock fallback data
- Modular reusable component architecture
- Optimized rendering and responsive layouts

---

Example:
- Dashboard
- Favorites
- Dark Mode
- Drag-and-Drop Feed

---

# 🚀 Deployment

Deploy easily using Vercel.

Official Website: https://vercel.com

---

# 📈 Future Improvements

- Real-time live feed updates
- Authentication with NextAuth
- Multi-language support
- AI-powered recommendations
- Advanced analytics dashboard


# 📄 License

This project is developed for educational and internship assignment purposes.
