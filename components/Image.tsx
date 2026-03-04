"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setImageGalleryType } from "@/store/slices/imageGallerySlice";
import { Image as ImageType } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { BackdropImageCard, PosterImageCard } from "./ImageCard";
import {
  BackdropImageCardSkeleton,
  PosterImageCardSkeleton,
} from "./ImageCardSkeleton";
import { Button } from "./ui/button";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const tabVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const Image = ({ tmdbId, mediaType, param }: Props) => {
  const dispatch = useAppDispatch();
  const imageGalleryType = useAppSelector((s) => s.imageGallery.value.type);

  const { data: backdrops, isLoading: isLoadingBackdrops } = useImages(
    tmdbId,
    mediaType,
    "backdrop",
  );
  const { data: posters, isLoading: isLoadingPosters } = useImages(
    tmdbId,
    mediaType,
    "poster",
  );
  const { data: movie } = useMovieDetails(tmdbId, mediaType);

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

  useEffect(() => {
    dispatch(setImageGalleryType("backdrop"));
  }, [dispatch]);

  const handleImageType = (value: string) => {
    dispatch(setImageGalleryType(value));
  };

  const renderList = (images: ImageType[]) => (
    <div className="flex gap-6 overflow-x-auto scroll-smooth py-5 pb-10">
      {images
        .slice(0, 10)
        .map((image, index) =>
          imageGalleryType === "backdrop" ? (
            <BackdropImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type={imageGalleryType}
              index={index}
            />
          ) : (
            <PosterImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type={imageGalleryType}
              index={index}
            />
          ),
        )}
    </div>
  );

  const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <section className="relative mx-auto mt-10 w-full max-w-7xl px-5 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
          <h2 className="mr-3 text-xl font-bold sm:mr-4 sm:text-2xl">IMAGES</h2>
          <Tabs
            value={imageGalleryType}
            onValueChange={(value) => handleImageType(value)}
          >
            <TabsList className="gap-1 bg-transparent p-0 sm:gap-2">
              {filteredBackdrops.length > 0 && (
                <TabsTrigger
                  value="backdrop"
                  className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
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
                  className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
                >
                  Posters{" "}
                  <span className="font-medium text-neutral-300">
                    {filteredPosters.length}
                  </span>
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>
        <Link
          href={`/${mediaType}/${param}/image`}
          className="hidden md:inline"
        >
          <Button variant="link" className="p-0 underline">
            View All {imageGalleryType === "backdrop" ? "Backdrops" : "Posters"}
          </Button>
        </Link>
      </div>
      <div className="flex justify-end md:hidden">
        <Link href={`/${mediaType}/${param}/image`}>
          <Button variant="link" className="p-0 underline">
            View All Images
          </Button>
        </Link>
      </div>
      {children}
    </section>
  );

  if (isLoadingBackdrops || isLoadingPosters) {
    return (
      <Layout>
        <div className="flex gap-6 overflow-x-auto scroll-smooth py-5 pb-10">
          {[...Array(10)].map((_, index) =>
            imageGalleryType === "backdrop" ? (
              <BackdropImageCardSkeleton key={index} />
            ) : (
              <PosterImageCardSkeleton key={index} />
            ),
          )}
        </div>
      </Layout>
    );
  }

  if (filteredBackdrops.length === 0 && filteredPosters.length === 0) {
    return null;
  }

  return (
    <Layout>
      <Tabs
        value={imageGalleryType}
        onValueChange={(value) => handleImageType(value)}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          {imageGalleryType === "backdrop" && filteredBackdrops.length > 0 && (
            <TabsContent value="backdrop" forceMount>
              <motion.div
                key="backdrop"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {renderList(filteredBackdrops)}
              </motion.div>
            </TabsContent>
          )}
          {imageGalleryType === "poster" && filteredPosters.length > 0 && (
            <TabsContent value="poster" forceMount>
              <motion.div
                key="poster"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {renderList(filteredPosters)}
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </Layout>
  );
};

export default Image;
