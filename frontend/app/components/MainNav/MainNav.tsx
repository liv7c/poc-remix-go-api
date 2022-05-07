import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';

function NavLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      to={href}
      className="block px-3 md:pr-24 py-4 underline underline-offset-2 text-gray-700 hover:bg-gray-50 transition-all"
    >
      {children}
    </Link>
  );
}

function MainNav() {
  return (
    <nav aria-label="Main" className="w-full md:max-w-fit -mx-3">
      <ul>
        <li className="border-2 rounded-t-md border-gray-200">
          <NavLink href="/">Home</NavLink>
        </li>
        <li className="border-x-2 border-b-2 border-gray-200">
          <NavLink href="/movies">Movies</NavLink>
        </li>
        <li className="border-x-2 rounded-b-md border-b-2 border-gray-200">
          <NavLink href="/admin">Manage catalog</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
