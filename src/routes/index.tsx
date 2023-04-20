import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import HomeView from '../views/HomeView/HomeView';
import EpisodeView from '../views/PodcastView/EpisodeView/EpisodeView';
import PodcastView from '../views/PodcastView/PodcastView';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route path='/podcast/:podcastId' element={<PodcastView />} />
          <Route
            path='/podcast/:podcastId/episode/:episodeId'
            element={<EpisodeView />}
          />
          {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
