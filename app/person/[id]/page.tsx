"use client";

import BannerPerson from "@/components/BannerPerson";
import Credit from "@/components/Credit";
import Highlight from "@/components/Highlight";
import ImagePerson from "@/components/ImagePerson";
import { useParams } from "next/navigation";

const page = () => {
  const { id: param } = useParams<{ id: string }>();
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <>
      <BannerPerson tmdbId={tmdbId} />
      <ImagePerson tmdbId={tmdbId} param={param} />
      <Highlight tmdbId={tmdbId} />
      <Credit tmdbId={tmdbId} />
    </>
  );
};

export default page;
