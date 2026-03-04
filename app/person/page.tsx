import PersonPage from "@/components/PersonPage";
import { Suspense } from "react";

export default function Person() {
  return (
    <Suspense fallback={<div></div>}>
      <PersonPage />
    </Suspense>
  );
}
