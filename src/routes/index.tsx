import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from 'layout/Layout';
import HomeView from 'views/HomeView/HomeView';
import EpisodeView from 'views/PodcastView/EpisodeView/EpisodeView';
import PodcastView from 'views/PodcastView/PodcastView';

export const HOME_PATH = '/';
export const PODCAST_PATH = '/podcast';
export const EPISODE_PATH = '/episode';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PATH} element={<Layout />}>
          <Route index element={<HomeView />} />
          <Route
            path={`${PODCAST_PATH}/:podcastId`}
            element={<PodcastView />}
          />
          <Route
            // path='/podcast/:podcastId/episode/:episodeId'
            path={`${PODCAST_PATH}/:podcastId${EPISODE_PATH}/:episodeId`}
            element={<EpisodeView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
