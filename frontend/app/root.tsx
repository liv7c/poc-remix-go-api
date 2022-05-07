import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import AppHeader from './components/AppHeader';
import MainNav from './components/MainNav';

import tailwindStylesheetUrl from './styles/tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Movies App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="app-wrapper">
          <AppHeader />

          <div className="md:flex md:space-x-10 mt-10">
            <MainNav />

            <main className="md:flex-1 mt-5 md:mt-0">
              <Outlet />
            </main>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
