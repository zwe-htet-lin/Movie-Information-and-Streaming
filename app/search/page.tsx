"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { useSearch } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const page = parseInt(searchParams.get("page") || "1");

  const { data: searchResults, isLoading } = useSearch(page, query);
  const totalPages = searchResults?.total_pages ?? 1;
  const filteredResults =
    searchResults?.results?.filter((item) => item.media_type !== "person") ||
    [];

  useEffect(() => {
    if (page > totalPages || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <div className="pt-25 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        SEARCH: {query}
      </h2>

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && filteredResults.length === 0 && (
        <div className="flex justify-center py-10">
          <h2 className="text-neutral-400 text-lg">No results found.</h2>
        </div>
      )}

      {!isLoading && filteredResults.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
            {filteredResults.map((result, index) => (
              <MovieCard
                key={index}
                movie={result}
                mediaType={result.media_type}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <CustomPagination
                endpoint="search"
                query={query}
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
