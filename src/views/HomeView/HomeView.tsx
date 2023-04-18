import { useMemo } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import { useEntries } from '../../hooks/useEntries';
import { useSearch } from '../../hooks/useSearch';

const HomeView = () => {
  const { entries, loading } = useEntries();
  const { search: filterEntries, updateSearch: setFilterEntries } = useSearch();

  const filteredEntries = useMemo(() => {
    console.log('memo');
    return filterEntries != null
      ? entries?.filter(el =>
          el.title.label
            .toLowerCase()
            .includes(filterEntries.toLocaleLowerCase())
        )
      : entries;
  }, [entries, filterEntries]);

  return (
    <div>
      <SearchBar
        value={filterEntries}
        onChangeEntries={(e: any) => {
          setFilterEntries(e.target.value);
        }}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        filteredEntries?.map(en => (
          <p
            key={en.id.label}
          >{`${en['im:name'].label} - ${en['im:artist'].label}`}</p>
        ))
      )}
    </div>
  );
};

export default HomeView;
