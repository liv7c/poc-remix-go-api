import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { movies } from '~/mock/mockMovies';
import type { Movie } from '~/types/movie';

interface LoaderData {
  movies: Movie[];
}

export const loader: LoaderFunction = () => {
  return json<LoaderData>({ movies });
};

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
