import { formatToSlug } from "@/lib/utils";
import { Movie } from "@/types/tmdb";
import { ChevronDown, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  movie: Movie;
  mediaType: string;
  title: string;
}

const MovieTitle = ({ movie, mediaType, title }: Props) => {
  const moviePath = formatToSlug(movie.title || movie.name);

  return (
    <Card className="rounded-none">
      <div className="mb-5 flex items-center justify-between">
        <Link
          href={`/${mediaType}/${movie.id}-${moviePath}`}
          className="flex w-fit items-center"
        >
          <ChevronLeft />
          <Button variant="link" className="p-0 text-base text-white">
            Back
          </Button>
        </Link>
        {mediaType !== "person" && (
          <div className="hidden items-center space-x-3 sm:flex sm:space-x-5">
            <Link href={`/${mediaType}/${movie.id}-${moviePath}/cast`}>
              <Button variant="link" className="p-0 text-base text-white">
                Casts
              </Button>
            </Link>
            <Link href={`/${mediaType}/${movie.id}-${moviePath}/video`}>
              <Button variant="link" className="p-0 text-base text-white">
                Videos
              </Button>
            </Link>
            <Link href={`/${mediaType}/${movie.id}-${moviePath}/image`}>
              <Button variant="link" className="p-0 text-base text-white">
                Images
              </Button>
            </Link>
          </div>
        )}
        {mediaType !== "person" && (
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="group flex items-center gap-1 font-medium">
                  Media
                  <ChevronDown className="size-5 rotate-0 transition duration-300 group-data-[state=open]:rotate-180" />
                </p>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="center" className="w-fit">
                <DropdownMenuItem asChild className="font-medium">
                  <Link href={`/${mediaType}/${movie.id}-${moviePath}/cast`}>
                    Casts
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="font-medium">
                  <Link href={`/${mediaType}/${movie.id}-${moviePath}/video`}>
                    Videos
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="font-medium">
                  <Link href={`/${mediaType}/${movie.id}-${moviePath}/image`}>
                    Images
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex items-end gap-3 md:gap-4">
        <Card
          className={`relative flex h-[120px] w-[80px] flex-shrink-0 cursor-pointer overflow-hidden border-0 p-0 md:h-[135px] md:w-[90px] lg:h-[150px] lg:w-[100px]`}
        >
          <img
            src={
              movie.poster_path || movie.profile_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path || movie.profile_path}`
                : "/no-image-available.png"
            }
            alt={movie.title || movie.name}
            className="h-full w-full object-cover"
          />
          <Link
            href={`/${mediaType}/${movie.id}-${moviePath}`}
            className="hover:via-primary/20 hover:from-primary/10 focus:via-primary/50 absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/20 via-black/10 transition duration-300 ease-in-out"
          ></Link>
        </Card>
        <div>
          <Link href={`/${mediaType}/${movie.id}-${moviePath}`}>
            <Button
              variant="link"
              className="mb-0 p-0 text-left text-lg leading-none font-semibold whitespace-normal text-white md:mb-1 md:text-xl lg:text-2xl"
            >
              {movie.name || movie.title}
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </Card>
  );
};

export default MovieTitle;
