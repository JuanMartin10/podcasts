import { useState, useEffect } from 'react';
import { fetchFeed } from '../services';
import { type AppEntry } from '../models/types';

export const useEntries = () => {
  const [entries, setEntries] = useState<AppEntry[] | undefined>();
  const [loading, setLoading] = useState(false);

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
      setEntries(mappedEntries);
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
