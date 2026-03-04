import Banner from "@/components/BannerHome";
import Cast from "@/components/Cast";
import Image from "@/components/Image";
import Recommendation from "@/components/Recommendation";
import Video from "@/components/Video";
import VideoBg from "@/components/VideoBg";
import WatchMovie from "@/components/WatchMovie";
import React from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: param } = React.use(params);
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <>
      <Banner banners={[{ tmdbId, mediaType: "tv" }]} />
      <Cast tmdbId={tmdbId} mediaType={"tv"} param={param} />
      <section className="relative">
        <VideoBg tmdbId={tmdbId} mediaType="tv" />
        <Video tmdbId={tmdbId} mediaType={"tv"} param={param} />
        <Image tmdbId={tmdbId} mediaType="tv" param={param} />
      </section>
      <WatchMovie tmdbId={tmdbId} mediaType={"tv"} />
      <Recommendation tmdbId={tmdbId} mediaType={"tv"} />
    </>
  );
};

export default page;
