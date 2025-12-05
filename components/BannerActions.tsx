import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useBookmark } from "@/hooks/useBookmark";
import { useFavorite } from "@/hooks/useFavorite";
import { useRating } from "@/hooks/useRating";
import { getLabelText, labels } from "@/lib/utils";
import { Movie } from "@/types/tmdb";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Rating from "@mui/material/Rating";
import { CircleCheck, CircleX } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  movie: Movie;
  mediaType: string;
}

const BannerActions = ({ movie, mediaType }: Props) => {
  const { status } = useSession();
  const { isFavorite, favorite } = useFavorite(movie, mediaType, status);
  const { isRated, currentRating, rate, clear } = useRating(
    movie,
    mediaType,
    status
  );
  const { isBookmarked, bookmark, currentBookmark, remove } = useBookmark(
    movie,
    mediaType,
    status
  );

  const [hover, setHover] = useState(-1);
  const bookmarks = [
    { label: "To Watch", value: "to-watch" },
    { label: "Watching", value: "watching" },
    { label: "Watched", value: "watched" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isRated ? (
                      <StarIcon className="text-yellow-500" />
                    ) : (
                      <StarBorderIcon className="text-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 space-y-1">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => clear(0)}
                      disabled={!isRated}
                    >
                      <RemoveCircleIcon sx={{ width: 20, height: 20 }} />
                    </Button>
                    <Rating
                      name="hover-feedback"
                      precision={0.5}
                      value={(currentRating || 0) / 2}
                      getLabelText={getLabelText}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      onChange={(_, newRating) => rate(newRating! * 2)}
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={<StarIcon fontSize="inherit" />}
                      sx={{
                        "& .MuiRating-iconEmpty": {
                          color: "white",
                        },
                      }}
                    />
                  </div>
                  {currentRating! !== null && (
                    <div className="text-center">
                      {labels[hover !== -1 ? hover : currentRating!]}
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </TooltipTrigger>
          <TooltipContent
            className="bg-yellow-500"
            arrowColor="fill-yellow-500"
          >
            Rating
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={favorite}>
              {isFavorite ? (
                <FavoriteIcon className="text-red-600" />
              ) : (
                <FavoriteBorderIcon className="text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-red-600" arrowColor="fill-red-600">
            Favorite
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isBookmarked ? (
                      <BookmarkIcon className="text-primary" />
                    ) : (
                      <BookmarkBorderIcon className="text-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {bookmarks.map((b) => (
                    <DropdownMenuItem
                      key={b.value}
                      onClick={() => bookmark(b.value)}
                      className={
                        b.value === currentBookmark ? "text-primary" : ""
                      }
                    >
                      {b.label}
                      {b.value === currentBookmark && (
                        <CircleCheck className="size-4 -ml-1" />
                      )}
                    </DropdownMenuItem>
                  ))}

                  {isBookmarked && (
                    <>
                      <div className="border-1 border-muted-foreground/50 my-1"></div>
                      <DropdownMenuItem onClick={() => remove()}>
                        Remove
                        <CircleX className="size-4 -ml-1" />
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </TooltipTrigger>
          <TooltipContent>Bookmark</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default BannerActions;
