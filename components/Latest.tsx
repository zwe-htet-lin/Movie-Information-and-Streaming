import { useMovies, useTvs } from "@/hooks/useTMDB";
import { Movie } from "@/types/tmdb";
import { Tabs, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieCardSkeleton } from "./MovieCardSkeleton";
import { TabsList } from "./ui/tabs";

const Latest = () => {
  const {
    data: movies,
    isLoading: movieLoading,
    error: movieError,
  } = useMovies();
  const { data: tvs, isLoading: tvLoading, error: tvError } = useTvs();

  const [mediaType, setMediaType] = useState("movie");

  const tabVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const renderList = (movies: Movie[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} mediaType={mediaType} />
      ))}
    </div>
  );

  return (
    <div className="w-full px-5 py-10">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold mr-4">LATEST</h2>
        <Tabs value={mediaType} onValueChange={setMediaType} className="w-auto">
          <TabsList className="bg-transparent p-0 gap-2">
            <TabsTrigger
              value="movie"
              className="text-sm px-4 py-2 font-semibold rounded-full transition-all duration-300 text-white hover:bg-primary/10 border border-transparent data-[state=active]:border-primary data-[state=active]:scale-105 cursor-pointer"
            >
              Movies
            </TabsTrigger>
            <TabsTrigger
              value="tv"
              className="text-sm px-4 py-2 font-semibold rounded-full transition-all duration-300 text-white hover:bg-primary/10 border border-transparent data-[state=active]:border-primary data-[state=active]:scale-105 cursor-pointer"
            >
              TV Shows
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {movieLoading || tvLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
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
                  {renderList(movies!.results)}
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
                  {renderList(tvs!.results)}
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
