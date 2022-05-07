import { render, screen } from '@testing-library/react';
import { renderRouted } from 'testutils/customRenders';

import MainNav from './MainNav';

describe('MainNav', () => {
  it('should return a nav with the correct aria label', () => {
    renderRouted(<MainNav />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeVisible();
    expect(nav).toHaveAttribute('aria-label', 'Main');
  });

  it('should show all the nav links', () => {
    renderRouted(<MainNav />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeVisible();
    expect(homeLink).toHaveAttribute('href', '/');

    const moviesLink = screen.getByRole('link', { name: /movies/i });
    expect(moviesLink).toBeVisible();
    expect(moviesLink).toHaveAttribute('href', '/movies');

    const adminLink = screen.getByRole('link', { name: /manage catalog/i });
    expect(adminLink).toBeVisible();
    expect(adminLink).toHaveAttribute('href', '/admin');
  });
});
