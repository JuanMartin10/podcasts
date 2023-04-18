import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string | null;
  onChangeEntries: (event: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeEntries }) => {
  return (
    <div className={styles.search}>
      <input
        type='text'
        className={styles.searchTerm}
        placeholder='Filter podcasts'
        value={value as string}
        onChange={onChangeEntries}
      />
    </div>
  );
};

export default SearchBar;
