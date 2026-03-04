"use client";

import { CastGridCardSkeleton } from "@/components/CastCardSkeleton";
import CustomPagination from "@/components/CustomPagination";
import PersonCard from "@/components/PersonCard";
import { usePeople } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data: people, isLoading } = usePeople("", page);

  useEffect(() => {
    if (page > 500 || isNaN(page)) {
      return;
    }
  }, [page]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <h2 className="mb-6 text-xl font-semibold md:text-2xl">POPULAR PEOPLE</h2>
      <div className="grid grid-cols-2 gap-4 py-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <CastGridCardSkeleton key={index} />
            ))
          : people.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
      </div>
      <div className="mt-8 flex justify-center">
        <CustomPagination route="/person?" page={page} count={500} />
      </div>
    </section>
  );
};

export default page;
