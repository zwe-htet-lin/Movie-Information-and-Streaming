"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Card } from "@/components/ui/card";
import { useSearch } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page") || "1");

  const {
    data: { searchResults, totalPages },
    isLoading,
  } = useSearch(page, query);
  const filteredResults =
    searchResults.filter((item) => item.media_type !== "person") || [];

  useEffect(() => {
    if (page > totalPages || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-xl font-semibold md:text-2xl">SEARCH: {query}</h2>
      </Card>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && filteredResults.length === 0 && (
        <div className="flex justify-center py-10">
          <h2 className="text-lg text-neutral-400">No results found.</h2>
        </div>
      )}

      {!isLoading && filteredResults.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredResults.map((result, index) => (
              <MovieCard
                key={index}
                movie={result}
                mediaType={result.media_type}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mb-10 flex justify-center">
              <CustomPagination
                route={`/search?query=${query}&`}
                page={page}
                count={totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
