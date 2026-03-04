import SearchPage from "@/components/SearchPage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <SearchPage />
    </Suspense>
  );
}
