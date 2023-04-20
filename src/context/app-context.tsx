import { createContext, useContext, useState } from 'react';
import { useEntries } from '../hooks/useEntries';
import { type AppEntry } from '../models/types';

interface AppContextTypes {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  entries: AppEntry[] | undefined;
  setEntries: React.Dispatch<React.SetStateAction<AppEntry[] | undefined>>;
  getEntries: () => Promise<void>;
}

interface ContextProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { entries, getEntries, setEntries } = useEntries(loading, setLoading);

  return (
    <AppContext.Provider
      value={{ loading, setLoading, entries, setEntries, getEntries }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextTypes => {
  const context = useContext(AppContext);
  if (context == null) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
};
