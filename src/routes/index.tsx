import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomeView from '../views/HomeView/HomeView';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
