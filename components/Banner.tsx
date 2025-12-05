"use client";

import { Button } from "@/components/ui/button";
import { useContentRating, useMovieDetails, useTrailer } from "@/hooks/useTMDB";
import { getYear } from "@/lib/utils";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import BannerActions from "./BannerActions";
import BannerSkeleton from "./BannerSkeleton";
import TrailerDialog from "./TrailerDialog";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const Banner = ({ tmdbId, mediaType }: Props) => {
  const { data: tmdb, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType
  );

  const { data: trailers, isLoading: trailerLoading } = useTrailer(
    tmdbId,
    mediaType
  );

  const { data: contents, isLoading: ratingLoading } = useContentRating(
    tmdbId,
    mediaType
  );

  const [openDialog, setOpenDialog] = useState(false);

  const trailerKey = () => {
    if (!trailers?.results) return "";
    const filteredTrailers = trailers.results.filter(
      (item) => item.type === "Trailer"
    );
    return filteredTrailers.length
      ? filteredTrailers[0].key
      : trailers.results[0]?.key || "";
  };

  const contentRating = () => {
    if (!contents?.results || !tmdb) return "";
    const country = tmdb.origin_country?.[0];

    const getRating = (country: string) => {
      const entry = contents.results.find(
        (item) => item.iso_3166_1 === country
      );
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

  if (!tmdb || detailsLoading || trailerLoading || ratingLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div
      className="relative w-full h-[70vh] md:h-screen bg-cover bg-center text-center md:text-left"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${tmdb.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_#181818_0%,_#181818_0%,_rgba(24,24,24,0)_100%)]"></div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start px-5 pb-10 lg:w-3/4 md:w-5/6">
        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {tmdb.title || tmdb.name}
        </h1>

        <div className="flex flex-wrap items-center font-semibold space-x-5 text-gray-300 text-sm py-2 md:py-4">
          {contentRating && (
            <span className="px-2 border rounded-full border-gray-300 text-xs">
              {contentRating()}
            </span>
          )}
          {tmdb.vote_average && (
            <span className="flex items-center">
              <StarIcon className="w-4 h-4 mr-1" />
              {tmdb.vote_average.toFixed(1)}
            </span>
          )}
          <span>{getYear(tmdb.release_date || tmdb!.first_air_date)}</span>
          <span className="hidden md:inline">
            {tmdb.genres?.map((g: any) => g.name).join(", ")}
          </span>
          {tmdb.runtime && <span>{tmdb!.runtime} min</span>}
        </div>
        
        <span className="md:hidden text-gray-300 text-sm mb-4">
          {tmdb.genres?.map((g: any) => g.name).join(", ")}
        </span>

        {tmdb.tagline && (
          <p className="font-medium text-gray-300 text-sm">{tmdb.tagline}</p>
        )}

        <p className="font-medium text-gray-200 mt-2 max-h-24 overflow-y-scroll hide-scrollbar">
          {tmdb.overview}
        </p>

        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => setOpenDialog(true)}
            className="rounded-full text-sm p-6 font-semibold"
          >
            <PlayCircleFilledIcon /> WATCH TRAILER
          </Button>
          <TrailerDialog
            open={openDialog}
            setOpen={setOpenDialog}
            trailer={trailerKey()}
          />
          <BannerActions movie={tmdb} mediaType={mediaType!} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
