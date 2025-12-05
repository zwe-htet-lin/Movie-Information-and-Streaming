export interface Bookmark {
  bookmark: string;
  tmdb_id: number;
  media_type: string;
  release_date: string;
  title: string;
  genre_ids: number[];
  poster_path: string;
}

export interface BookmarkPayload {
  payload: Bookmark;
  onSuccess?: () => void;
  onError?: () => void;
}
