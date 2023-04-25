import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from 'layout/Layout';
import HomeView from 'views/HomeView/HomeView';
import EpisodeView from 'views/PodcastView/EpisodeView/EpisodeView';
import PodcastView from 'views/PodcastView/PodcastView';

export const HOME_PATH = '/';
export const PODCAST_PATH = '/podcast';
export const EPISODE_PATH = '/episode';

export const routesConfig = [
  {
    path: '/',
    element: (
      <>
        <Layout>
          <Outlet />
        </Layout>
      </>
    ),
    children: [
      { path: `${HOME_PATH}`, element: <HomeView /> },
      { path: `${PODCAST_PATH}/:podcastId`, element: <PodcastView /> },
      {
        path: `${PODCAST_PATH}/:podcastId${EPISODE_PATH}/:episodeId`,
        element: <EpisodeView />,
      },
    ],
  },
];
const router = createBrowserRouter(routesConfig);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
