import { render, screen } from '@testing-library/react';
import Header from 'components/ui/Header/Header';
import { AppContext } from 'context/app-context';
import { MemoryRouter } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

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
    <Header />
    <BounceLoader
      color={'#508fcb'}
      loading={false}
      size={20}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  </MemoryRouter>
);
describe('<Header />', () => {
  it('Should render Header', () => {
    renderWithProvider(wrapper);
  });

  it('Should render a header component ', () => {
    () => {
      expect(screen.getByRole('header')).toHaveLength(1);
      expect(screen.getByText('Podcaster')).toBeDefined();
    };
  });
});
