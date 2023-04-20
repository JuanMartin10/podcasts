import { Link } from 'react-router-dom';
import { type AppEntry } from '../../../../models/types';
import styles from './Sidebar.module.css';

interface SidebarProps {
  currentPodcast: AppEntry;
}
const Sidebar: React.FC<SidebarProps> = ({ currentPodcast }) => {
  return (
    <div className={styles.sidebar}>
      <Link to={`/podcast/${currentPodcast.id}`} className={styles.link}>
        <img
          src={currentPodcast.image}
          alt={currentPodcast.title}
          className={styles.image}
        />
      </Link>
      <div className={styles.descriptionContainer}>
        <Link to={`/podcast/${currentPodcast.id}`} className={styles.link}>
          <h2 className={styles.title}>{currentPodcast.title}</h2>
          <p className={styles.author}>
            <span>by</span> {currentPodcast.artist}
          </p>
        </Link>
      </div>
      <div className={styles.descriptionContainer}>
        <p>Description:</p>
        <p className={styles.description}>{currentPodcast.summary}</p>
      </div>
    </div>
  );
};

export default Sidebar;
