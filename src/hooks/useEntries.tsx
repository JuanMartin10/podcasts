import { useState, useEffect } from 'react';
import { type Entry } from '../models/types';
import { fetchFeed } from '../services';

export const useEntries = () => {
  const [entries, setEntries] = useState<Entry[] | undefined>();
  const [loading, setLoading] = useState(false);

  const getEntries = async () => {
    try {
      setLoading(true);
      const feed = await fetchFeed();
      setEntries(feed.entry);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEntries();
  }, []);

  return { entries, loading, getEntries, setEntries };
};
