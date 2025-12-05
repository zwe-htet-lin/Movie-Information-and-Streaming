"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrendingDay, useTrendingWeek } from "@/hooks/useTMDB";
import { Movie } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TrendingMovieCard } from "./MovieCard";
import { TrendingMovieCardSkeleton } from "./MovieCardSkeleton";

const Trending = () => {
  const {
    data: todays,
    isLoading: todayLoading,
    error: todayError,
  } = useTrendingDay();
  const {
    data: weeks,
    isLoading: weekLoading,
    error: weekError,
  } = useTrendingWeek();

  const [value, setValue] = useState("today");

  const tabVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const renderList = (movies: Movie[]) => (
    <div className="flex gap-3 overflow-x-auto py-5 scroll-smooth">
      {movies
        .filter((m) => m.media_type !== "person")
        .map((movie, index) => (
          <TrendingMovieCard
            key={index}
            movie={movie}
            mediaType={movie.media_type}
          />
        ))}
    </div>
  );

  return (
    <div className="w-full px-5 py-10">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-bold mr-4">TRENDING</h2>
        <Tabs value={value} onValueChange={setValue} className="w-auto">
          <TabsList className="bg-transparent p-0 gap-2">
            <TabsTrigger
              value="today"
              className="text-sm px-4 py-1 font-semibold rounded-full transition-all duration-300 hover:bg-primary/10 data-[state=active]:border-primary data-[state=active]:scale-105 cursor-pointer"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="text-sm px-4 py-1 font-semibold rounded-full transition-all duration-300 hover:bg-primary/10 data-[state=active]:border-primary data-[state=active]:scale-105 cursor-pointer"
            >
              This Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {todayLoading || weekLoading ? (
        <div className="flex gap-3 overflow-x-auto py-5 scroll-smooth">
          {[...Array(20)].map((_, index) => (
            <TrendingMovieCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <Tabs value={value} onValueChange={setValue} className="w-full">
          <AnimatePresence mode="wait">
            {value === "today" && (
              <TabsContent value="today" forceMount>
                <motion.div
                  key="today"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {renderList(todays!.results)}
                </motion.div>
              </TabsContent>
            )}
            {value === "week" && (
              <TabsContent value="week" forceMount>
                <motion.div
                  key="week"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {renderList(weeks!.results)}
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};

export default Trending;
