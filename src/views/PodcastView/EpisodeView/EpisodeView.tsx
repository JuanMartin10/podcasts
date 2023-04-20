import DetailsLayout from '../../../layout/DetailsLayout/DetailsLayout';
import { useAppContext } from '../../../context/app-context';
import styles from './EpisodeView.module.css';
import { useLocation } from 'react-router-dom';

const EpisodeView = () => {
  const { currentPodcast, setCurrentPodcast } = useAppContext();
  const { state: episode } = useLocation();
  console.log(episode);
  console.log('currentPodcast', currentPodcast);
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
