import { useEffect, useState } from 'react';

import { fetchEpisodesByPodcast } from 'services';

import { type AppEntry } from 'models/types';
import { type ResultPodcast } from 'models/api-podcast.types';
import useLocalStorage from './useLocalStorage';

interface UseSelectedPodcastProps {
  podcastId: string | undefined;
  entries: AppEntry[];
  loading: boolean;
  currentPodcast: AppEntry | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPodcast: React.Dispatch<React.SetStateAction<AppEntry | undefined>>;
}

const useSelectedPodcast = ({
  podcastId,
  entries,
  loading,
  currentPodcast,
  setLoading,
  setCurrentPodcast,
}: UseSelectedPodcastProps) => {
  const [episodes, setEpisodes] = useState<ResultPodcast[] | undefined>();

  const [podcastFromStorage, setPodcastFromStorage] = useLocalStorage(
    `podcast_${podcastId}`,
    ''
  );

  useEffect(() => {
    if (entries === null || podcastId === undefined) return;

    setLoading(true);

    setCurrentPodcast(undefined);

    const setPodcastAndEpisodes = (
      podcast: AppEntry,
      episodes: ResultPodcast[]
    ) => {
      setCurrentPodcast(podcast);
      setEpisodes(episodes);
    };

    const fetchAndSetEpisodes = async (podcastFinded: AppEntry) => {
      return await fetchEpisodesByPodcast(podcastId).then(episodes => {
        if (episodes.length > 0 && podcastFinded !== undefined) {
          setPodcastAndEpisodes(podcastFinded, episodes);
          return episodes;
        }
      });
    };

    if (podcastFromStorage === '') {
      const podcastFinded = entries.find(
        podcast => podcast.id === podcastId.toString()
      );
      const callFetch = async () => {
        const episodes = await fetchAndSetEpisodes(podcastFinded as AppEntry);

        const obj = { podcast: podcastFinded, episodes };
        setPodcastFromStorage(obj);
      };
      callFetch();
    } else {
      setPodcastAndEpisodes(
        podcastFromStorage.podcast,
        podcastFromStorage.episodes
      );
    }
    setLoading(false);
  }, [podcastId, entries, loading]);

  return { currentPodcast, episodes, loading };
};

export default useSelectedPodcast;
