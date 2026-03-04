"use client"

import { useVideos } from "@/hooks/useTMDB";
import {
  formatToSlug,
  getFormattedDate,
  getGenres,
  getVideoKey,
} from "@/lib/utils";
import { Movie } from "@/types/tmdb";
import { Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ActionMenu from "./ActionMenu";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import VideoDialog from "./VideoDialog";

interface Props {
  movie: Movie;
  mediaType: string;
  size?: "default" | "trending" | "upcoming";
}

const MovieCardBase = ({ movie, mediaType, size }: Props) => {
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const { data: videos, isLoading } = useVideos(movie.id, mediaType);

  const videoKey = getVideoKey(videos);

  if (isLoading) return null;
  if (size === "upcoming" && !videoKey) return null;

  const cardSize =
    size === "trending"
      ? "h-[280px] w-[170px] sm:h-[300px] sm:w-[185px] md:w-[200px]"
      : "";

  return (
    <>
      {size === "upcoming" ? (
        <div>
          <Card className="group relative flex aspect-video w-[300px] flex-shrink-0 cursor-pointer overflow-hidden border-0 p-0 sm:w-[320px]">
            <img
              src={`https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`}
              alt={movie.name || movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              onClick={() => setOpenVideoDialog(true)}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 backdrop-blur transition group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-white text-white" />
              </div>
            </div>
            <div className="absolute right-0 z-20">
              <ActionMenu movie={movie} mediaType={mediaType} />
            </div>
          </Card>
          <VideoDialog
            open={openVideoDialog}
            setOpen={setOpenVideoDialog}
            videoName={movie.name}
            videoKey={videoKey}
          />
          <div>
            <Link
              href={`/${mediaType}/${movie.id}-${formatToSlug(movie.title || movie.name)}`}
            >
              <Button
                variant="link"
                className="mt-3 mb-2 h-fit p-0 text-left text-base leading-none font-semibold whitespace-normal text-white"
              >
                {movie.name || movie.title}
              </Button>
            </Link>
            <p className="cursor-auto text-sm text-neutral-300">
              {getFormattedDate(movie.release_date || movie.first_air_date)}
            </p>
          </div>
        </div>
      ) : (
        <Card
          className={`${cardSize} group relative flex flex-shrink-0 cursor-pointer overflow-hidden border-0 p-0`}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/no-image-available.png"
            }
            alt={movie.title || movie.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute right-0 z-10">
            <ActionMenu movie={movie} mediaType={mediaType} />
          </div>
          <Link
            href={`/${mediaType}/${movie.id}-${formatToSlug(movie.title || movie.name)}`}
            className="hover:via-primary/30 hover:from-primary/10 focus:via-primary/50 absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 p-2 transition duration-300 ease-in-out"
          >
            <p className="cursor-auto text-xs leading-none font-medium text-gray-300">
              {getFormattedDate(movie.release_date || movie.first_air_date)}
            </p>
            <p className="my-2 line-clamp-2 block text-sm leading-none font-semibold text-white transition-all hover:opacity-80">
              {movie.title || movie.name}
            </p>
            <p className="text-primary cursor-auto text-sm leading-none font-semibold">
              {movie.genre_ids.length > 0 ? getGenres(mediaType, movie.genre_ids) : ""}
            </p>
          </Link>
        </Card>
      )}
    </>
  );
};

export const MovieCard = (props: Props) => (
  <MovieCardBase {...props} size="default" />
);
export const MovieTrendingCard = (props: Props) => (
  <MovieCardBase {...props} size="trending" />
);
export const MovieComingSoonCard = (props: Props) => (
  <MovieCardBase {...props} size="upcoming" />
);
