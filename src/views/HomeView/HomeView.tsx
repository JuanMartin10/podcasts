import { useMemo } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import { useSearch } from '../../hooks/useSearch';
import Card from '../../components/Card/Card';
import { useAppContext } from '../../context/app-context';
import styles from './HomeView.module.css';

const HomeView = () => {
  const { entries, loading } = useAppContext();
  const { search: searchText, updateSearch: setSearchText } = useSearch();

  const filterEntryByQuery = (query: string) =>
    query.toLowerCase().includes(searchText.toLocaleLowerCase());

  const filteredEntries = useMemo(() => {
    return entries.filter(
      entry =>
        filterEntryByQuery(entry.title) || filterEntryByQuery(entry.artist)
    );
  }, [entries, searchText]);

  return (
    <div>
      <div className={styles.header}>
        <span className={styles.count}>{filteredEntries?.length}</span>
        <SearchBar
          value={searchText}
          onChangeEntries={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
      <div className={styles.main}>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          filteredEntries?.map(entry => <Card key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
};

export default HomeView;
