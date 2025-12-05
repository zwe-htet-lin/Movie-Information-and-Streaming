"use client";

import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  createRating,
  deleteRating,
  updateRating,
} from "@/store/slices/ratingSlice";
import { Movie } from "@/types/tmdb";

export const useRating = (
  movie: Movie | undefined,
  mediaType: string,
  status?: string
) => {
  const dispatch = useAppDispatch();
  const {
    value: ratings,
    isLoading,
    isInitializing,
  } = useAppSelector((state) => state.rating);
  const { success, error, auth } = useToast(status);

  if (status === "authenticated" && (!movie || !isInitializing)) {
    return {
      isLoading: true,
      isRated: false,
      currentRating: undefined as number | undefined,
      rate: (_: number) => {},
      clear: (_: number) => {},
    };
  } else {
    const isRated = ratings.some(
      (rating) =>
        rating.tmdb_id === (movie!.tmdb_id || movie!.id) &&
        rating.media_type === mediaType
    );

    const currentRating = ratings.find(
      (rating) =>
        rating.tmdb_id === (movie!.tmdb_id || movie!.id) &&
        rating.media_type === mediaType
    )?.rating;

    const onSuccess = () => {
      success(`Your rating has been saved.`, "/rating?page=1");
    };

    const onDeleteSuccess = () => {
      success(`Your rating has been deleted.`, "/rating?page=1");
    };

    const onError = (message?: string) => {
      error(message);
    };

    const rate = (newRating: number) => {
      if (auth()) return;

      const payload = {
        rating: newRating,
        tmdb_id: movie!.tmdb_id || movie!.id,
        media_type: mediaType,
        release_date: movie!.release_date || movie!.first_air_date,
        title: movie!.title || movie!.name,
        genre_ids: movie!.genre_ids,
        poster_path: movie!.poster_path,
      };

      dispatch(
        isRated
          ? updateRating({ payload, onSuccess, onError })
          : createRating({ payload, onSuccess, onError })
      );
    };

    const clear = (newRating: number) => {
      if (auth()) return;

      const payload = {
        rating: newRating,
        tmdb_id: movie!.tmdb_id || movie!.id,
        media_type: mediaType,
        release_date: movie!.release_date || movie!.first_air_date,
        title: movie!.title || movie!.name,
        genre_ids: movie!.genre_ids,
        poster_path: movie!.poster_path,
      };

      dispatch(deleteRating({ payload, onSuccess: onDeleteSuccess, onError }));
    };

    return { isLoading, isRated, currentRating, rate, clear };
  }
};
