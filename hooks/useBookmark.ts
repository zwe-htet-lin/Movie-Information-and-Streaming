"use client";

import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from "@/store/slices/bookmarkSlice";
import { Movie } from "@/types/tmdb";

export const useBookmark = (
  movie: Movie,
  mediaType: string,
  status?: string
) => {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmark.value);
  const { success, error, auth } = useToast(status);

  const isBookmarked = bookmarks.some(
    (b) =>
      b.tmdb_id === (movie.tmdb_id || movie.id) && b.media_type === mediaType
  );

  const currentBookmark = bookmarks.find(
    (b) =>
      b.tmdb_id === (movie.tmdb_id || movie.id) && b.media_type === mediaType
  )?.bookmark;

  const onSuccess = () => {
    success(`Your bookmark has been saved.`, "/bookmark?page=1");
  };

  const onDeleteSuccess = () => {
    success(`Your bookmark has been removed.`, "/bookmark?page=1");
  };

  const onError = (message?: string) => {
    error(message);
  };

  const bookmark = (newBookmark: string) => {
    if (auth()) return;

    const payload = {
      bookmark: newBookmark,
      tmdb_id: movie.tmdb_id || movie.id,
      media_type: mediaType,
      release_date: movie.release_date || movie.first_air_date,
      title: movie.title || movie.name,
      genre_ids: movie.genre_ids,
      poster_path: movie.poster_path,
    };

    dispatch(
      isBookmarked
        ? updateBookmark({ payload, onSuccess, onError })
        : createBookmark({ payload, onSuccess, onError })
    );
  };

  const remove = () => {
    if (auth()) return;

    const payload = {
      bookmark: "",
      tmdb_id: movie.tmdb_id || movie.id,
      media_type: mediaType,
      release_date: movie.release_date || movie.first_air_date,
      title: movie.title || movie.name,
      genre_ids: movie.genre_ids,
      poster_path: movie.poster_path,
    };

    dispatch(deleteBookmark({ payload, onSuccess: onDeleteSuccess, onError }));
  };

  return { isBookmarked, currentBookmark, bookmark, remove };
};
