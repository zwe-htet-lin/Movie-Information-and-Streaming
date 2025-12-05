export interface Rating {
  rating: number;
  tmdb_id: number;
  media_type: string;
  release_date: string;
  title: string;
  genre_ids: number[];
  poster_path: string;
}

export interface RatingPayload {
  payload: Rating;
  onSuccess?: () => void;
  onError?: () => void;
}
