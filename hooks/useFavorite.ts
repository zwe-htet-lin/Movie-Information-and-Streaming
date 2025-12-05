"use client";

import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { createFavorite, deleteFavorite } from "@/store/slices/favoriteSlice";
import { Movie } from "@/types/tmdb";

export const useFavorite = (
  movie: Movie,
  mediaType: string,
  status?: string
) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.value);
  const { success, error, auth } = useToast(status);

  const isFavorite = favorites.some(
    (fav) =>
      fav.tmdb_id === (movie.tmdb_id || movie.id) &&
      fav.media_type === mediaType
  );

  const onSuccess = () => {
    success(
      `${isFavorite ? "Removed from" : "Added to"} your "Favorite" list.`,
      "/favorite?page=1"
    );
  };

  const onError = (message?: string) => {
    error(message);
  };

  const favorite = () => {
    if (auth()) return;

    const payload = {
      tmdb_id: movie.tmdb_id || movie.id,
      media_type: mediaType,
      release_date: movie.release_date || movie.first_air_date,
      title: movie.title || movie.name,
      genre_ids: movie.genre_ids,
      poster_path: movie.poster_path,
    };

    dispatch(
      isFavorite
        ? deleteFavorite({ payload, onSuccess, onError })
        : createFavorite({ payload, onSuccess, onError })
    );
  };

  return { isFavorite, favorite };
};
