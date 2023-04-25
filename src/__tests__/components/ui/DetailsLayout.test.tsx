import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsLayout from 'layout/DetailsLayout/DetailsLayout';
import currentPodcastJson from 'mocks/podcast.json';
import { AppContext } from 'context/app-context';
import Sidebar from 'components/ui/Sidebar/Sidebar';

const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <AppContext.Provider
      value={{
        entries: [],
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
const wrapper = (
  <MemoryRouter>
    <DetailsLayout currentPodcast={currentPodcastJson.podcast}>
      <Sidebar currentPodcast={currentPodcastJson.podcast} />
      <p>render details layout</p>
    </DetailsLayout>
  </MemoryRouter>
);

describe('<Layout />', () => {
  it('Should render Details Layout', () => {
    renderWithProvider(wrapper);
  });

  it('Should render a layout component', () => {
    waitFor(() => {
      expect(screen.getByRole('header')).toHaveLength(1);
      expect(screen.getByRole('main')).toBeDefined();
    });
  });
});
