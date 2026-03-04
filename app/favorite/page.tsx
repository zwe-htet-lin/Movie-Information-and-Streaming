"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/store/hook";
import { Movie } from "@/types/tmdb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Favorite() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    value: favorites,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.favorite);
  const totalPages = Math.ceil(favorites.length / 20);

  const paginatedFavorites = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return favorites.slice(start, end);
  };

  useEffect(() => {
    if (page > totalPages || isNaN(page)) {
      return;
    }
  }, [page]);

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return;
  }

  if (!isInitializing || isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
        <Card className="rounded-none">
          <h2 className="text-xl font-semibold md:text-2xl">MY FAVORITES</h2>
        </Card>
        <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-25 md:px-10">
      <Card className="rounded-none">
        <h2 className="text-xl font-semibold md:text-2xl">MY FAVORITES</h2>
      </Card>
      {favorites.length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {paginatedFavorites().map((favorite, index) => (
              <MovieCard
                key={index}
                movie={
                  {
                    id: favorite.tmdb_id,
                    title: favorite.title,
                    release_date: favorite.release_date,
                    genre_ids: favorite.genre_ids,
                    poster_path: favorite.poster_path,
                  } as Movie
                }
                mediaType={favorite.media_type}
              />
            ))}
          </div>
          <div className="my-8 flex justify-center">
            <CustomPagination
              route="/favorite?"
              page={page}
              count={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <h2 className="">You haven't added any favorite movies.</h2>
          <Button variant="link" className="px-2">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
