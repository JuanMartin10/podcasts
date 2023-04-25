import Header from 'components/ui/Header/Header';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.container}>{children}</main>
    </div>
  );
};

export default Layout;
