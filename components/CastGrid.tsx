"use client";

import { useCast, useMovieDetails } from "@/hooks/useTMDB";
import { useEffect, useMemo, useState } from "react";
import { CastGridCard } from "./CastCard";
import { CastGridCardSkeleton } from "./CastCardSkeleton";
import CustomPagination from "./CustomPagination";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const castTypes = [
  { value: "Acting", label: "Cast" },
  { value: "Directing", label: "Directing" },
  { value: "Writing", label: "Writing" },
  { value: "Production", label: "Production" },
  { value: "Camera", label: "Camera" },
  { value: "Editing", label: "Editing" },
  { value: "Art", label: "Art" },
  { value: "Costume & Make-Up", label: "Costume & Makeup" },
  { value: "Sound", label: "Sound" },
  { value: "Visual Effects", label: "Visual Effects" },
];

const CastGrid = ({ tmdbId, mediaType }: Props) => {
  const [page, setPage] = useState(1);
  const [castType, setCastType] = useState("Acting");

  const { data: casts, isLoading: isCastLoading } = useCast(
    tmdbId,
    mediaType,
    "cast",
  );
  const { data: crews, isLoading: isCrewLoading } = useCast(
    tmdbId,
    mediaType,
    "crew",
  );
  const { data: tmdb, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredCasts = useMemo(() => {
    if (castType === "Acting")
      return casts.filter((cast) => cast.known_for_department === castType);
    else return crews.filter((crew) => crew.department === castType);
  }, [casts, castType]);

  const paginatedCasts = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return filteredCasts.slice(start, end);
  };

  const totalPages = Math.max(1, Math.ceil(filteredCasts.length / 20));

  useEffect(() => {
    setPage(1);
  }, [castType]);

  useEffect(() => {
    if (page > totalPages) {
      return;
    }
  }, [page]);

  return (
    <section className="mt-10">
      {!tmdb || detailsLoading ? (
        <MovieTitleSkeleton />
      ) : (
        <MovieTitle movie={tmdb} mediaType={mediaType} title="Cast & Crew" />
      )}
      {!isCastLoading &&
        !isCrewLoading &&
        casts.length > 0 &&
        crews.length > 0 && (
          <Card className="mt-5 min-w-0 rounded-none">
            <Tabs
              value={castType}
              onValueChange={setCastType}
              className="hide-scrollbar overflow-scroll"
            >
              <TabsList className="h-fit gap-5 bg-transparent p-0">
                {castTypes.map((type) => {
                  const count =
                    type.value === "Acting"
                      ? casts.filter(
                          (cast) => cast.known_for_department === type.value,
                        ).length
                      : crews.filter((crew) => crew.department === type.value)
                          .length;

                  if (count === 0) return null;

                  return (
                    <TabsTrigger
                      key={type.value}
                      value={type.value}
                      className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
                    >
                      {type.label}
                      <span className="font-medium text-neutral-300">
                        {count}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </Card>
        )}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isCastLoading || isCrewLoading
          ? [...Array(5)].map((_, index) => (
              <CastGridCardSkeleton key={index} />
            ))
          : paginatedCasts().map((cast, index) => (
              <CastGridCard cast={cast} type={castType} key={index} />
            ))}
      </div>
      {filteredCasts.length > 20 && (
        <div className="mt-10 flex w-full justify-center">
          <CustomPagination count={totalPages} page={page} setPage={setPage} />
        </div>
      )}
      {!isCastLoading && !isCrewLoading && paginatedCasts().length === 0 && (
        <p className="my-10 flex w-full justify-center text-sm text-gray-400">
          No cast & crew found.
        </p>
      )}
    </section>
  );
};

export default CastGrid;
