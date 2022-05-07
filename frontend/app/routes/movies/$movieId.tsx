import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { movies } from '~/mock/mockMovies';
import type { Movie as MovieType } from '~/types/movie';

interface LoaderData {
  movie: MovieType;
}

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.movieId, 'Expected params.movieId');

  const castedMovieId = Number.parseInt(params.movieId);

  if (!castedMovieId || Number.isNaN(castedMovieId)) {
    return json({});
  }

  const movie = movies.find((movie) => movie.id === castedMovieId);

  if (!movie) {
    throw new Response('Not Found', { status: 404 });
  }

  return json<LoaderData>({ movie });
};

export function CatchBoundary() {
  return (
    <div>
      <h3>We couldn't find that movie!</h3>
    </div>
  );
}

export default function Movie() {
  const { movie } = useLoaderData() as LoaderData;

  return (
    <>
      <Link to="/movies" className="underline block">
        &larr; Back to all movies
      </Link>
      <div className="mt-4">
        <h3>Movie: {movie.title}</h3>
        <p>Duration: {movie.runtime} minutes</p>
      </div>
    </>
  );
}
