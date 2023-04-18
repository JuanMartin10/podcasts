import { Outlet } from 'react-router-dom';
import Header from '../components/ui/Header/Header';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
