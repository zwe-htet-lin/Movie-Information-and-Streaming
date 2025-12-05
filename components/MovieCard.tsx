import { getGenres, getYear } from "@/lib/utils";
import { Movie } from "@/types/tmdb";
import Link from "next/link";
import ActionMenu from "./ActionMenu";
import { Card } from "./ui/card";

interface Props {
  movie: Movie;
  mediaType: string;
  size?: "default" | "trending";
}

const MovieCardBase = ({ movie, mediaType, size = "default" }: Props) => {
  const cardClasses =
    size === "trending"
      ? "relative w-40 sm:w-44 md:w-48 h-68 md:h-72"
      : "relative";

  return (
    <Card
      className={`${cardClasses} p-0 border-0 flex flex-shrink-0 overflow-hidden cursor-pointer`}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/no-image-available.png"
        }
        alt={movie.title || movie.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute z-50 right-0">
        <ActionMenu movie={movie} mediaType={mediaType} />
      </div>
      <Link
        href={`/${mediaType}/${movie.id}`}
        className="absolute w-full h-full transition-colors duration-300 ease-out bg-gradient-to-t from-black via-black/30 hover:via-primary/50 focus:via-primary/50 p-2 flex flex-col justify-end"
      >
        <p className="text-xs font-medium text-gray-300 leading-tight cursor-auto">
          {getYear(movie.release_date || movie.first_air_date)}
        </p>
        <p className="block my-2 text-white font-semibold text-sm leading-tight line-clamp-2 transition-all hover:opacity-80">
          {movie.title || movie.name}
        </p>
        <p className="text-sm font-semibold text-primary leading-tight cursor-auto">
          {movie.genre_ids ? getGenres(mediaType, movie.genre_ids) : "Unknown"}{" "}
        </p>
      </Link>
    </Card>
  );
};

export const MovieCard = (props: Props) => (
  <MovieCardBase {...props} size="default" />
);
export const TrendingMovieCard = (props: Props) => (
  <MovieCardBase {...props} size="trending" />
);
