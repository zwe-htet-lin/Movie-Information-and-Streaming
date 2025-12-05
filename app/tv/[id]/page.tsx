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
      <Banner tmdbId={tmdbId} mediaType={"tv"} />
      <WatchMovie tmdbId={tmdbId} mediaType={"tv"} />
      <Cast tmdbId={tmdbId} mediaType={"tv"} />
      <Recommendation tmdbId={tmdbId} mediaType={"tv"} />
    </>
  );
};

export default page;
