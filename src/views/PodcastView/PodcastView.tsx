import { Link, useParams } from 'react-router-dom';
import { useAppContext } from 'context/app-context';
import useSelectedPodcast from 'hooks/useSelectedPodcast';
import DetailsLayout from 'layout/DetailsLayout/DetailsLayout';
import { formatDate, formatTime } from 'util/functions';
import { EPISODE_PATH, PODCAST_PATH } from 'routes';

import styles from './PodcastView.module.css';

const PodcastView = () => {
  const { loading, setLoading, entries, currentPodcast, setCurrentPodcast } =
    useAppContext();

  const { podcastId } = useParams();

  const { currentPodcast: cPodcast, episodes } = useSelectedPodcast({
    podcastId,
    entries,
    loading,
    currentPodcast,
    setLoading,
    setCurrentPodcast,
  });

  return cPodcast == null ? (
    <div className={styles.center}>
      <p>Loading data...</p>
    </div>
  ) : (
    <DetailsLayout currentPodcast={cPodcast}>
      <div className={styles.episodesContainer}>
        <h3 className={styles.episodesTitle}>Episodes: {episodes?.length}</h3>
      </div>
      <div className={styles.episodesList}>
        <table width='100%'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className={styles.table}>
            {episodes != null &&
              episodes.length > 0 &&
              episodes.map((episode: any) => (
                <tr key={`${episode.trackId} ${episode.trackName}`}>
                  <td>
                    <Link
                      to={`${PODCAST_PATH}/${podcastId}${EPISODE_PATH}/${episode.trackId}`}
                      // to={`${PODCAST_PATH}/${podcastId}${EPISODE_PATH}/${episode.trackId}`}
                      state={episode}
                    >
                      {episode.trackName}
                    </Link>
                  </td>
                  <td>{formatDate(episode.releaseDate)}</td>
                  <td>{formatTime(episode.trackTimeMillis)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DetailsLayout>
  );
};

export default PodcastView;
