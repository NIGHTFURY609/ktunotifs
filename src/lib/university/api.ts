import Parser from 'rss-parser';
import { UniversityNotification } from '@/types';
import { redisCache } from '@/lib/cache/redis';

const parser = new Parser({
  customFields: {
    item: ['category', 'urgent']
  }
});

export async function fetchUniversityNotifications(): Promise<UniversityNotification[]> {
  const cacheKey = 'university:notifications';
  
  // Try cache first
  const cached = await redisCache.get<UniversityNotification[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const rssUrl = process.env.UNIVERSITY_RSS_URL || 'https://university.edu/news/rss';
    const feed = await parser.parseURL(rssUrl);
    
    const notifications: UniversityNotification[] = feed.items.map((item, index) => ({
      id: `univ-${index}`,
      title: item.title || 'No title',
      description: item.contentSnippet || item.content || 'No description',
      publishedAt: item.pubDate || new Date().toISOString(),
      link: item.link || '#',
      category: (item as any).category || 'General',
      urgent: (item as any).urgent === 'true' || false,
    }));

    // Cache for 5 minutes
    await redisCache.set(cacheKey, notifications, 300);
    
    return notifications;
  } catch (error) {
    console.error('Error fetching university notifications:', error);
    return [];
  }
}