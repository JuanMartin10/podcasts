import styles from './Sidebar.module.css';

interface SidebarProps {
  currentPodcast: any;
}
const Sidebar: React.FC<SidebarProps> = ({ currentPodcast }) => {
  return (
    <div className={styles.sidebar}>
      <img
        src={currentPodcast.image}
        alt={currentPodcast.title}
        className={styles.image}
      />
      <div className={styles.descriptionContainer}>
        <h2 className={styles.title}>{currentPodcast.title}</h2>
        <p className={styles.author}>
          <span>by</span> {currentPodcast.artist}
        </p>
      </div>
      <div className={styles.descriptionContainer}>
        <p>Description:</p>
        <p className={styles.description}>{currentPodcast.summary}</p>
      </div>
    </div>
  );
};

export default Sidebar;
