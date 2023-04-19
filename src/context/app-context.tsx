import { createContext, useContext, useState } from 'react';
interface AppContextTypes {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ContextProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppProvider: React.FC<ContextProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
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
