import { config } from "@/lib/config";
import type {
  CastResponse,
  CreditResponse,
  ImageResponse,
  Movie,
  MovieContentRatingResponse,
  MovieResponse,
  Person,
  PersonResponse,
  Social,
  TVContentRatingResponse,
  VideoResponse,
} from "@/types/tmdb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const fetchFromTMDB = async <T>(
  endpoint: string,
  param?: string,
  query?: string,
  page?: number,
): Promise<T> => {
  const url = `${config.tmdbUrl}/${endpoint}?api_key=${config.tmdbApiKey}${!param ? "" : `&${param}`}${!query ? "" : `&query=${query}`}${!page ? "" : `&page=${page}`}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

export const useTrendingDay = () => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["trending", "day"],
    queryFn: () => fetchFromTMDB<MovieResponse>("trending/all/day"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return { ...queryResult, data: queryResult.data?.results ?? [] };
};

export const useTrendingWeek = () => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["trending", "week"],
    queryFn: () => fetchFromTMDB<MovieResponse>("trending/all/week"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return { ...queryResult, data: queryResult.data?.results ?? [] };
};

export const useMovies = (param?: string, page?: number) => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["movies", param, page],
    queryFn: () =>
      fetchFromTMDB<MovieResponse>("discover/movie", param, "", page),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return {
    ...queryResult,
    data: {
      searchResults: queryResult.data?.results ?? [],
      totalPages: queryResult.data?.total_pages ?? 1,
    },
  };
};

export const useTvs = (param?: string, page?: number) => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["tvs", param, page],
    queryFn: () => fetchFromTMDB<MovieResponse>("discover/tv", param, "", page),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return {
    ...queryResult,
    data: {
      searchResults: queryResult.data?.results ?? [],
      totalPages: queryResult.data?.total_pages ?? 1,
    },
  };
};

export const usePeople = (param?: string, page?: number) => {
  const queryResult = useQuery<PersonResponse>({
    queryKey: ["people", page],
    queryFn: () =>
      fetchFromTMDB<PersonResponse>("person/popular", param, "", page),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return {
    ...queryResult,
    data: {
      searchResults: queryResult.data?.results ?? [],
      totalPages: queryResult.data?.total_pages ?? 1,
    },
  };
};

export const usePersonDetails = (id: number) => {
  const queryResult = useQuery<Person>({
    queryKey: ["personDetails", id],
    queryFn: () => fetchFromTMDB<Person>(`person/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data ?? null };
};

export const useMovieDetails = (id: number, mediaType: string) => {
  const queryResult = useQuery<Movie>({
    queryKey: ["movieDetails", id, mediaType],
    queryFn: () => fetchFromTMDB<Movie>(`${mediaType}/${id}`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data ?? null };
};

export const useContentRating = (id: number, mediaType: string) => {
  const queryResult = useQuery<
    MovieContentRatingResponse | TVContentRatingResponse
  >({
    queryKey: ["contentRating", id, mediaType],
    queryFn: () =>
      fetchFromTMDB<MovieContentRatingResponse | TVContentRatingResponse>(
        `${mediaType}/${id}/${
          mediaType === "movie" ? "release_dates" : "content_ratings"
        }`,
      ),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data?.results ?? [] };
};

export const useVideos = (id: number, mediaType: string) => {
  const queryResult = useQuery<VideoResponse>({
    queryKey: ["video", id, mediaType],
    queryFn: () => fetchFromTMDB<VideoResponse>(`${mediaType}/${id}/videos`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data?.results ?? [] };
};

export const useImages = (id: number, mediaType: string, type: string) => {
  const queryResult = useQuery<ImageResponse>({
    queryKey: ["images", id, mediaType],
    queryFn: () => fetchFromTMDB<ImageResponse>(`${mediaType}/${id}/images`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const images =
    type === "backdrop"
      ? (queryResult.data?.backdrops ?? [])
      : type === "poster"
        ? (queryResult.data?.posters ?? [])
        : (queryResult.data?.profiles ?? []);

  return { ...queryResult, data: images };
};

export const useCast = (id: number, mediaType: string, type: string) => {
  const queryResult = useQuery<CastResponse>({
    queryKey: ["cast", id, mediaType],
    queryFn: () =>
      fetchFromTMDB<CastResponse>(
        `${mediaType}/${id}/${mediaType === "movie" ? "credits" : "aggregate_credits"}`,
      ),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  const casts =
    type === "cast"
      ? (queryResult.data?.cast ?? [])
      : (queryResult.data?.crew ?? []);

  return { ...queryResult, data: casts };
};

export const useRecommendation = (id: number, mediaType: string) => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["recommendation", id, mediaType],
    queryFn: () =>
      fetchFromTMDB<MovieResponse>(`${mediaType}/${id}/recommendations`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data?.results ?? [] };
};

export const useCredits = (id: number, type: string) => {
  const queryResult = useQuery<CreditResponse>({
    queryKey: ["credit", id],
    queryFn: () =>
      fetchFromTMDB<CreditResponse>(`person/${id}/combined_credits`),
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  const credits =
    type === "cast"
      ? (queryResult.data?.cast ?? [])
      : (queryResult.data?.crew ?? []);

  return { ...queryResult, data: credits };
};

export const useSearch = (page: number, query: string) => {
  const queryResult = useQuery<MovieResponse>({
    queryKey: ["search", query, page],
    queryFn: () =>
      fetchFromTMDB<MovieResponse>("search/multi", "", query, page),
    enabled: query.trim().length > 0,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    ...queryResult,
    data: {
      searchResults: queryResult.data?.results ?? [],
      totalPages: queryResult.data?.total_pages ?? 1,
    },
  };
};

export const useSocial = (id: number, mediaType: string) => {
  const queryResult = useQuery<Social>({
    queryKey: ["socail", id, mediaType],
    queryFn: () => fetchFromTMDB<Social>(`${mediaType}/${id}/external_ids`),
    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  return { ...queryResult, data: queryResult.data ?? null };
};

const PAGE_SIZE = 24;

export const useInfiniteImages = (
  id: number,
  mediaType: string,
  path: "backdrop" | "poster",
) => {
  return useInfiniteQuery({
    queryKey: ["images", id, mediaType, path],

    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      const res = await fetchFromTMDB<ImageResponse>(
        `${mediaType}/${id}/images`,
      );

      const allImages =
        path === "backdrop" ? (res.backdrops ?? []) : (res.posters ?? []);

      const filtered = allImages.filter((i) =>
        path === "backdrop"
          ? i.iso_3166_1 === null && i.iso_639_1 === null
          : i.iso_3166_1 === "US" && i.iso_639_1 === "en",
      );

      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return {
        items: filtered.slice(start, end),
        nextPage: end < filtered.length ? pageParam + 1 : undefined,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextPage,

    enabled: !!id && !!mediaType,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
