import MoviePage from "@/components/MoviePage";
import { Suspense } from "react";

export default function Movie() {
  return (
    <Suspense fallback={<div></div>}>
      <MoviePage />
    </Suspense>
  );
}
