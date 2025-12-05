import { config } from "@/lib/config";
import type {
  CastResponse,
  Movie,
  MovieContentRatingResponse,
  MovieResponse,
  TVContentRatingResponse,
  VideoResponse,
} from "@/types/tmdb";
import { useQuery } from "@tanstack/react-query";

const fetchFromTMDB = async <T>(
  endpoint: string,
  page?: number,
  query?: string
): Promise<T> => {
  const url = `${config.tmdbUrl}/${endpoint}?api_key=${config.tmdbApiKey}${
    query ? `&query=${query}` : ""
  }${page ? `&page=${page}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

export const useTrendingDay = () =>
  useQuery<MovieResponse>({
    queryKey: ["trending", "day"],
    queryFn: () => fetchFromTMDB<MovieResponse>("trending/all/day"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useTrendingWeek = () =>
  useQuery<MovieResponse>({
    queryKey: ["trending", "week"],
    queryFn: () => fetchFromTMDB<MovieResponse>("trending/all/week"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useMovies = (page?: number) =>
  useQuery<MovieResponse>({
    queryKey: ["movies", page],
    queryFn: () => fetchFromTMDB<MovieResponse>("discover/movie", page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useTvs = (page?: number) =>
  useQuery<MovieResponse>({
    queryKey: ["tvs", page],
    queryFn: () => fetchFromTMDB<MovieResponse>("discover/tv", page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useSearch = (page: number, query: string) =>
  useQuery<MovieResponse>({
    queryKey: ["search", query, page],
    queryFn: () => fetchFromTMDB<MovieResponse>("search/multi", page, query),
    enabled: query.trim().length > 0,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

export const useMovieDetails = (id: number, mediaType: string) =>
  useQuery({
    queryKey: ["movieDetails", id, mediaType],
    queryFn: () => fetchFromTMDB<Movie>(`${mediaType}/${id}`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const useTrailer = (id: number, mediaType: string) =>
  useQuery({
    queryKey: ["trailer", id, mediaType],
    queryFn: () => fetchFromTMDB<VideoResponse>(`${mediaType}/${id}/videos`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const useContentRating = (id: number, mediaType: string) =>
  useQuery({
    queryKey: ["contentRating", id, mediaType],
    queryFn: () =>
      fetchFromTMDB<MovieContentRatingResponse | TVContentRatingResponse>(
        `${mediaType}/${id}/${
          mediaType === "movie" ? "release_dates" : "content_ratings"
        }`
      ),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const useCast = (id: number, mediaType: string) =>
  useQuery({
    queryKey: ["cast", id, mediaType],
    queryFn: () => fetchFromTMDB<CastResponse>(`${mediaType}/${id}/credits`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

export const useRecommendation = (id: number, mediaType: string) =>
  useQuery({
    queryKey: ["recommendation", id, mediaType],
    queryFn: () =>
      fetchFromTMDB<MovieResponse>(`${mediaType}/${id}/recommendations`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
