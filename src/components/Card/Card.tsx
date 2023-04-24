import { Link } from 'react-router-dom';
import { type AppEntry } from 'models/types';
import { PODCAST_PATH } from 'routes';
import styles from './Card.module.css';

interface CardProps {
  entry: AppEntry;
}
const Card: React.FC<CardProps> = ({ entry }) => {
  const { id, title, image, artist } = entry;

  return (
    <Link to={`${PODCAST_PATH}/${id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.item}>
        <div className={styles.image}>
          <img src={image} alt={`${title}-${image}`} />
        </div>
        <div className={styles.info}>
          <div className={styles.titles}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.author}>{`Author: ${artist}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
