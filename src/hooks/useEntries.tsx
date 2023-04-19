import { useState, useEffect } from 'react';
import { fetchFeed } from '../services';
import { type AppEntry } from '../models/types';
import { useAppContext } from '../context/app-context';
import { useEntriesStorage, useExpirationStorage } from './useLocalStorage';

export const useEntries = () => {
  const [entries, setEntries] = useState<AppEntry[] | undefined>();
  const { loading, setLoading } = useAppContext();
  const [expirationValue, setExpirationValue] = useExpirationStorage();
  const [entriesStorage, setEntriesStorage] = useEntriesStorage();

  const checkHour = () => {
    const hours = 24;
    const now = new Date().getTime();
    if (
      expirationValue === '' ||
      now - expirationValue > hours * 60 * 60 * 1000
    ) {
      localStorage.clear();
      setExpirationValue(now);
      getEntries();
    } else {
      setEntries(entriesStorage);
    }
  };
  const getEntries = async () => {
    try {
      setLoading(true);
      const feed = await fetchFeed();
      const mappedEntries: AppEntry[] = feed.entry.map(entry => ({
        id: entry.id.attributes['im:id'],
        title: entry['im:name'].label,
        artist: entry['im:artist'].label,
        image: entry['im:image'][0].label,
      }));
      setEntriesStorage(mappedEntries);
      setEntries(mappedEntries);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkHour();
  }, []);

  return { entries, loading, getEntries, setEntries };
};
