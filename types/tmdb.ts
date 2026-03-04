export interface Genre {
  id: number;
  name: string;
}

export interface Season {
  id: number;
  season_number: number;
  episode_count: number;
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
  popularity: number;
  homepage: string;
  media_type: string;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  profile_path: string;
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

export interface Person {
  id: number;
  name: string;
  gender: number;
  birthday: string;
  biography: string;
  place_of_birth: string;
  also_known_as: string[];
  known_for_department: string;
  profile_path: string;
  known_for: Movie[];
}

export interface PersonResponse {
  page: number;
  results: Person[];
  cast: Movie[];
  crew: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  name: string;
  site: string;
  type: string;
  key: string;
  official: true;
  published_at: string;
}

export interface VideoResponse {
  id: number;
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
  roles: {
    character: string;
  }[];
  job: string;
  jobs: {
    job: string;
  }[];
  profile_path: string;
  department: string;
  known_for_department: string;
  total_episode_count: number;
}

export interface CastResponse {
  cast: Cast[];
  crew: Cast[];
}

export interface Image {
  iso_3166_1: string;
  iso_639_1: string;
  file_path: string;
}

export interface ImageResponse {
  id: number;
  backdrops: Image[];
  posters: Image[];
  profiles: Image[];
}

export interface Social {
  id: number;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface Credit extends Movie {
  credit_id: number;
  order: number;
  character: number;
  episode_count: number;
  department: string;
  job: string;
}

export interface CreditResponse {
  cast: Credit[];
  crew: Credit[];
}
