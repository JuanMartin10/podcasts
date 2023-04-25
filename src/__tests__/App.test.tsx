import { afterEach, describe, test } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  afterEach(cleanup);
  test('App mounts properly', async () => {
    render(<App />);
  });
});
