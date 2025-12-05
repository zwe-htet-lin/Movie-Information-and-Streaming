"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { useTvs } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TV() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data: tvs, isLoading } = useTvs(page);

  useEffect(() => {
    if (page > 500 || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <div className="pt-25 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">TV SHOWS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
        {isLoading
          ? [...Array(10)].map((_, index) => <MovieCardSkeleton key={index} />)
          : tvs!.results.map((tv, index) => (
              <MovieCard key={index} movie={tv} mediaType="tv" />
            ))}
      </div>
      <div className="flex justify-center mt-8">
        <CustomPagination endpoint="tv" page={page} count={500} />
      </div>
    </div>
  );
}
