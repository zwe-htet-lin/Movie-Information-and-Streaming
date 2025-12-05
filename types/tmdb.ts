export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  tmdb_id: number;
  title: string;
  name: string;
  tagline: string;
  overview: string;
  runtime: number;
  vote_average: number;
  media_type: string;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  genres: Genre[];
  genre_ids: number[];
  origin_country: string[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  type: string;
  key: string;
}

export interface VideoResponse {
  results: Video[];
}

export interface MovieContentRating {
  iso_3166_1: string;
  release_dates: { certification: string }[];
}

export interface MovieContentRatingResponse {
  results: MovieContentRating[];
}

export interface TVContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface TVContentRatingResponse {
  results: TVContentRating[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  known_for_department: string;
}

export interface CastResponse {
  cast: Cast[];
}

export interface Season {
  id: number;
  season_number: number;
  episode_count: number;
}
