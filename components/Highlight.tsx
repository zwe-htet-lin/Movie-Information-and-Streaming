"use client";

import { useCredits, usePersonDetails } from "@/hooks/useTMDB";
import { useMemo } from "react";
import { MovieTrendingCard } from "./MovieCard";
import { MovieTrendingCardSkeleton } from "./MovieCardSkeleton";

interface Props {
  tmdbId: number;
}

const Highlight = ({ tmdbId }: Props) => {
  const { data: highlights, isLoading } = useCredits(tmdbId, "cast");
  const { data: person, isLoading: detailsLoading } = usePersonDetails(tmdbId);

  const isTalkShowPerson = useMemo(() => {
    if (!highlights) return false;

    return highlights.some(
      (item) =>
        item.media_type === "tv" &&
        item.genre_ids?.includes(10767) &&
        (item.episode_count ?? 0) > 100,
    );
  }, [highlights]);

  const filteredHighlights = useMemo(() => {
    if (!highlights) return [];

    const filtered = highlights.filter((item) => {
      if (!item.poster_path) return false;

      if (!isTalkShowPerson) {
        if (
          item.genre_ids?.includes(10767) ||
          item.genre_ids?.includes(10763) ||
          item.genre_ids.length === 0
        ) {
          return false;
        }
      }

      if (item.media_type === "movie") {
        if (item.order >= 5) {
          return false;
        }
      } else if (item.media_type === "tv") {
        if (item.episode_count <= 2) {
          return false;
        }
      }

      return true;
    });

    const unique = Array.from(
      new Map(
        filtered.map((item) => [`${item.media_type}-${item.id}`, item]),
      ).values(),
    );

    return unique.sort((a, b) => b.popularity - a.popularity);
  }, [highlights]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div className="flex w-fit items-center space-x-2">
        <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">HIGHLIGHTS</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
        {(detailsLoading || isLoading) && filteredHighlights.length === 0 ? (
          [...Array(10)].map((_, index) => (
            <MovieTrendingCardSkeleton key={index} />
          ))
        ) : !detailsLoading && !isLoading && !filteredHighlights.length ? (
          <p>
            We don't have enough data to suggest any movies based on{" "}
            {person?.name}. You can help by rating movies you've seen.
          </p>
        ) : (
          filteredHighlights
            .slice(0, 10)
            .map((highlight, index) => (
              <MovieTrendingCard
                key={index}
                movie={highlight}
                mediaType={highlight.media_type}
              />
            ))
        )}
      </div>
    </section>
  );
};

export default Highlight;

// const filteredKnownFors = useMemo(() => {
//   return (
//     [...knownfors]
//       .filter((poster) => poster.poster_path)
//       //   .filter((order) => order.order === 0)
//       .sort((a, b) => b.popularity - a.popularity)
//       .slice(0, 20)
//   );
// }, [knownfors]);

// const filteredKnownFors = useMemo(() => {
//   return [...knownfors]
//     .filter((item) => item.poster_path)
//     .sort((a, b) => {
//       const dateA = new Date(
//         a.release_date || a.first_air_date || 0,
//       ).getTime();
//       const dateB = new Date(
//         b.release_date || b.first_air_date || 0,
//       ).getTime();
//       return dateB - dateA;
//     });
// }, [knownfors]);
