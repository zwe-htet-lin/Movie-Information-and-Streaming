export interface Favorite {
  tmdb_id: number;
  media_type: string;
  release_date: string;
  title: string;
  genre_ids: number[];
  poster_path: string;
}

export interface FavoritePayload {
  payload: Favorite;
  onSuccess?: () => void;
  onError?: () => void;
}
