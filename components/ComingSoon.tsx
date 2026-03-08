"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMovies, useTvs } from "@/hooks/useTMDB";
import { getDateRange } from "@/lib/utils";
import { Movie } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ComingSoonBg from "./ComingSoonBg";
import { MovieComingSoonCard } from "./MovieCard";
import { VideoCardSkeleton } from "./VideoCardSkeleton";

const tabVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const ComingSoon = () => {
  const { start, end } = getDateRange(30, "future");

  const [mediaType, setMediaType] = useState("movie");

  const movieParams = `primary_release_date.gte=${start}&primary_release_date.lte=${end}`;
  const tvParams = `first_air_date.gte=${start}&first_air_date.lte=${end}`;

  const {
    data: { searchResults: movies },
    isLoading: movieLoading,
  } = useMovies(movieParams);
  const {
    data: { searchResults: tvs },
    isLoading: tvLoading,
  } = useTvs(tvParams);

  const renderList = (movies: Movie[]) => (
    <div className="flex gap-6 overflow-x-auto scroll-smooth pt-5 pb-10">
      {movies.map((movie, index) => (
        <MovieComingSoonCard key={index} movie={movie} mediaType={mediaType} />
      ))}
    </div>
  );

  const ComingSoonLayout = ({
    children,
  }: Readonly<{ children: React.ReactNode }>) => (
    <section className="relative my-0 w-full bg-cover bg-center pt-10">
      <ComingSoonBg mediaType={mediaType} movies={movies} tvs={tvs} />
      <div className="absolute inset-0 h-full w-full bg-black/30"></div>
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
            <h2 className="mr-3 text-xl font-bold sm:mr-4 sm:text-2xl">
              COMING SOON
            </h2>
          </div>
          <Tabs value={mediaType} onValueChange={setMediaType}>
            <TabsList className="gap-1 bg-transparent p-0 sm:gap-2">
              <TabsTrigger
                value="movie"
                className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="tv"
                className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
              >
                TV Shows
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {children}
      </div>
    </section>
  );

  if (movieLoading || tvLoading)
    return (
      <ComingSoonLayout>
        <div className="flex gap-6 overflow-x-auto scroll-smooth py-5 pb-10">
          {[...Array(20)].map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </ComingSoonLayout>
    );

  return (
    <ComingSoonLayout>
      <Tabs value={mediaType} onValueChange={setMediaType} className="w-full">
        <AnimatePresence mode="wait">
          {mediaType === "movie" && (
            <TabsContent value="movie" forceMount>
              <motion.div
                key="movie"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {renderList(movies)}
              </motion.div>
            </TabsContent>
          )}
          {mediaType === "tv" && (
            <TabsContent value="tv" forceMount>
              <motion.div
                key="tv"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {renderList(tvs)}
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </ComingSoonLayout>
  );
};

export default ComingSoon;
