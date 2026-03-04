import ImageGalleryPerson from "@/components/ImageGalleryPerson";
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
      <ImageGalleryPerson
        tmdbId={tmdbId}
        mediaType="person"
        param={param}
        index={indexNumber}
      />
    </section>
  );
};

export default page;
