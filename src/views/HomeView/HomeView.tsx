import { useMemo } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import Card from '../../components/Card/Card';
import styles from './HomeView.module.css';
import { useAppContext } from '../../context/app-context';

const HomeView = () => {
  const { entries, loading } = useAppContext();
  const { search: filterEntries, updateSearch: setFilterEntries } = useSearch();

  const filteredEntries = useMemo(() => {
    return filterEntries != null
      ? entries?.filter(el =>
          el.title.toLowerCase().includes(filterEntries.toLocaleLowerCase())
        )
      : entries;
  }, [entries, filterEntries]);

  return (
    <div>
      <div className={styles.header}>
        {filteredEntries != null && (
          <span className={styles.count}>{filteredEntries?.length}</span>
        )}
        <SearchBar
          value={filterEntries}
          onChangeEntries={(e: any) => {
            setFilterEntries(e.target.value);
          }}
        />
      </div>
      <div className={styles.main}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          filteredEntries?.map(en => <Card key={en.id} entry={en} />)
        )}
      </div>
    </div>
  );
};

export default HomeView;
