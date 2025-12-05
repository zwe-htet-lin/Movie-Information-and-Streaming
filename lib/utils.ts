import { movieGenres } from "@/data/movie_genre";
import { tvGenres } from "@/data/tv_genres";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (date: Date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const formatLabel = (text: string) => {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getYear = (date: any) => {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
};

export const getGenres = (mediaType: string, genresIds: number[]) => {
  if (genresIds.length === 0) return "Unknown";
  let genreNames: string[] = [];
  const genres = mediaType === "movie" ? movieGenres : tvGenres;
  genresIds.map((genreId: number) => {
    const found = genres.find((genre) => genre.id === genreId);
    if (found) genreNames.push(found.name);
  });
  return genreNames.join(", ");
};

export const labels: { [index: string]: string } = {
  0.5: "Appalling",
  1: "Horrible",
  1.5: "Very Bad",
  2: "Bad",
  2.5: "Average",
  3: "Fine",
  3.5: "Good",
  4: "Very Good",
  4.5: "Great",
  5: "Masterpiece",
};

export const getLabelText = (value: number) => {
  return `${labels[value]}`;
};
