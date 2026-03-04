import BookmarkPage from "@/components/BookmarkPage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <BookmarkPage />
    </Suspense>
  );
}
