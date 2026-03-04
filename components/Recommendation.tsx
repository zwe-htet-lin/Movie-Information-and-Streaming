"use client";

import { useMovieDetails, useRecommendation } from "@/hooks/useTMDB";
import { MovieTrendingCard } from "./MovieCard";
import { MovieTrendingCardSkeleton } from "./MovieCardSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const Recommendation = ({ tmdbId, mediaType }: Props) => {
  const { data: recommendations, isLoading } = useRecommendation(
    tmdbId,
    mediaType,
  );
  const { data: movie, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div className="flex items-center">
        <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">RECOMMENDATIONS</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth py-5">
        {(detailsLoading || isLoading) && recommendations.length === 0 ? (
          [...Array(20)].map((_, index) => (
            <MovieTrendingCardSkeleton key={index} />
          ))
        ) : !detailsLoading && !isLoading && !recommendations.length ? (
          <p>
            We don't have enough data to suggest any movies based on{" "}
            {movie?.name || movie?.title}. You can help by rating movies you've
            seen.
          </p>
        ) : (
          recommendations.map((recommendation, index) => (
            <MovieTrendingCard
              key={index}
              movie={recommendation}
              mediaType={recommendation.media_type}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Recommendation;
