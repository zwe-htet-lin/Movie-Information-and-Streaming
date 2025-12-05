"use client";

import { useCast } from "@/hooks/useTMDB";
import CastCard from "./CastCard";
import CastCardSkeleton from "./CastCardSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const Cast = ({ tmdbId, mediaType }: Props) => {
  const { data: casts, isLoading } = useCast(tmdbId, mediaType);

  const filteredCasts = casts?.cast.filter(
    (cast) => cast.known_for_department === "Acting"
  );

  if (!isLoading && !filteredCasts?.length) return null;

  return (
    <div className="px-5 py-10 pt-20">
      <h2 className="text-lg md:text-xl font-semibold">CASTS</h2>
      <div className="flex overflow-x-auto">
        <div className="flex py-5 gap-3">
          {isLoading
            ? [...Array(20)].map((_, index) => <CastCardSkeleton key={index} />)
            : filteredCasts
                ?.slice(0, 20)
                .map((cast, index) => <CastCard cast={cast} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Cast;
