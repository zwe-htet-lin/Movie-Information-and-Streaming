"use client";

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const VideoBg = ({ tmdbId, mediaType }: Props) => {
  const { data: images, isLoading } = useImages(tmdbId, mediaType, "backdrop");
  const { data: movie } = useMovieDetails(tmdbId, mediaType);

  const [backdropIndex, setBackdropIndex] = useState(0);

  const backdropItems = useMemo(() => {
    if (!images || images.length === 0) return [];

    const origin = movie?.origin_country?.[0];

    const filteredImages = images.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filteredImages.length > 0) return filteredImages.slice(0, 10);

    return images;
  }, [images, movie]);

  const randomBackdrop = useMemo(() => {
    if (!backdropItems || backdropItems.length === 0) return null;
    return backdropItems[backdropIndex % backdropItems.length];
  }, [backdropItems, backdropIndex]);

  // Auto-rotate backdrop
  useEffect(() => {
    if (!backdropItems || backdropItems.length <= 1) return;

    const interval = setInterval(() => {
      setBackdropIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [backdropItems]);

  return (
    <>
      {!randomBackdrop ? (
        <div></div>
      ) : (
        // <div className="absolute inset-0 mx-auto h-full w-full max-w-7xl border-t border-b border-neutral-700"></div>
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={randomBackdrop?.file_path || "default"}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: randomBackdrop?.file_path
                  ? `url(https://image.tmdb.org/t/p/original${randomBackdrop.file_path})`
                  : "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 h-full w-full bg-black/30"></div>
        </>
      )}
    </>
  );
};

export default VideoBg;
