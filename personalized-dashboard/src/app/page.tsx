import DashboardLayout from "@/components/layout/DashboardLayout";
import Feed from "@/components/feed/Feed";
import Trending from "@/components/feed/Trending";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-6 relative dark:border-slate-800/60">
          <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent dark:from-white dark:via-slate-100 dark:to-slate-400">
            Personalized Dashboard
          </h1>
          <p className="text-slate-600 text-base dark:text-slate-400">
            Your customized stream of tech news, trending movie recommendations, and social updates.
          </p>
        </div>

        {/* Carousel representing the high-visibility Trending Section */}
        <Trending />

        {/* Main interactive grid representing the unified Feed with filters, sortability, and infinite scroll */}
        <Feed />
      </div>
    </DashboardLayout>
  );
}