"use client";

import BookmarkBreadcrumb from "@/components/BookmarkBreadcrumb";
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

export default function Bookmark() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    value: bookmarks,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.bookmark);
  const totalPages = Math.ceil(bookmarks.length / 20);

  const paginatedBookmarks = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return bookmarks.slice(start, end);
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
          <h2 className="mb-5 text-xl font-semibold md:text-2xl">
            MY BOOKMARKS
          </h2>
          <BookmarkBreadcrumb value="all" />
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
        <h2 className="mb-5 text-xl font-semibold md:text-2xl">MY BOOKMARKS</h2>
        <BookmarkBreadcrumb value="all" />
      </Card>
      {bookmarks.length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {paginatedBookmarks().map((bookmark, index) => (
              <MovieCard
                key={index}
                movie={
                  {
                    id: bookmark.tmdb_id,
                    title: bookmark.title,
                    release_date: bookmark.release_date,
                    genre_ids: bookmark.genre_ids,
                    poster_path: bookmark.poster_path,
                  } as Movie
                }
                mediaType={bookmark.media_type}
              />
            ))}
          </div>
          <div className="my-10 flex justify-center">
            <CustomPagination
              route="/bookmark?"
              page={page}
              count={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 flex items-center">
          <h2 className="">You haven't added any movies to your bookmark.</h2>
          <Button variant="link" className="px-2">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
