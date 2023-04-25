import { render, screen, waitFor } from '@testing-library/react';
import { AppContext } from 'context/app-context';
import { MemoryRouter } from 'react-router-dom';
import Layout from 'layout/Layout';

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
    <Layout>
      <p>render layout</p>
    </Layout>
  </MemoryRouter>
);

describe('<Layout />', () => {
  it('Should render Layout', () => {
    renderWithProvider(wrapper);
  });

  it('Should render a layout component', () => {
    waitFor(() => {
      expect(screen.getByRole('header')).toHaveLength(1);
      expect(screen.getByRole('main')).toBeDefined();
    });
  });
});
