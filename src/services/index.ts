import { type Feed } from '../models/api-types';

const API_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const fetchFeed = async (): Promise<Feed> => {
  try {
    const res = await fetch(API_URL);
    const { feed } = (await res.json()) as { feed: Feed };

    return feed;
  } catch (error: any) {
    throw new Error('Error fetching entries:', error);
  }
};
