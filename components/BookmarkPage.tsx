"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { movieGenres } from "@/data/movie_genre";
import { tvGenres } from "@/data/tv_genres";
import { useAppSelector } from "@/store/hook";
import { Movie } from "@/types/tmdb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BookmarkBreadcrumb from "./BookmarkBreadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const BookmarkPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("0");
  const [mediaType, setMediaType] = useState("movie");

  const {
    value: bookmarks,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.bookmark);

  const genres = mediaType === "movie" ? movieGenres : tvGenres;

  const movies = useMemo(() => {
    if (!bookmarks || !bookmarks.length) return [];
    let filteredMovies = bookmarks.filter(
      (bookmark) => bookmark.media_type === "movie",
    );
    if (mediaType === "movie" && genre !== "0") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids?.includes(Number(genre)),
      );
    }
    return filteredMovies;
  }, [bookmarks, mediaType, genre]);

  const tvs = useMemo(() => {
    if (!bookmarks || !bookmarks.length) return [];
    let filteredTvs = bookmarks.filter(
      (bookmark) => bookmark.media_type === "tv",
    );
    if (mediaType === "tv" && genre !== "0") {
      filteredTvs = filteredTvs.filter((movie) =>
        movie.genre_ids?.includes(Number(genre)),
      );
    }
    return filteredTvs;
  }, [bookmarks, mediaType, genre]);

  const paginatedMovies = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return movies.slice(start, end);
  };

  const paginatedTvs = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return tvs.slice(start, end);
  };

  const movieTotalPages = Math.max(1, Math.ceil(movies.length / 20));
  const tvTotalPages = Math.max(1, Math.ceil(tvs.length / 20));

  const handleMediaType = (value: string) => {
    setMediaType(value);
    setPage(1);
    setGenre("0");
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  useEffect(() => {
    if (mediaType === "movie" && page > movieTotalPages) {
      return;
    }
    if (mediaType === "tv" && page > tvTotalPages) {
      return;
    }
  }, [page, movieTotalPages, tvTotalPages, mediaType]);

  useEffect(() => {
    if (mediaType === "movie" && movies.length <= 20) {
      setPage(1);
    }

    if (mediaType === "tv" && tvs.length <= 20) {
      setPage(1);
    }
  }, [movies, tvs, mediaType]);

  const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-xl font-semibold md:text-2xl">MY BOOKMARKS</h2>
        <div className="my-5">
          <BookmarkBreadcrumb value="all" />
        </div>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <Select
            value={mediaType}
            onValueChange={(value) => handleMediaType(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="movie">
                Movie <span className="text-gray-300">({movies.length})</span>
              </SelectItem>
              <SelectItem value="tv">
                TV Shows <span className="text-gray-300">({tvs.length})</span>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={genre === "0" ? "" : genre}
            onValueChange={(value) => handleGenre(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Genres</SelectLabel>
                {genres.map((genre, index) => (
                  <SelectItem key={index} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>
      <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {children}
      </div>
      {isInitializing &&
        !isLoading &&
        mediaType === "movie" &&
        movies.length > 20 && (
          <div className="my-10 flex w-full justify-center">
            <CustomPagination
              count={movieTotalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      {isInitializing &&
        !isLoading &&
        mediaType === "tv" &&
        tvs.length > 20 && (
          <div className="my-10 flex w-full justify-center">
            <CustomPagination
              count={tvTotalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
    </section>
  );

  if (!isInitializing || isLoading) {
    return (
      <Layout>
        {[...Array(5)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </Layout>
    );
  }

  return (
    <Layout>
      {mediaType === "movie" && movies.length > 0 ? (
        <>
          {paginatedMovies().map((movie, index) => (
            <MovieCard
              key={index}
              movie={
                {
                  id: movie.tmdb_id,
                  title: movie.title,
                  release_date: movie.release_date,
                  genre_ids: movie.genre_ids,
                  poster_path: movie.poster_path,
                } as Movie
              }
              mediaType={movie.media_type}
            />
          ))}
        </>
      ) : mediaType === "tv" && tvs.length > 0 ? (
        <>
          {paginatedTvs().map((tv, index) => (
            <MovieCard
              key={index}
              movie={
                {
                  id: tv.tmdb_id,
                  title: tv.title,
                  release_date: tv.release_date,
                  genre_ids: tv.genre_ids,
                  poster_path: tv.poster_path,
                } as Movie
              }
              mediaType={tv.media_type}
            />
          ))}
        </>
      ) : (
        <div className="col-span-full flex items-center justify-center text-center">
          <p>
            You haven&apos;t bookmarked any{" "}
            {mediaType === "movie" && genre !== "0"
              ? movieGenres.find((g) => g.id.toString() === genre)?.name
              : mediaType === "tv" && genre !== "0"
                ? tvGenres.find((g) => g.id.toString() === genre)?.name
                : ""}{" "}
            {mediaType === "movie" ? "movies" : "TV shows"}.
            <Button variant="link" className="px-2">
              <Link href="/">Explore now</Link>
            </Button>
          </p>
        </div>
      )}
    </Layout>
  );
};

export default BookmarkPage;
