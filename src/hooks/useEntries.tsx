import { useState, useEffect } from 'react';
import { useEntriesStorage, useExpirationStorage } from './useLocalStorage';
import { fetchFeed } from 'services';
import { type AppEntry } from 'models/types';
import { formatApiEntries } from 'util/functions';

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

      const mappedEntries: AppEntry[] = formatApiEntries(feed);
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
