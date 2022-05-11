import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { LoaderFunction } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';

import type { Movie as MovieType } from '~/types/movie';

interface LoaderData {
  movie: MovieType;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.movieId, 'Expected params.movieId');

  const castedMovieId = Number.parseInt(params.movieId);

  if (!castedMovieId || Number.isNaN(castedMovieId)) {
    return json({});
  }

  const res = await fetch(`http://localhost:4000/v1/movie/${castedMovieId}`);

  if (!res.ok) {
    throw new Response('Movie not found', { status: 404 });
  }

  const movie = await res.json();
  return json<LoaderData>(movie);
};

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h3>{caught.data}</h3>
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
        <h2 className="text-xl font-bold">Movie: {movie.title}</h2>

        <div className="mt-4 border border-gray-100">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {movie.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Run time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {movie.runtime}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
