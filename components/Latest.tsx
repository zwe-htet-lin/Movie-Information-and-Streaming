"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMovies, useTvs } from "@/hooks/useTMDB";
import { Movie } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MovieTrendingCard } from "./MovieCard";
import { MovieTrendingCardSkeleton } from "./MovieCardSkeleton";

const Latest = () => {
  const { data: movies, isLoading: movieLoading } = useMovies();
  const { data: tvs, isLoading: tvLoading } = useTvs();

  const [value, setValue] = useState("movie");

  const tabVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const renderList = (movies: Movie[]) => (
    <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
      {movies.map((movie, index) => (
        <MovieTrendingCard key={index} movie={movie} mediaType={value} />
      ))}
    </div>
  );

  return (
    <div className="w-full py-10">
      <div className="mb-2 flex items-center">
        <div className="flex items-center">
          <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
          <h2 className="mr-3 text-xl font-bold sm:mr-4 sm:text-2xl">LATEST</h2>
        </div>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList className="gap-1 bg-transparent p-0 sm:gap-1">
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
      {movieLoading || tvLoading ? (
        <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
          {[...Array(20)].map((_, index) => (
            <MovieTrendingCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Tabs value={value} onValueChange={setValue} className="w-full">
          <AnimatePresence mode="wait">
            {value === "movie" && (
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
            {value === "tv" && (
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
      )}
    </div>
  );
};

export default Latest;
