"use client";

import { Button } from "@/components/ui/button";
import {
  useContentRating,
  useMovieDetails,
  useSocial,
  useVideos,
} from "@/hooks/useTMDB";
import { formatToSlug, getVideoKey, getYear } from "@/lib/utils";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { AnimatePresence, motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BannerActions from "./BannerActions";
import BannerSkeleton from "./BannerSkeleton";
import SocialLinks from "./SocialLinks";
import VideoDialog from "./VideoDialog";

interface Props {
  banners: Array<{ tmdbId: number; mediaType: string }>;
}

const Banner = ({ banners }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openTrailerDialog, setOpenTrailerDialog] = useState(false);

  const currentBanner = banners[currentIndex];

  const { data: tmdb, isLoading: detailsLoading } = useMovieDetails(
    currentBanner.tmdbId,
    currentBanner.mediaType,
  );

  const { data: trailers, isLoading: trailerLoading } = useVideos(
    currentBanner.tmdbId,
    currentBanner.mediaType,
  );

  const { data: contents, isLoading: ratingLoading } = useContentRating(
    currentBanner.tmdbId,
    currentBanner.mediaType,
  );

  const { data: social, isLoading: socialLoading } = useSocial(
    currentBanner.tmdbId,
    currentBanner.mediaType,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, banners.length, 5000]);

  const contentRating = () => {
    if (!tmdb) return "";
    const country = tmdb.origin_country?.[0];

    const getRating = (country: string) => {
      const entry = contents.find((item) => item.iso_3166_1 === country);
      if (!entry) return "";

      if ("release_dates" in entry) {
        const certs = entry.release_dates
          ?.map((item) => item.certification)
          .filter(Boolean);
        return certs?.[0] || "";
      }

      if ("rating" in entry) {
        return entry.rating || "";
      }

      return "";
    };

    return getRating("US") || getRating(country) || getRating("SG") || "?";
  };

  if (
    !tmdb ||
    !social ||
    detailsLoading ||
    trailerLoading ||
    ratingLoading ||
    socialLoading
  ) {
    return <BannerSkeleton />;
  }

  return (
    <section className="relative h-[70vh] w-full overflow-hidden text-center md:h-screen md:text-left">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.tmdbId}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${tmdb.backdrop_path})`,
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,_#181818_0%,_#181818_0%,_rgba(24,24,24,0)_100%)]"></div>

      <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-end px-5 pb-10 md:items-start md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner.tmdbId}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:w-5/6 lg:w-3/4">
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                <Link
                  href={`/${currentBanner.mediaType}/${currentBanner.tmdbId}-${formatToSlug(tmdb.name || tmdb.title)}`}
                  className="w-fit underline-offset-4 transition duration-300 hover:opacity-75 focus:underline focus:opacity-75"
                >
                  {tmdb.title || tmdb.name}
                </Link>
              </h1>
              <div className="flex w-full flex-wrap items-center justify-center space-x-5 py-2 text-sm font-semibold text-gray-300 md:justify-start md:py-4">
                {contentRating() && (
                  <span className="rounded-full border border-gray-300 px-2 text-xs">
                    {contentRating()}
                  </span>
                )}
                {tmdb.vote_average && (
                  <span className="flex items-center">
                    <StarIcon className="mr-1 h-4 w-4" />
                    {tmdb.vote_average.toFixed(1)}
                  </span>
                )}
                <span>
                  {getYear(tmdb.release_date || tmdb!.first_air_date)}
                </span>
                <span className="hidden md:inline">
                  {tmdb.genres?.map((g: any) => g.name).join(", ")}
                </span>
                {tmdb.runtime && <span>{tmdb!.runtime} min</span>}
              </div>
              <span className="mb-4 w-full text-sm text-gray-300 md:hidden">
                {tmdb.genres?.map((g: any) => g.name).join(", ")}
              </span>
              {tmdb.tagline && (
                <p className="w-full text-sm font-medium text-gray-300">
                  {tmdb.tagline}
                </p>
              )}
              <p className="hide-scrollbar mt-2 max-h-[125px] w-full overflow-y-scroll font-medium text-gray-200">
                {tmdb.overview}
              </p>
            </div>

            <div className="mt-4 flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setOpenTrailerDialog(true)}
                  className="rounded-full p-6 text-sm font-semibold"
                >
                  <PlayCircleFilledIcon /> WATCH TRAILER
                </Button>
                <VideoDialog
                  open={openTrailerDialog}
                  setOpen={setOpenTrailerDialog}
                  videoName="Play Trailer"
                  videoKey={getVideoKey(trailers)}
                />
                <BannerActions
                  movie={tmdb}
                  mediaType={currentBanner.mediaType}
                />
              </div>
              <SocialLinks social={social} homepage={tmdb.homepage} />
            </div>
          </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
          <div className="mt-5 -mb-5 flex w-full justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;

// Math.floor(Math.random() * banners.length);
