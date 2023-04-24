import { useState } from 'react';

export const useSearch = () => {
  const [search, updateSearch] = useState('');

  return { search, updateSearch };
};
