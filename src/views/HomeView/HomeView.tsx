import { useMemo } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import { useEntries } from '../../hooks/useEntries';
import { useSearch } from '../../hooks/useSearch';
import Card from '../../components/Card/Card';
import styles from './HomeView.module.css';

const HomeView = () => {
  const { entries, loading } = useEntries();
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
        <span className={styles.count}>{filteredEntries?.length}</span>
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
          filteredEntries?.map(en => (
            <Card key={en.id} entry={en} />
            // <p
            //   key={en.id.label}
            // >{`${en['im:name'].label} - ${en['im:artist'].label}`}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeView;
