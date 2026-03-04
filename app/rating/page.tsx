import RatingPage from "@/components/RatingPage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <RatingPage />
    </Suspense>
  );
}
