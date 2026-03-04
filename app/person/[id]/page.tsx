import BannerPerson from "@/components/BannerPerson";
import Credit from "@/components/Credit";
import Highlight from "@/components/Highlight";
import ImagePerson from "@/components/ImagePerson";
import React from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: param } = React.use(params);
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
