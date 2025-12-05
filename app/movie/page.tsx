"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { useMovies } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Movie() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data: movies, isLoading } = useMovies(page);

  useEffect(() => {
    if (page > 500 || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <div className="pt-25 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">MOVIES</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
        {isLoading
          ? [...Array(10)].map((_, index) => <MovieCardSkeleton key={index} />)
          : movies!.results.map((movie, index) => (
              <MovieCard key={index} movie={movie} mediaType="movie" />
            ))}
      </div>
      <div className="flex justify-center mt-8">
        <CustomPagination endpoint="movie" page={page} count={500} />
      </div>
    </div>
  );
}
