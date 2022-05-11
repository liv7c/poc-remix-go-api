interface MovieGenre {
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  release_date: number;
  runtime: number;
  rating: number;
  mpaa_rating: number;
  genres: Record<number, MovieGenre>;
}
