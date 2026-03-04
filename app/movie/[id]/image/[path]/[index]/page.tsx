import ImageGallery from "@/components/ImageGallery";
import React from "react";

const page = ({
  params,
}: {
  params: Promise<{
    id: string;
    path: string;
    index: string;
  }>;
}) => {
  const { id: param, path, index } = React.use(params);
  const tmdbId = parseInt(param.split("-")[0]);
  const indexNumber = parseInt(index);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div></div>
      <ImageGallery
        tmdbId={tmdbId}
        mediaType="movie"
        param={param}
        type={path}
        index={indexNumber}
      />
    </section>
  );
};

export default page;
