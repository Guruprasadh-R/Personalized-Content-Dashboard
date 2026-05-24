import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

// Mock database of premium articles sorted by category
const MOCK_NEWS: Record<string, Array<{title: string; description: string; urlToImage: string; url: string}>> = {
  technology: [
    {
      title: "Apple Unveils Next-Gen M5 Chips with Advanced Neural Architecture",
      description: "Apple has officially announced its next-generation M5 processor lineup, featuring extreme efficiency gains and hardware-accelerated local machine learning capabilities.",
      urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      url: "https://www.apple.com"
    },
    {
      title: "OpenAI Launches GPT-5: The Frontier of Multimodal Intelligence",
      description: "OpenAI has officially released GPT-5, demonstrating significant milestones in reasoning, high-level math, and real-time audio-visual integration.",
      urlToImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
      url: "https://openai.com"
    },
    {
      title: "Next.js 16 Introduces High-Performance Streaming and Server Action Upgrades",
      description: "Vercel's latest framework release includes a completely overhauled compiler and optimized stream rendering for sub-millisecond edge latency.",
      urlToImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80",
      url: "https://nextjs.org"
    }
  ],
  sports: [
    {
      title: "Champions League Finals: A Clash of European Titans",
      description: "The stage is set for a historic Champions League final match, with both teams showing unparalleled tactical dominance and form in the playoffs.",
      urlToImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
      url: "https://www.uefa.com"
    },
    {
      title: "Formula 1: Monaco GP Delivers Drama and Strategic Masterclasses",
      description: "Rain showers and early pitstops shook up the grid at the Monaco Grand Prix, culminating in a nail-biting finish under challenging conditions.",
      urlToImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80",
      url: "https://www.formula1.com"
    },
    {
      title: "Grand Slam: Top Seed Outlasts Rival in Five-Set Thriller",
      description: "In a spectacular display of endurance, the defending champion secured a spot in the final after a grueling five-hour tennis showdown.",
      urlToImage: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80",
      url: "https://www.rolandgarros.com"
    }
  ],
  finance: [
    {
      title: "Central Banks Hold Rates Steady Amid Easing Global Inflation",
      description: "Federal reserve chiefs announced a pause on interest rate hikes, signaling confidence in cooling core inflation indexes worldwide.",
      urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=80",
      url: "https://www.bloomberg.com"
    },
    {
      title: "Bitcoin Surges Past Historical Highs to Target New Milestones",
      description: "Cryptocurrency markets experienced massive capital inflows, driving Bitcoin to break through resistance levels as institutional demand accelerates.",
      urlToImage: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&auto=format&fit=crop&q=80",
      url: "https://www.coindesk.com"
    },
    {
      title: "Global Tech Stocks Lead Rally as AI Investments Deliver Yields",
      description: "Tech equities surged as quarterly earnings reports highlighted massive monetization of enterprise artificial intelligence tools.",
      urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      url: "https://www.reuters.com"
    }
  ],
  entertainment: [
    {
      title: "Academy Awards: Cinematic Masterpiece Sweeps Oscar Categories",
      description: "This year's most celebrated film swept the major categories, taking home awards for Best Picture, Director, and Lead Actor.",
      urlToImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
      url: "https://www.oscars.org"
    },
    {
      title: "Blockbuster Cinematic Release Smashes Opening Weekend Records",
      description: "The long-awaited sci-fi adaptation drew record crowds worldwide, dominating global box office charts with spectacular visual effects.",
      urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
      url: "https://www.imdb.com"
    },
    {
      title: "Streaming Titans Announce Joint Venture to Bundle Top-Tier Media",
      description: "In a major consolidation move, rival platforms revealed plans to offer unified subscriptions to combat rising user churn rates.",
      urlToImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&auto=format&fit=crop&q=80",
      url: "https://www.hollywoodreporter.com"
    }
  ],
};

export const fetchNews = async (category: string = "technology") => {
  try {
    if (!API_KEY) {
      throw new Error("News API Key is missing. Using fallback mock news.");
    }

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

    if (response.data && response.data.articles) {
      return response.data.articles;
    }
    
    throw new Error("Invalid response structure from News API");
  } catch (error: any) {
    console.warn(`NewsAPI failed for category [${category}]. Using fallback mock news.`, error.message);
    
    // Return mock articles matching category, or default to tech
    return MOCK_NEWS[category] || MOCK_NEWS.technology;
  }
};
