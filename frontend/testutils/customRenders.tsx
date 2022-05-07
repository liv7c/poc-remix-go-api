import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderRouted(
  ui: React.ReactElement,
  { route = '/' }: { route?: string } = {}
) {
  window.history.pushState({}, 'Test page', route);
  return { ...render(ui, { wrapper: BrowserRouter }) };
}
