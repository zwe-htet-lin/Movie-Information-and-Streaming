"use client";

import { CastGridCardSkeleton } from "@/components/CastCardSkeleton";
import CustomPagination from "@/components/CustomPagination";
import PersonCard from "@/components/PersonCard";
import { Card } from "@/components/ui/card";
import { usePeople } from "@/hooks/useTMDB";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PersonPage = () => {
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
      <Card className="rounded-none">
        <h2 className="text-xl font-semibold md:text-2xl">POPULAR PEOPLE</h2>
      </Card>{" "}
      <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <CastGridCardSkeleton key={index} />
            ))
          : people.map((person, index) => (
              <PersonCard key={index} person={person} />
            ))}
      </div>
      <div className="my-10 flex justify-center">
        <CustomPagination route="/person?" page={page} count={500} />
      </div>
    </section>
  );
};

export default PersonPage;
