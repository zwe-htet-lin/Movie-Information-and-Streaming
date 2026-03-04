"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Card } from "@/components/ui/card";
import { useMovies } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Movie() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data: movies, isLoading } = useMovies("", page);

  useEffect(() => {
    if (page > 500 || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-xl font-bold md:text-2xl">POPULAR MOVIES</h2>
      </Card>
      <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? [...Array(10)].map((_, index) => <MovieCardSkeleton key={index} />)
          : movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} mediaType="movie" />
            ))}
      </div>
      <div className="my-10 flex justify-center">
        <CustomPagination route="/movie?" page={page} count={500} />
      </div>
    </section>
  );
}
