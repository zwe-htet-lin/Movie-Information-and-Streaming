"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Card } from "@/components/ui/card";
import { useSearch } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [page, setPage] = useState(1);

  const {
    data: { searchResults, totalPages },
    isLoading,
  } = useSearch(page, query);

  const filteredResults =
    searchResults.filter((item) => item.media_type !== "person") || [];

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) {
      return;
    }
  }, [page]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-center text-xl font-bold md:text-left md:text-2xl">
          Search: {query}
        </h2>
      </Card>
      {isLoading ? (
        <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : !isLoading && filteredResults.length === 0 ? (
        <div className="my-10 flex justify-center">
          <p className="text-center text-neutral-400">
            No items were found that match your query.
          </p>
        </div>
      ) : (
        <>
          <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredResults.map((result, index) => (
              <MovieCard
                key={index}
                movie={result}
                mediaType={result.media_type}
              />
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

export default SearchPage;
