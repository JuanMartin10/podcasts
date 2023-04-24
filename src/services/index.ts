import { type Feed } from 'models/api-types';
import { type ResultPodcast } from 'models/api-podcast.types';

const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
)}`;

const API_PODCAST_URL = (id: string) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`
  )}`;

export const fetchFeed = async (): Promise<Feed> => {
  try {
    const res = await fetch(API_URL);
    const { feed } = (await res.json()) as { feed: Feed };

    return feed;
  } catch (error: any) {
    throw new Error('Error fetching entries:', error);
  }
};
export const fetchEpisodesByPodcast = async (
  podcastId: string
): Promise<ResultPodcast[]> => {
  try {
    const res = await fetch(API_PODCAST_URL(podcastId));

    const { results } = (await res.json()) as { results: any };
    return results.map((episode: any) => {
      return {
        wrapperType: episode.wrapperType,
        releaseDate: episode.releaseDate,
        trackTimeMillis: episode.trackTimeMillis,
        trackId: episode.trackId,
        trackName: episode.trackName,
        episodeUrl: episode.episodeUrl,
        description: episode.description,
      };
    });
  } catch (error: any) {
    throw new Error('Error fetching podcast:', error);
  }
};
