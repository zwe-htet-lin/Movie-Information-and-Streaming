"use client"

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setImageGalleryType } from "@/store/slices/imageGallerySlice";
import { useEffect, useMemo } from "react";
import { GridImageCard } from "./ImageCard";
import {
  GridBackdropImageCardSkeleton,
  GridPosterImageCardSkeleton,
} from "./ImageCardSkeleton";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const ImageGrid = ({ tmdbId, mediaType, param }: Props) => {
  const dispatch = useAppDispatch();
  const imageGalleryType = useAppSelector((s) => s.imageGallery.value.type);

  const { data: backdrops, isLoading: isBackdropLoading } = useImages(
    tmdbId,
    mediaType,
    "backdrop",
  );
  const { data: posters, isLoading: isPosterLoading } = useImages(
    tmdbId,
    mediaType,
    "poster",
  );
  const { data: profiles, isLoading: isProfileLoading } = useImages(
    tmdbId,
    mediaType,
    "profile",
  );
  const { data: movie, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredBackdrops = useMemo(() => {
    if (!backdrops || !backdrops.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = backdrops.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return backdrops;
  }, [backdrops, movie]);

  const filteredPosters = useMemo(() => {
    if (!posters || !posters.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = posters.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return posters;
  }, [posters, movie]);

  // Auto-switch to available tab if current tab is empty
  useEffect(() => {
    if (
      imageGalleryType === "backdrop" &&
      filteredBackdrops.length === 0 &&
      filteredPosters.length > 0
    ) {
      dispatch(setImageGalleryType("poster"));
    } else if (
      imageGalleryType === "poster" &&
      filteredPosters.length === 0 &&
      filteredBackdrops.length > 0
    ) {
      dispatch(setImageGalleryType("backdrop"));
    }
  }, [
    filteredBackdrops.length,
    filteredPosters.length,
    imageGalleryType,
    dispatch,
  ]);

  const grid =
    imageGalleryType === "backdrop"
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  // Show loading state
  if (isBackdropLoading || isPosterLoading || detailsLoading) {
    return (
      <div className="pt-10">
        <MovieTitleSkeleton />
        <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
          {imageGalleryType === "backdrop"
            ? [...Array(6)].map((_, i) => (
                <GridBackdropImageCardSkeleton key={i} />
              ))
            : [...Array(8)].map((_, i) => (
                <GridPosterImageCardSkeleton key={i} />
              ))}
        </div>
      </div>
    );
  }

  // Show message when both are empty
  if (filteredBackdrops.length === 0 && filteredPosters.length === 0) {
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

      <Card className="mt-5 min-w-0 rounded-none">
        <Tabs
          value={imageGalleryType}
          onValueChange={(value) => dispatch(setImageGalleryType(value))}
          className="hide-scrollbar overflow-scroll"
        >
          <TabsList className="h-fit gap-5 bg-transparent p-0">
            {filteredBackdrops.length > 0 && (
              <TabsTrigger
                value="backdrop"
                className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
              >
                Backdrops{" "}
                <span className="font-medium text-neutral-300">
                  {filteredBackdrops.length}
                </span>
              </TabsTrigger>
            )}
            {filteredPosters.length > 0 && (
              <TabsTrigger
                value="poster"
                className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
              >
                Posters{" "}
                <span className="font-medium text-neutral-300">
                  {filteredPosters.length}
                </span>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </Card>

      <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
        {imageGalleryType === "backdrop" &&
          (filteredBackdrops.length > 0 ? (
            filteredBackdrops.map((image, index) => (
              <GridImageCard
                key={index}
                image={image}
                mediaType={mediaType}
                param={param}
                type="backdrop"
                index={index}
              />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-sm text-gray-400">
              No backdrops found.
            </p>
          ))}

        {imageGalleryType === "poster" &&
          (filteredPosters.length > 0 ? (
            filteredPosters.map((image, index) => (
              <GridImageCard
                key={index}
                image={image}
                mediaType={mediaType}
                param={param}
                type="poster"
                index={index}
              />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-sm text-gray-400">
              No posters found.
            </p>
          ))}
      </div>
    </div>
  );
};

export default ImageGrid;
