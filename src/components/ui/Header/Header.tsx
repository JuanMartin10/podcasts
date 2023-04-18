import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import styles from './Header.module.css';

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#508fcb');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to='/'>Podcaster</Link>
      </div>
      <div className={styles.shoppingBag}>
        <BounceLoader
          color={color}
          loading={loading}
          size={20}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    </header>
  );
};

export default Header;
