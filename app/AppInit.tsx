"use client";

import { useAppDispatch } from "@/store/hook";
import { fetchBookmarks } from "@/store/slices/bookmarkSlice";
import { fetchFavorites } from "@/store/slices/favoriteSlice";
import { fetchRatings } from "@/store/slices/ratingSlice";
import { fetchUser } from "@/store/slices/userSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AppInit() {
  const dispatch = useAppDispatch();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchUser());
      dispatch(fetchRatings());
      dispatch(fetchFavorites());
      dispatch(fetchBookmarks());
    }
  }, [status, session?.user?.email]);

  return null;
}
