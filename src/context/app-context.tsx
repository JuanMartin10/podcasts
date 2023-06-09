import { createContext, useContext, useState } from 'react';
import { useEntries } from 'hooks/useEntries';
import { type AppEntry } from 'models/types';

export interface AppContextTypes {
  loading: boolean;
  entries: AppEntry[];
  currentPodcast: AppEntry | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEntries: React.Dispatch<React.SetStateAction<AppEntry[]>>;
  setCurrentPodcast: React.Dispatch<React.SetStateAction<AppEntry | undefined>>;
}

interface ContextProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<AppEntry>();

  const { entries, getEntries, setEntries } = useEntries({
    loading,
    setLoading,
  });

  return (
    <AppContext.Provider
      value={{
        loading,
        entries,
        currentPodcast,
        setLoading,
        setEntries,
        setCurrentPodcast,
      }}
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
