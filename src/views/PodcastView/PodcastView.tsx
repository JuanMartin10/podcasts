import { useEffect, useState } from 'react';
import styles from './PodcastView.module.css';
import { Link, useParams } from 'react-router-dom';
import { type ResultPodcast } from '../../models/api-podcast.types';
import DetailsLayout from '../../layout/DetailsLayout/DetailsLayout';
import { useAppContext } from '../../context/app-context';
import { fetchEpisodesByPodcast } from '../../services';
import { isEmpty } from '../../util/validations';
import { formatDate, formatTime } from '../../util/functions';

const PodcastView = () => {
  const { entries, currentPodcast, setLoading, setCurrentPodcast } =
    useAppContext();
  const [episodes, setEpisodes] = useState<ResultPodcast[] | undefined>();
  const { podcastId } = useParams();

  useEffect(() => {
    setLoading(true);
    const podcastFromStorage = localStorage.getItem(`podcast_${podcastId}`);
    if (entries == null) return;
    if (podcastFromStorage == null) {
      const p = entries?.find((el: any) => el.id === podcastId?.toString());
      const objToSave = { podcast: p };
      fetchEpisodesByPodcast(podcastId as string).then(res => {
        setCurrentPodcast(p);
        setEpisodes(res);
        const obj = { ...objToSave, episodes: res };
        localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(obj));
        setLoading(false);
      });
    } else {
      const parse = JSON.parse(podcastFromStorage);
      setCurrentPodcast(parse.podcast);
      setEpisodes(parse.episodes);
      setLoading(false);
    }
  }, [entries]);

  useEffect(() => {}, [currentPodcast]);

  return isEmpty(currentPodcast as undefined) ? (
    <div className={styles.center}>
      <p>Cargando datos...</p>
    </div>
  ) : (
    <DetailsLayout currentPodcast={currentPodcast}>
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
              episodes?.length > 0 &&
              episodes.map((episode: any) => (
                <tr key={`${episode.trackId} ${episode.trackName}`}>
                  <td>
                    <Link
                      to={`/podcast/${podcastId}/episode/${episode.trackId}`}
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
