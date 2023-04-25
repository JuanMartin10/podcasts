import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from 'context/app-context';
import currentPodcastJson from 'mocks/podcast.json';
import episodesJson from 'mocks/episodes.json';
import { formatApiEntries } from 'util/functions';
import EpisodeView from 'views/PodcastView/EpisodeView/EpisodeView';

const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <AppContext.Provider
      value={{
        entries: formatApiEntries(episodesJson.feed as any),
        loading: false,
        currentPodcast: currentPodcastJson.podcast,
        setLoading: () => {},
        setCurrentPodcast: () => {},
        setEntries: () => {},
      }}
    >
      {ui}
    </AppContext.Provider>
  );
const renderLoading = (ui: React.ReactElement) =>
  render(
    <AppContext.Provider
      value={{
        entries: formatApiEntries(episodesJson.feed as any),
        loading: true,
        currentPodcast: undefined,
        setLoading: () => {},
        setCurrentPodcast: () => {},
        setEntries: () => {},
      }}
    >
      {ui}
    </AppContext.Provider>
  );
const fakeEpisode = {
  wrapperType: 'track',
  releaseDate: '2023-03-31T02:54:00Z',
  trackTimeMillis: 3635,
  trackId: 1574029840,
  trackName: 'Friday Night Karaoke',
};
const wrapper = ({ id, episodeId, children }: any) => (
  <MemoryRouter
    initialEntries={[
      `/podcast/${id}/episode/${episodeId}`,
      { state: fakeEpisode },
    ]}
  >
    <Routes>
      <Route
        path='/podcast/:id/episode/:episodeId'
        Component={EpisodeView}
      ></Route>
    </Routes>
  </MemoryRouter>
);

describe('<EpisodeView />', () => {
  const wrapperId = () =>
    wrapper({
      podcastId: '1574029840',
      episodeId: '1000608200247',
    });

  beforeEach(() => {
    renderWithProvider(wrapperId());
  });
  afterEach(cleanup);

  it('Should render', () => {
    renderWithProvider(wrapperId());
  });

  it("Should render 'Loading...'", () => {
    renderLoading(wrapperId());

    waitFor(() => {
      expect(screen.getByText(/load/i)).toBeDefined();
    });
  });

  it('Should match the snapshot', () => {
    const { container } = renderWithProvider(wrapperId());
    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render description episode', () => {
    waitFor(() => {
      const text = screen.getAllByText(/Episode 48 /i);

      expect(text).toBeDefined();
    });
  });

  it('Should render episode trackname as h3', () => {
    waitFor(() => {
      const heading = screen.getByRole('heading');

      expect(heading).toHaveTextContent('friday night karaoke');
    });
  });

  it('Should render one podcast image', async () => {
    waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(1);
    });
  });

  it('Should render description', () => {
    waitFor(() => {
      const description = screen.getByText(
        /No ads, no gimmicks - just Karaoke! Friday Night/i
      );
      expect(description).toBeDefined();
    });
  });

  it('Should render an audio player', () => {
    waitFor(() => {
      expect(screen.getByRole('audio')).toHaveLength(1);
    });
  });
});
