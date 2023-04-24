import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import styles from './Header.module.css';
import { useAppContext } from '../../../context/app-context';
import { HOME_PATH } from '../../../routes';

const Header = () => {
  const [color] = useState('#508fcb');
  const { loading } = useAppContext();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={HOME_PATH}>Podcaster</Link>
      </div>
      <div className={styles.shoppingBag}>
        {Boolean(loading) && (
          <BounceLoader
            color={color}
            loading={loading}
            size={20}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        )}
      </div>
    </header>
  );
};

export default Header;
