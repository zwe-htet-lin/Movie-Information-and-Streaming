import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setImageGalleryButton, setImageGalleryPath } from "@/store/slices/imageGallerySlice";
import { ChevronLeft, ChevronRight, Grip, X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import ImageGallerySkeleton from "./ImageGallerySkeleton";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
  index: number;
}

const ImageGalleryPerson = ({ tmdbId, mediaType, param, index }: Props) => {
  const dispatch = useAppDispatch();
  const imageGalleryPath = useAppSelector((s) => s.imageGallery.value.path);
  const imageGalleryButton = useAppSelector((s) => s.imageGallery.value.button);

  const { data: profiles, isLoading } = useImages(tmdbId, mediaType, "profile");
  const { data: movie, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredProfiles = useMemo(() => {
    if (!profiles || !profiles.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = profiles.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return profiles;
  }, [profiles, movie]);

  const handleClose = () => {
    dispatch(setImageGalleryPath(""));
    dispatch(setImageGalleryButton(""));
  };

  // Calculate prev and next indices
  const prev = index > 1 ? index - 1 : filteredProfiles.length;
  const next = index < filteredProfiles.length ? index + 1 : 1;

  // Show loading state
  if (isLoading || detailsLoading) {
    return <ImageGallerySkeleton />;
  }

  // Handle no images case
  if (!filteredProfiles || filteredProfiles.length === 0) {
    return (
      <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-7xl flex-col items-center justify-center bg-black/90">
        <div className="absolute top-10 left-5 md:top-5">
          <Link href={imageGalleryPath || `/${mediaType}/${param}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleClose()}
              className="rounded-full border-none [&_svg:not([class*='size-'])]:size-5"
            >
              <X size={28} />
            </Button>
          </Link>
        </div>
        <p className="text-center text-lg text-gray-400">No image available.</p>
      </div>
    );
  }

  // Handle invalid index
  const safeIndex = Math.max(1, Math.min(index, filteredProfiles.length));
  const currentImage = filteredProfiles[safeIndex - 1];

  // Handle missing image data
  if (!currentImage || !currentImage.file_path) {
    return (
      <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-7xl flex-col items-center justify-center bg-black/90">
        <div className="absolute top-10 left-5 md:top-5">
          <Link href={imageGalleryPath || `/${mediaType}/${param}`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleClose()}
              className="rounded-full border-none [&_svg:not([class*='size-'])]:size-5"
            >
              <X size={28} />
            </Button>
          </Link>
        </div>
        <p className="text-center text-lg text-gray-400">No image found.</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-center bg-black/90">
      <div className="absolute top-10 flex w-full items-center justify-between px-5 md:top-5">
        <Link href={imageGalleryPath || `/${mediaType}/${param}`}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleClose()}
            className="rounded-full border-none [&_svg:not([class*='size-'])]:size-5"
          >
            <X size={28} />
          </Button>
        </Link>
        <div className="flex items-center">
          <p className="text-primary mr-2 rounded-full text-lg font-medium">
            {safeIndex} of {filteredProfiles.length}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/${mediaType}/${param}/image`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleClose()}
                  className="focus:bg-muted-foreground/50 size-11 [&_svg:not([class*='size-'])]:size-6"
                >
                  <Grip />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="text-xs">gallery</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Previous button - only show if there's more than 1 image */}
      {filteredProfiles.length > 1 && (
        <Link
          href={`/${mediaType}/${param}/image/${prev}`}
          className="absolute left-5 text-white"
        >
          <Button
            variant="outline"
            size="icon"
            className="bg-accent-foreground/50 size-11 [&_svg:not([class*='size-'])]:size-6"
            onClick={() => dispatch(setImageGalleryButton("prev"))}
          >
            <ChevronLeft
              className={imageGalleryButton === "prev" ? "text-primary" : ""}
            />
          </Button>
        </Link>
      )}

      <img
        src={`https://image.tmdb.org/t/p/original${currentImage.file_path}`}
        alt={`${safeIndex}`}
        className="max-h-[75vh] max-w-[90vw] object-contain"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-image.png";
          e.currentTarget.alt = "Image failed to load";
        }}
      />

      {/* Next button - only show if there's more than 1 image */}
      {filteredProfiles.length > 1 && (
        <Link
          href={`/${mediaType}/${param}/image/${next}`}
          className="absolute right-5 text-white"
        >
          <Button
            variant="outline"
            size="icon"
            className="bg-accent-foreground/50 size-11 [&_svg:not([class*='size-'])]:size-6"
            onClick={() => dispatch(setImageGalleryButton("next"))}
          >
            <ChevronRight
              className={imageGalleryButton === "next" ? "text-primary" : ""}
            />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ImageGalleryPerson;
