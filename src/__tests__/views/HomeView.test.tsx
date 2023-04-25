import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomeView from 'views/HomeView/HomeView';
import { AppContext } from 'context/app-context';
import episodesJson from 'mocks/episodes.json';
import { formatApiEntries } from 'util/functions';

const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <AppContext.Provider
      value={{
        entries: formatApiEntries(episodesJson.feed as any),
        loading: false,
        currentPodcast: undefined,
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

const wrapper = (
  <MemoryRouter>
    <Routes>
      <Route path='/' Component={HomeView} />
    </Routes>
  </MemoryRouter>
);

describe('<HomeView />', () => {
  beforeEach(() => {
    renderWithProvider(wrapper);
  });
  afterEach(cleanup);

  it('Should render', () => {
    renderWithProvider(wrapper);
  });

  it('Should match the snapshot', () => {
    const { container } = renderWithProvider(wrapper);
    expect(container).toMatchSnapshot();
  });

  it('Should render a header component', async () => {
    waitFor(() => {
      expect(screen.getByRole('header')).toHaveLength(1);
      expect(screen.getByText('Podcaster')).toBeDefined();
    });
  });
  it("Should render 'Loading...'", async () => {
    renderLoading(wrapper);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeDefined();
    });
  });

  it('Should render images', async () => {
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toBeDefined();
    });
  });

  it('Should filter searchbox', async () => {
    await waitFor(() => {
      const searchbox = screen.getByPlaceholderText(/filter podcasts/i);
      fireEvent.change(searchbox, { target: { value: 'joe' } });
      screen.getAllByText(/joe/i);
      expect(screen.queryByText(/elvis/i)).toBeNull();
    });
  });
});
