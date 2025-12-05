"use client";

import Banner from "@/components/Banner";
import Cast from "@/components/Cast";
import Recommendation from "@/components/Recommendation";
import WatchMovie from "@/components/WatchMovie";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const tmdbId = parseInt(params.id as string);

  return (
    <>
      <Banner tmdbId={tmdbId} mediaType={"movie"} />
      <WatchMovie tmdbId={tmdbId} mediaType={"movie"} />
      <Cast tmdbId={tmdbId} mediaType={"movie"} />
      <Recommendation tmdbId={tmdbId} mediaType={"movie"} />
    </>
  );
};

export default page;
