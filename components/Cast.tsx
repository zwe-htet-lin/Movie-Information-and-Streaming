"use client";

import { useCast } from "@/hooks/useTMDB";
import Link from "next/link";
import { useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { CastCard } from "./CastCard";
import { CastCardSkeleton } from "./CastCardSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const Cast = ({ tmdbId, mediaType, param }: Props) => {
  const { data: casts, isLoading } = useCast(tmdbId, mediaType, "cast");

  const filteredCasts = useMemo(() => {
    if (!casts || !Array.isArray(casts) || casts.length === 0) return [];

    return casts.filter((cast) => cast?.known_for_department === "Acting");
  }, [casts]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
        <div className="flex w-fit items-center space-x-2">
          <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
          <h2 className="text-xl font-bold sm:text-2xl">CAST</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
          {[...Array(20)].map((_, index) => (
            <CastCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  // Don't render if no cast members
  if (!filteredCasts || filteredCasts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <Link
        href={`/${mediaType}/${param}/cast`}
        className="group flex w-fit items-center space-x-2 mb-5"
      >
        <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">CAST</h2>
        <div className="ml-1 flex items-center">
          <span className="group-focus:text-primary group-hover:text-primary font-medium text-neutral-300 transition duration-300">
            {filteredCasts.length}
          </span>
          <FaChevronRight className="group-hover:text-primary group-focus:text-primary size-5 transition duration-300 sm:size-6" />
        </div>
      </Link>
      <div className="flex gap-3 overflow-x-auto scroll-smooth pb-5">
        {filteredCasts.slice(0, 20).map((cast, index) => (
          <CastCard cast={cast} type="cast" key={cast.id || index} />
        ))}
      </div>
    </section>
  );
};

export default Cast;
