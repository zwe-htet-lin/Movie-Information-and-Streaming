"use client";

import Banner from "@/components/Banner";
import Cast from "@/components/Cast";
import Image from "@/components/Image";
import Recommendation from "@/components/Recommendation";
import Video from "@/components/Video";
import VideoBg from "@/components/VideoBg";
import WatchMovie from "@/components/WatchMovie";
import { useParams } from "next/navigation";

const page = () => {
  const { id: param } = useParams<{ id: string }>();
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <>
      <Banner banners={[{ tmdbId, mediaType: "movie" }]} />
      <Cast tmdbId={tmdbId} mediaType={"movie"} param={param} />
      <section className="relative">
        <VideoBg tmdbId={tmdbId} mediaType="movie" />
        <Video tmdbId={tmdbId} mediaType={"movie"} param={param} />
        <Image tmdbId={tmdbId} mediaType="movie" param={param} />
      </section>
      <WatchMovie tmdbId={tmdbId} mediaType={"movie"} />
      <Recommendation tmdbId={tmdbId} mediaType={"movie"} />
    </>
  );
};

export default page;
