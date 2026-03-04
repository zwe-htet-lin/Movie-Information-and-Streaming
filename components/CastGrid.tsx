"use client";

import { useCast, useMovieDetails } from "@/hooks/useTMDB";
import { useState } from "react";
import { CastGridCard } from "./CastCard";
import { CastGridCardSkeleton } from "./CastCardSkeleton";
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

  const [castType, setCastType] = useState("Acting");

  const filteredCasts = () => {
    if (castType === "Acting")
      return casts.filter((cast) => cast.known_for_department === castType);
    else return crews.filter((crew) => crew.department === castType);
  };

  return (
    <div className="pt-10">
      {!tmdb || detailsLoading ? (
        <MovieTitleSkeleton />
      ) : (
        <MovieTitle movie={tmdb} mediaType={mediaType} title="Cast & Crew" />
      )}
      {!isCastLoading && !isCrewLoading && casts.length > 0 && (
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
      <div className="grid grid-cols-2 gap-4 pt-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isCastLoading || isCrewLoading
          ? [...Array(20)].map((_, index) => (
              <CastGridCardSkeleton key={index} />
            ))
          : filteredCasts().map((cast, index) => (
              <CastGridCard cast={cast} type={castType} key={index} />
            ))}
      </div>
      {/* <div className="mt-10 flex justify-center">
        <CustomPagination
          route={`/${mediaType}/${param}/cast?`}
          page={page}
          count={totalPages}
        />
      </div> */}
      {!isCastLoading && !isCrewLoading && filteredCasts().length === 0 && (
        <p className="col-span-full py-10 text-center text-sm text-gray-400">
          No cast & crew found.
        </p>
      )}
    </div>
  );
};

export default CastGrid;
