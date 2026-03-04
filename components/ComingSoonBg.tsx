import { Movie } from "@/types/tmdb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Props {
  mediaType: string;
  movies: Movie[];
  tvs: Movie[];
}

const ComingSoonBg = ({ mediaType, movies, tvs }: Props) => {
  const [backdropIndex, setBackdropIndex] = useState(0);

  const backdropItems = useMemo(() => {
    if (mediaType === "movie") {
      return movies.filter((movie) => movie.backdrop_path);
    } else {
      return tvs.filter((tv) => tv.backdrop_path);
    }
  }, [movies, tvs, mediaType]);

  const randomMovieBackdrop = useMemo(() => {
    if (!backdropItems.length) return null;
    return backdropItems[backdropIndex % backdropItems.length];
  }, [backdropItems, backdropIndex]);

  // Auto-rotate background every 5 seconds
  useEffect(() => {
    if (!backdropItems.length) return;

    const interval = setInterval(() => {
      setBackdropIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [backdropItems.length]);

  // Reset index when switching tabs
  useEffect(() => {
    setBackdropIndex(0);
  }, [mediaType]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={randomMovieBackdrop?.id}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: randomMovieBackdrop?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${randomMovieBackdrop.backdrop_path})`
            : undefined,
        }}
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: -20 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </AnimatePresence>
  );
};

export default ComingSoonBg;
