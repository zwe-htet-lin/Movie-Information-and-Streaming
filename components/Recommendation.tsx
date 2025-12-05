"use client";

import { useRecommendation } from "@/hooks/useTMDB";
import { TrendingMovieCard } from "./MovieCard";
import { TrendingMovieCardSkeleton } from "./MovieCardSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const Recommendation = ({ tmdbId, mediaType }: Props) => {
  const { data: recommendations, isLoading } = useRecommendation(
    tmdbId,
    mediaType
  );

  if (!isLoading && !recommendations?.results.length) return null;

  return (
    <div className="px-5 py-10">
      <h2 className="text-lg md:text-xl font-semibold">RECOMMENDATIONS</h2>
      <div className="flex overflow-x-auto">
        <div className="flex py-5 gap-3">
          {isLoading
            ? [...Array(20)].map((_, index) => (
                <TrendingMovieCardSkeleton key={index} />
              ))
            : recommendations?.results.map((recommendation, index) => (
                <TrendingMovieCard key={index} movie={recommendation} mediaType={recommendation.media_type}/>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
