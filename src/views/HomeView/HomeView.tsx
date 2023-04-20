import { useMemo } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import Card from '../../components/Card/Card';
import { useAppContext } from '../../context/app-context';
import styles from './HomeView.module.css';

const HomeView = () => {
  const { entries, loading } = useAppContext();
  const { search: filterEntries, updateSearch: setFilterEntries } = useSearch();

  const filteredEntries = useMemo(() => {
    if (entries !== undefined) {
      return filterEntries !== undefined && entries.length > 0
        ? entries?.filter(el =>
            el.title.toLowerCase().includes(filterEntries.toLocaleLowerCase())
          )
        : entries;
    }
  }, [entries, filterEntries]);
  // debugger;
  console.log(typeof filteredEntries, '-');

  return (
    <div>
      <div className={styles.header}>
        {filteredEntries !== undefined && (
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
        {filteredEntries === undefined ||
        (filteredEntries.length > 0 && loading) ? (
          <p>Cargando...</p>
        ) : (
          //  <p>pintando</p>
          filteredEntries?.map(en => <Card key={en.id} entry={en} />)
        )}
      </div>
    </div>
  );
};

export default HomeView;
