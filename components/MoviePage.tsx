"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Card } from "@/components/ui/card";
import { languages } from "@/data/languages";
import { movieGenres } from "@/data/movie_genre";
import { useMovies } from "@/hooks/useTMDB";
import { getDateRange } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("popular");
  const [language, setLanguage] = useState("none");
  const [genre, setGenre] = useState("0");

  const { start: coming_soon_start, end: coming_soon_end } = getDateRange(
    30,
    "future",
  );
  const { start: streaming_start, end: streaming_end } = getDateRange(
    60,
    "past",
  );

  const categories = [
    { label: "Most Popular", value: "popular", param: "" },
    {
      label: "Coming Soon",
      value: "coming_soon",
      param: `primary_release_date.gte=${coming_soon_start}&primary_release_date.lte=${coming_soon_end}`,
    },
    {
      label: "Now Streaming",
      value: "streaming",
      param: `watch_region=US&with_watch_providers=8|9|337&primary_release_date.gte=${streaming_start}&primary_release_date.lte=${streaming_end}`,
    },
    {
      label: "Top Rated",
      value: "top_rated",
      param: `sort_by=vote_average.desc&vote_count.gte=2000&vote_average.gte=7`,
    },
  ];

  const param = useMemo(() => {
    let query = "";

    const selectedCategory = categories.find(
      (c) => c.value === category,
    )?.param;

    if (selectedCategory) query += selectedCategory;

    if (language !== "none") {
      query += `${query ? "&" : ""}with_original_language=${language}`;
    }

    if (genre !== "0") {
      query += `${query ? "&" : ""}with_genres=${genre}`;
    }

    return query;
  }, [category, language, genre]);

  const {
    data: { searchResults: movies, totalPages },
    isLoading,
  } = useMovies(param, page);

  const handleCategory = (value: string) => {
    setCategory(value);
    setLanguage("none");
    setGenre("0");
  };

  const handleLanguage = (value: string) => {
    setLanguage(value);
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  useEffect(() => {
    setPage(1);
  }, [category, language, genre]);

  useEffect(() => {
    if (page > totalPages) {
      return;
    }
  }, [page]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-center text-xl font-bold md:text-left md:text-2xl">
          {categories.find((c) => c.value === category)?.label}{" "}
          {language !== "none"
            ? languages.find((l) => l.iso_639_1 === language)?.english_name
            : ""}{" "}
          {genre !== "0"
            ? movieGenres.find((g) => g.id.toString() === genre)?.name
            : ""}{" "}
          Movies
        </h2>
        <div className="mt-5 flex flex-col items-center gap-5 md:flex-row">
          <Select
            value={category}
            onValueChange={(value) => handleCategory(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Most Popular" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={language === "none" ? "" : language}
            onValueChange={(value) => handleLanguage(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language, index) => (
                  <SelectItem key={index} value={language.iso_639_1}>
                    {language.english_name}
                  </SelectItem>
                ))}
              </SelectGroup>
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
                {movieGenres.map((movieGenre, index) => (
                  <SelectItem key={index} value={movieGenre.id.toString()}>
                    {movieGenre.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Card>
      {isLoading ? (
        <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : !isLoading && movies.length === 0 ? (
        <div className="my-10 flex justify-center">
          <p className="text-center text-neutral-400">
            No items were found that match your query.
          </p>
        </div>
      ) : (
        <>
          <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} mediaType="movie" />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="my-10 flex w-full justify-center">
              <CustomPagination
                count={totalPages > 500 ? 500 : totalPages}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MoviePage;
