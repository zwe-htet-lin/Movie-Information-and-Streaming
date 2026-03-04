import BookmarkPathPage from "@/components/BookmarkPathPage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <BookmarkPathPage />
    </Suspense>
  );
}
