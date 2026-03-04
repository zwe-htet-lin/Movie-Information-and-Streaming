"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrendingDay, useTrendingWeek } from "@/hooks/useTMDB";
import { Movie } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MovieTrendingCard } from "./MovieCard";
import { MovieTrendingCardSkeleton } from "./MovieCardSkeleton";

const Trending = () => {
  const { data: todays, isLoading: todayLoading } = useTrendingDay();
  const { data: weeks, isLoading: weekLoading } = useTrendingWeek();

  const [value, setValue] = useState("today");

  const tabVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const renderList = (movies: Movie[]) => (
    <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
      {movies
        .filter((m) => m.media_type !== "person")
        .map((movie, index) => (
          <MovieTrendingCard
            key={index}
            movie={movie}
            mediaType={movie.media_type}
          />
        ))}
    </div>
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
          <h2 className="mr-3 text-xl font-bold sm:mr-4 sm:text-2xl">
            TRENDING
          </h2>
        </div>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList className="gap-1 bg-transparent p-0 sm:gap-2">
            <TabsTrigger
              value="today"
              className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="week"
              className="hover:bg-primary/10 focus:bg-primary/10 data-[state=active]:border-primary cursor-pointer rounded-full border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 data-[state=active]:scale-105 sm:px-4"
            >
              This Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {todayLoading || weekLoading ? (
        <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
          {[...Array(20)].map((_, index) => (
            <MovieTrendingCardSkeleton key={index} />
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
                  {renderList(todays)}
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
                  {renderList(weeks)}
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      )}
    </section>
  );
};

export default Trending;
