export interface UniversityNotification {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  link: string;
  category: string;
  urgent: boolean;
}

export interface TelegramPost {
  id: number;
  message: string;
  date: string;
  channelName: string;
  channelUsername: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'video' | 'document';
}

export interface YouTubeLiveStream {
  id: string;
  title: string;
  channelName: string;
  isLive: boolean;
  viewerCount?: number;
  thumbnailUrl: string;
}

export interface CachedData<T> {
  data: T;
  timestamp: number;
  ttl: number;
}