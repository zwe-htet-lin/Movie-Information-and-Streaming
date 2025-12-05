"use client";

import Banner from "@/components/Banner";
import BannerSkeleton from "@/components/BannerSkeleton";
import Latest from "@/components/Latest";
import Trending from "@/components/Trending";
import { useTrendingDay } from "@/hooks/useTMDB";

export default function Home() {
  const { data: trending, isLoading } = useTrendingDay();

  // Pick a random trending to use as a banner
  const filteredTrending = trending?.results.filter(
    (trend) => trend.media_type !== "person"
  );
  const randomTrending = filteredTrending?.length
    ? filteredTrending?.[Math.floor(Math.random() * filteredTrending?.length)]
    : undefined;

  const tmdbId = randomTrending?.id;
  const mediaType = randomTrending?.media_type;

  return (
    <>
      {isLoading && <BannerSkeleton />}
      {tmdbId && mediaType && <Banner tmdbId={tmdbId} mediaType={mediaType} />}
      <Trending />
      <Latest />
    </>
  );
}
