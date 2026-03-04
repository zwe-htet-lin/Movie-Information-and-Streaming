"use client";

import Banner from "@/components/Banner";
import BannerSkeleton from "@/components/BannerSkeleton";
import ComingSoon from "@/components/ComingSoon";
import Streaming from "@/components/Streaming";
import Trending from "@/components/Trending";
import {
  useContentRating,
  useMovieDetails,
  useSocial,
  useTrendingDay,
  useVideos,
} from "@/hooks/useTMDB";
import { useMemo } from "react";

export default function Home() {
  const { data: trending, isLoading } = useTrendingDay();

  const banners = useMemo(() => {
    const filteredTrending = trending.filter(
      (trend) => trend.media_type !== "person",
    );
    const selected = filteredTrending.slice(0, 5);
    return selected.map((item) => ({
      tmdbId: item.id,
      mediaType: item.media_type,
    }));
  }, [trending]);

  const banner0 = banners[0];
  const banner1 = banners[1];
  const banner2 = banners[2];
  const banner3 = banners[3];
  const banner4 = banners[4];

  const details0 = useMovieDetails(banner0?.tmdbId, banner0?.mediaType);
  const details1 = useMovieDetails(banner1?.tmdbId, banner1?.mediaType);
  const details2 = useMovieDetails(banner2?.tmdbId, banner2?.mediaType);
  const details3 = useMovieDetails(banner3?.tmdbId, banner3?.mediaType);
  const details4 = useMovieDetails(banner4?.tmdbId, banner4?.mediaType);

  const videos0 = useVideos(banner0?.tmdbId, banner0?.mediaType);
  const videos1 = useVideos(banner1?.tmdbId, banner1?.mediaType);
  const videos2 = useVideos(banner2?.tmdbId, banner2?.mediaType);
  const videos3 = useVideos(banner3?.tmdbId, banner3?.mediaType);
  const videos4 = useVideos(banner4?.tmdbId, banner4?.mediaType);

  const rating0 = useContentRating(banner0?.tmdbId, banner0?.mediaType);
  const rating1 = useContentRating(banner1?.tmdbId, banner1?.mediaType);
  const rating2 = useContentRating(banner2?.tmdbId, banner2?.mediaType);
  const rating3 = useContentRating(banner3?.tmdbId, banner3?.mediaType);
  const rating4 = useContentRating(banner4?.tmdbId, banner4?.mediaType);

  const social0 = useSocial(banner0?.tmdbId, banner0?.mediaType);
  const social1 = useSocial(banner1?.tmdbId, banner1?.mediaType);
  const social2 = useSocial(banner2?.tmdbId, banner2?.mediaType);
  const social3 = useSocial(banner3?.tmdbId, banner3?.mediaType);
  const social4 = useSocial(banner4?.tmdbId, banner4?.mediaType);

  const allBannersLoaded =
    !isLoading &&
    banners.length === 5 &&
    !details0.isLoading &&
    !details1.isLoading &&
    !details2.isLoading &&
    !details3.isLoading &&
    !details4.isLoading &&
    !videos0.isLoading &&
    !videos1.isLoading &&
    !videos2.isLoading &&
    !videos3.isLoading &&
    !videos4.isLoading &&
    !rating0.isLoading &&
    !rating1.isLoading &&
    !rating2.isLoading &&
    !rating3.isLoading &&
    !rating4.isLoading &&
    !social0.isLoading &&
    !social1.isLoading &&
    !social2.isLoading &&
    !social3.isLoading &&
    !social4.isLoading;

  return (
    <>
      {!allBannersLoaded ? (
        <BannerSkeleton />
      ) : (
        <Banner banners={banners} />
      )}
      <Trending />
      <ComingSoon />
      <Streaming />
    </>
  );
}
