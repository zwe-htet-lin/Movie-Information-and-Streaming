"use client";

import { useAppDispatch } from "@/store/hook";
import {
  setImageGalleryPath,
  setImageGalleryType,
} from "@/store/slices/imageGallerySlice";
import { Image } from "@/types/tmdb";
import Link from "next/link";
import { Card } from "./ui/card";

interface Props {
  image: Image;
  mediaType: string;
  size?: "backdrop" | "poster" | "grid";
  param: string;
  type: string;
  index: number;
}

const ImageCardBase = ({
  image,
  mediaType,
  size,
  param,
  type,
  index,
}: Props) => {
  const dispatch = useAppDispatch();
  const cardClasses =
    size === "grid"
      ? " "
      : size === "backdrop"
        ? "h-[180px] w-[300px] sm:h-[200px] sm:w-[320px]"
        : "h-[300px] w-[180px] sm:w-[200px] md:h-[310px] md:w-[220px]";

  const handleClick = () => {
    if (type === "backdrop" || type === "poster" || type === "person") {
      dispatch(
        setImageGalleryPath(
          `/${mediaType}/${param}${size === "grid" ? `/image` : ""}`,
        ),
      );
      dispatch(setImageGalleryType(type));
    }
  };

  return (
    <Link
      href={`/${mediaType}/${param}/image/${type === "person" ? "" : `${type}/`}${index + 1}`}
    >
      <Card
        className={`${cardClasses} flex flex-shrink-0 overflow-hidden border-0 bg-transparent p-0`}
        onClick={() => handleClick()}
      >
        <img
          src={
            image.file_path
              ? `https://image.tmdb.org/t/p/original${image.file_path}`
              : "/no-image-available.png"
          }
          alt={type}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </Card>
    </Link>
  );
};

export const BackdropImageCard = (props: Props) => (
  <ImageCardBase {...props} size="backdrop" />
);
export const PosterImageCard = (props: Props) => (
  <ImageCardBase {...props} size="poster" />
);

export const GridImageCard = (props: Props) => (
  <ImageCardBase {...props} size="grid" />
);

