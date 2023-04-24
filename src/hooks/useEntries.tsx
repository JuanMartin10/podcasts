import { useState, useEffect } from 'react';
import { useEntriesStorage, useExpirationStorage } from './useLocalStorage';
import { fetchFeed } from '../services';
import { type AppEntry } from '../models/types';

export const useEntries = ({ loading, setLoading }: any) => {
  const [entries, setEntries] = useState<AppEntry[]>([]);
  const [expirationValue, setExpirationValue] = useExpirationStorage();
  const [entriesStorage, setEntriesStorage] = useEntriesStorage();

  const checkHour = async () => {
    const hours = 24;
    const now = new Date().getTime();
    if (
      expirationValue === '' ||
      now - expirationValue > hours * 60 * 60 * 1000
    ) {
      localStorage.clear();
      setExpirationValue(now);
      await getEntries();
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
        summary: entry.summary.label,
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

  return {
    entries,
    getEntries,
    setEntries,
  };
};
