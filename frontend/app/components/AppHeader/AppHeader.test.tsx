import { render, screen } from '@testing-library/react';

import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('should show the app title', () => {
    render(<AppHeader />);
    expect(screen.getByRole('heading', { name: /movies app/i })).toBeVisible();
  });
});
