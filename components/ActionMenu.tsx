"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
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
import { CircleCheck, CircleX, EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
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

const ActionMenu = ({ movie, mediaType }: Props) => {
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
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <EllipsisVertical className="text-primary size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      {isRated ? (
                        <StarIcon
                          sx={{ width: 20, height: 20 }}
                          className="text-yellow-500"
                        />
                      ) : (
                        <StarBorderIcon
                          sx={{ width: 20, height: 20 }}
                          className="text-white"
                        />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2 space-y-1">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => clear(0)}
                        disabled={!isRated}
                      >
                        <RemoveCircleIcon sx={{ width: 16, height: 16 }} />
                      </Button>
                      <Rating
                        size="small"
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
                      <div className="text-sm text-center">
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
              <Button
                onClick={favorite}
                variant="ghost"
                size="icon"
                className="size-8"
              >
                {isFavorite ? (
                  <FavoriteIcon
                    sx={{ width: 20, height: 20 }}
                    className="text-red-600"
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ width: 20, height: 20 }}
                    className="text-white"
                  />
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
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ActionMenu;
