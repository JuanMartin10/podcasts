import AppRouter from './routes';
import { AppProvider } from './context/app-context';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
