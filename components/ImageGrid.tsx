"use client";

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setImageGalleryType } from "@/store/slices/imageGallerySlice";
import { useEffect, useMemo, useState } from "react";
import CustomPagination from "./CustomPagination";
import { GridImageCard } from "./ImageCard";
import {
  GridBackdropImageCardSkeleton,
  GridPosterImageCardSkeleton,
} from "./ImageCardSkeleton";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const imageTypes = [
  { value: "backdrop", label: "Backdrops" },
  { value: "poster", label: "Posters" },
];

const ImageGrid = ({ tmdbId, mediaType, param }: Props) => {
  const dispatch = useAppDispatch();
  const imageGalleryType = useAppSelector((s) => s.imageGallery.value.type);

  const [page, setPage] = useState(1);

  const { data: backdrops, isLoading: isBackdropLoading } = useImages(
    tmdbId,
    mediaType,
    "backdrop",
  );
  const { data: posters, isLoading: isPosterLoading } = useImages(
    tmdbId,
    mediaType,
    "poster",
  );
  const { data: movie, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredBackdrops = useMemo(() => {
    if (!backdrops || !backdrops.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = backdrops.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return backdrops;
  }, [backdrops, movie]);

  const filteredPosters = useMemo(() => {
    if (!posters || !posters.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = posters.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return posters;
  }, [posters, movie]);

  const paginatedBackdrops = () => {
    const start = (page - 1) * 21;
    const end = start + 21;
    return filteredBackdrops.slice(start, end);
  };

  const paginatedPosters = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return filteredPosters.slice(start, end);
  };

  const backdropTotalPages = Math.max(
    1,
    Math.ceil(filteredBackdrops.length / 21),
  );
  const posterTotalPages = Math.max(1, Math.ceil(filteredPosters.length / 20));

  useEffect(() => {
    setPage(1);
  }, [imageGalleryType]);

  useEffect(() => {
    if (imageGalleryType === "backdrop" && page > backdropTotalPages) {
      return;
    }
    if (imageGalleryType === "poster" && page > posterTotalPages) {
      return;
    }
  }, [page, backdropTotalPages, posterTotalPages, imageGalleryType]);

  // Auto-switch to available tab if current tab is empty
  useEffect(() => {
    if (
      imageGalleryType === "backdrop" &&
      filteredBackdrops.length === 0 &&
      filteredPosters.length > 0
    ) {
      dispatch(setImageGalleryType("poster"));
    } else if (
      imageGalleryType === "poster" &&
      filteredPosters.length === 0 &&
      filteredBackdrops.length > 0
    ) {
      dispatch(setImageGalleryType("backdrop"));
    }
  }, [
    filteredBackdrops.length,
    filteredPosters.length,
    imageGalleryType,
    dispatch,
  ]);

  const grid =
    imageGalleryType === "backdrop"
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

  return (
    <section className="mt-10">
      {!movie || detailsLoading ? (
        <MovieTitleSkeleton />
      ) : (
        <MovieTitle movie={movie} mediaType={mediaType} title="Images" />
      )}
      {!isBackdropLoading &&
        !isPosterLoading &&
        backdrops.length > 0 &&
        posters.length > 0 && (
          <Card className="mt-5 min-w-0 rounded-none">
            <Tabs
              value={imageGalleryType}
              onValueChange={(value) => dispatch(setImageGalleryType(value))}
              className="hide-scrollbar overflow-scroll"
            >
              <TabsList className="h-fit gap-5 bg-transparent p-0">
                {imageTypes.map((type) => {
                  const count =
                    type.value === "backdrop"
                      ? filteredBackdrops.length
                      : filteredPosters.length;

                  if (count === 0) return null;

                  return (
                    <TabsTrigger
                      key={type.value}
                      value={type.value}
                      className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
                    >
                      {type.label}
                      <span className="font-medium text-neutral-300">
                        {count}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </Card>
        )}
      <div className={`grid ${grid} mt-5 gap-x-5 gap-y-10`}>
        {isBackdropLoading &&
          imageGalleryType === "backdrop" &&
          [...Array(3)].map((_, index) => (
            <GridBackdropImageCardSkeleton key={index} />
          ))}
        {isPosterLoading &&
          imageGalleryType === "poster" &&
          [...Array(3)].map((_, index) => (
            <GridPosterImageCardSkeleton key={index} />
          ))}
        {!isBackdropLoading &&
          imageGalleryType === "backdrop" &&
          paginatedBackdrops().map((image, index) => (
            <GridImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type="backdrop"
              index={(page - 1) * 21 + index}
            />
          ))}
        {!isPosterLoading &&
          imageGalleryType === "poster" &&
          paginatedPosters().map((image, index) => (
            <GridImageCard
              key={index}
              image={image}
              mediaType={mediaType}
              param={param}
              type="poster"
              index={(page - 1) * 20 + index}
            />
          ))}
      </div>
      {!isBackdropLoading &&
        imageGalleryType === "backdrop" &&
        filteredBackdrops.length > 20 && (
          <div className="mt-10 flex w-full justify-center">
            <CustomPagination
              count={backdropTotalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      {!isPosterLoading &&
        imageGalleryType === "poster" &&
        filteredPosters.length > 20 && (
          <div className="mt-10 flex w-full justify-center">
            <CustomPagination
              count={posterTotalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      {!isBackdropLoading &&
        !isPosterLoading &&
        paginatedBackdrops().length === 0 &&
        paginatedPosters().length === 0 && (
          <p className="my-10 flex w-full justify-center text-sm text-gray-400">
            No images found.
          </p>
        )}
    </section>
  );
};

export default ImageGrid;

// "use client"

// import { useImages, useMovieDetails } from "@/hooks/useTMDB";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { setImageGalleryType } from "@/store/slices/imageGallerySlice";
// import { useEffect, useMemo } from "react";
// import { GridImageCard } from "./ImageCard";
// import {
//   GridBackdropImageCardSkeleton,
//   GridPosterImageCardSkeleton,
// } from "./ImageCardSkeleton";
// import MovieTitle from "./MovieTitle";
// import MovieTitleSkeleton from "./MovieTitleSkeleton";
// import { Card } from "./ui/card";
// import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// interface Props {
//   tmdbId: number;
//   mediaType: string;
//   param: string;
// }

// const ImageGrid = ({ tmdbId, mediaType, param }: Props) => {
//   const dispatch = useAppDispatch();
//   const imageGalleryType = useAppSelector((s) => s.imageGallery.value.type);

//   const { data: backdrops, isLoading: isBackdropLoading } = useImages(
//     tmdbId,
//     mediaType,
//     "backdrop",
//   );
//   const { data: posters, isLoading: isPosterLoading } = useImages(
//     tmdbId,
//     mediaType,
//     "poster",
//   );
//   const { data: profiles, isLoading: isProfileLoading } = useImages(
//     tmdbId,
//     mediaType,
//     "profile",
//   );
//   const { data: movie, isLoading: detailsLoading } = useMovieDetails(
//     tmdbId,
//     mediaType,
//   );

//   const filteredBackdrops = useMemo(() => {
//     if (!backdrops || !backdrops.length) return [];

//     const origin = movie?.origin_country?.[0];

//     const filtered = backdrops.filter(
//       (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
//     );
//     if (filtered.length > 0) return filtered;

//     return backdrops;
//   }, [backdrops, movie]);

//   const filteredPosters = useMemo(() => {
//     if (!posters || !posters.length) return [];

//     const origin = movie?.origin_country?.[0];

//     const filtered = posters.filter(
//       (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
//     );
//     if (filtered.length > 0) return filtered;

//     return posters;
//   }, [posters, movie]);

//   // Auto-switch to available tab if current tab is empty
//   useEffect(() => {
//     if (
//       imageGalleryType === "backdrop" &&
//       filteredBackdrops.length === 0 &&
//       filteredPosters.length > 0
//     ) {
//       dispatch(setImageGalleryType("poster"));
//     } else if (
//       imageGalleryType === "poster" &&
//       filteredPosters.length === 0 &&
//       filteredBackdrops.length > 0
//     ) {
//       dispatch(setImageGalleryType("backdrop"));
//     }
//   }, [
//     filteredBackdrops.length,
//     filteredPosters.length,
//     imageGalleryType,
//     dispatch,
//   ]);

//   const grid =
//     imageGalleryType === "backdrop"
//       ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
//       : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5";

//   // Show loading state
//   if (isBackdropLoading || isPosterLoading || detailsLoading) {
//     return (
//       <div className="pt-10">
//         <MovieTitleSkeleton />
//         <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
//           {imageGalleryType === "backdrop"
//             ? [...Array(6)].map((_, i) => (
//                 <GridBackdropImageCardSkeleton key={i} />
//               ))
//             : [...Array(8)].map((_, i) => (
//                 <GridPosterImageCardSkeleton key={i} />
//               ))}
//         </div>
//       </div>
//     );
//   }

//   // Show message when both are empty
//   if (filteredBackdrops.length === 0 && filteredPosters.length === 0) {
//     return (
//       <div className="pt-10">
//         <MovieTitle movie={movie!} mediaType={mediaType} title="Images" />
//         <p className="py-20 text-center text-sm text-gray-400">
//           No images found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-10">
//       <MovieTitle movie={movie!} mediaType={mediaType} title="Images" />

//       <Card className="mt-5 min-w-0 rounded-none">
//         <Tabs
//           value={imageGalleryType}
//           onValueChange={(value) => dispatch(setImageGalleryType(value))}
//           className="hide-scrollbar overflow-scroll"
//         >
//           <TabsList className="h-fit gap-5 bg-transparent p-0">
//             {filteredBackdrops.length > 0 && (
//               <TabsTrigger
//                 value="backdrop"
//                 className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
//               >
//                 Backdrops{" "}
//                 <span className="font-medium text-neutral-300">
//                   {filteredBackdrops.length}
//                 </span>
//               </TabsTrigger>
//             )}
//             {filteredPosters.length > 0 && (
//               <TabsTrigger
//                 value="poster"
//                 className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
//               >
//                 Posters{" "}
//                 <span className="font-medium text-neutral-300">
//                   {filteredPosters.length}
//                 </span>
//               </TabsTrigger>
//             )}
//           </TabsList>
//         </Tabs>
//       </Card>

//       <div className={`grid ${grid} gap-x-4 gap-y-10 pt-5`}>
//         {imageGalleryType === "backdrop" &&
//           (filteredBackdrops.length > 0 ? (
//             filteredBackdrops.map((image, index) => (
//               <GridImageCard
//                 key={index}
//                 image={image}
//                 mediaType={mediaType}
//                 param={param}
//                 type="backdrop"
//                 index={index}
//               />
//             ))
//           ) : (
//             <p className="col-span-full py-10 text-center text-sm text-gray-400">
//               No backdrops found.
//             </p>
//           ))}

//         {imageGalleryType === "poster" &&
//           (filteredPosters.length > 0 ? (
//             filteredPosters.map((image, index) => (
//               <GridImageCard
//                 key={index}
//                 image={image}
//                 mediaType={mediaType}
//                 param={param}
//                 type="poster"
//                 index={index}
//               />
//             ))
//           ) : (
//             <p className="col-span-full py-10 text-center text-sm text-gray-400">
//               No posters found.
//             </p>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGrid;
