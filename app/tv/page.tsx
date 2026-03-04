import TvPage from "@/components/TvPage";
import { Suspense } from "react";

export default function TV() {
  return (
    <Suspense fallback={<div></div>}>
      <TvPage />
    </Suspense>
  );
}
