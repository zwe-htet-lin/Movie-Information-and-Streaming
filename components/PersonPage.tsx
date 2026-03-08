"use client";

import { CastGridCardSkeleton } from "@/components/CastCardSkeleton";
import CustomPagination from "@/components/CustomPagination";
import PersonCard from "@/components/PersonCard";
import { Card } from "@/components/ui/card";
import { usePeople } from "@/hooks/useTMDB";
import { useEffect, useState } from "react";

const PersonPage = () => {
  const [page, setPage] = useState(1);
  const {
    data: { searchResults: people, totalPages },
    isLoading,
  } = usePeople("", page);

  useEffect(() => {
    if (page > 500) {
      return;
    }
  }, [page]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-xl font-semibold md:text-2xl">POPULAR PEOPLE</h2>
      </Card>
      {isLoading ? (
        <div className="my-10 grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <CastGridCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {people.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="my-10 flex justify-center">
              <CustomPagination count={500} page={page} setPage={setPage} />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PersonPage;
