"use client";

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useEffect, useMemo, useState } from "react";
import CustomPagination from "./CustomPagination";
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
  const [page, setPage] = useState(1);

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

  const paginatedProfiles = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return filteredProfiles.slice(start, end);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / 20));

  const grid = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  useEffect(() => {
    if (page > totalPages) {
      return;
    }
  }, [page]);

  return (
    <section className="mt-10">
      {!movie || detailsLoading ? (
        <MovieTitleSkeleton />
      ) : (
        <MovieTitle movie={movie} mediaType={mediaType} title="Images" />
      )}
      <div className={`grid ${grid} mt-5 gap-x-5 gap-y-10`}>
        {isLoading &&
          [...Array(5)].map((_, index) => (
            <GridPosterImageCardSkeleton key={index} />
          ))}
        {!isLoading &&
          paginatedProfiles().map((image, index) => (
            <GridImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type="person"
              index={(page - 1) * 21 + index}
            />
          ))}
      </div>
      {!isLoading && filteredProfiles.length > 20 && (
        <div className="mt-10 flex w-full justify-center">
          <CustomPagination count={totalPages} page={page} setPage={setPage} />
        </div>
      )}
      {!isLoading && paginatedProfiles().length === 0 && (
        <p className="my-10 flex w-full justify-center text-sm text-gray-400">
          No images found.
        </p>
      )}
    </section>
  );
};

export default ImageGridPerson;
