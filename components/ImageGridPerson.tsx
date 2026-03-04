"use client"

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useMemo } from "react";
import { GridImageCard } from "./ImageCard";
import { GridPosterImageCardSkeleton } from "./ImageCardSkeleton";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const ImageGridPerson = ({ tmdbId, mediaType, param }: Props) => {
  const { data: profiles, isLoading } = useImages(tmdbId, mediaType, "profile");
  const { data: movie, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredProfiles = useMemo(() => {
    if (!profiles || !profiles.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = profiles.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return profiles;
  }, [profiles, movie]);

  const grid = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  if (isLoading || detailsLoading) {
    return (
      <div className="pt-10">
        <MovieTitleSkeleton />
        <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
          {[...Array(10)].map((_, i) => (
            <GridPosterImageCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="pt-10">
        <MovieTitle movie={movie!} mediaType={mediaType} title="Images" />
        <p className="py-20 text-center text-sm text-gray-400">
          No images found.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-10">
      <MovieTitle movie={movie!} mediaType={mediaType} title="Images" />

      <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((image, index) => (
            <GridImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type="person"
              index={index}
            />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-sm text-gray-400">
            No images found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageGridPerson;
