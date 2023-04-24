import { useLocation } from 'react-router-dom';
import { useAppContext } from 'context/app-context';
import DetailsLayout from 'layout/DetailsLayout/DetailsLayout';
import styles from './EpisodeView.module.css';

const EpisodeView = () => {
  const { currentPodcast } = useAppContext();
  const { state: episode } = useLocation();

  return (
    <DetailsLayout currentPodcast={currentPodcast}>
      <div className={styles.play}>
        <h3>{episode?.trackName}</h3>
        {Boolean(episode?.description) && (
          <p
            dangerouslySetInnerHTML={{
              __html: episode?.description as string,
            }}
          ></p>
        )}
        <audio controls>
          <source src={episode.episodeUrl} type='audio/mpeg' />
        </audio>
      </div>
    </DetailsLayout>
  );
};

export default EpisodeView;
