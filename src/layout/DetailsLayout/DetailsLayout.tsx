import Sidebar from '../../components/ui/Header/Sidebar/Sidebar';
import styles from './DetailsLayout.module.css';

interface DetailsLayoutProps {
  currentPodcast: any;
  children: React.ReactNode;
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({
  currentPodcast,
  children,
}) => {
  return (
    <div className={styles.container}>
      <Sidebar currentPodcast={currentPodcast} />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default DetailsLayout;
