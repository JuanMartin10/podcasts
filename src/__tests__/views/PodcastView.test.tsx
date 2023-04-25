import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from 'context/app-context';
import currentPodcastJson from 'mocks/podcast.json';
import episodesJson from 'mocks/episodes.json';
import { formatApiEntries } from 'util/functions';
import PodcastView from 'views/PodcastView/PodcastView';

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

const wrapper = ({ id }: any) => (
  <MemoryRouter initialEntries={[`/podcast/${id}`]}>
    <Routes>
      <Route path='/podcast/:id' Component={PodcastView} />
    </Routes>
  </MemoryRouter>
);

describe('<PodcastView />', () => {
  const wrapperId = () => wrapper({ id: '1574029840' });
  beforeEach(() => {
    renderWithProvider(wrapperId());
  });
  afterEach(cleanup);

  it('Should render', () => {
    renderWithProvider(wrapperId());
  });

  it('Should match the snapshot', async () => {
    const { container } = renderWithProvider(wrapperId());
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Should render Friday Night Karaoke as h2', () => {
    const text = screen.getAllByText(/friday night karaoke/i);
    const h2Element = text.find(element => element.tagName === 'H2');

    expect(h2Element).toBeDefined();
  });

  it("Should render 'Loading...'", async () => {
    renderLoading(wrapperId());
    screen.getByText(/loading/i);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeDefined();
    });
  });

  it('Should render podcast image', async () => {
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(1);
      expect(images).toBeDefined();
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

  it('Should render 53 episodes', async () => {
    waitFor(() => {
      const allEpisodes = screen.getAllByRole('tr');
      expect(allEpisodes).toHaveLength(53);
      const episode = screen.getByText('Hit Me With Elvis');
      expect(episode).toBeDefined();
    });
  });
});
