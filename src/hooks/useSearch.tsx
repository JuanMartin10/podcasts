import { useEffect, useRef, useState } from 'react';

export const useSearch = () => {
  const [search, updateSearch] = useState('');

  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
    }
  }, [search]);

  return { search, updateSearch };
};
