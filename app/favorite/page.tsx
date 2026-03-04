import FavoritePage from "@/components/FavoritePage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <FavoritePage />
    </Suspense>
  );
}
