export interface ContentItem {
  id: string;
  type: "news" | "movie" | "social" | string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
}
