import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import type { Movie } from '~/types/movie';

interface LoaderData {
  movies: Movie[];
}

const apiUrl = 'http://localhost:4000/v1/movies';

export const loader: LoaderFunction = async () => {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Response('Error retrieving the movies');
  }

  const data = await res.json();
  return json<LoaderData>(data);
};

export function CatchBoundary() {
  return (
    <div>
      <h3>Sorry, we couldn't retrieve the movies!</h3>
    </div>
  );
}

export default function Movies() {
  const { movies } = useLoaderData() as LoaderData;

  return (
    <>
      <h2 className="text-xl" id="movie-choose-title">
        Choose a movie
      </h2>
      <ul aria-labelledby="movie-choose-title">
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                className="py-2 underline text-blue-700 inline-block"
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
