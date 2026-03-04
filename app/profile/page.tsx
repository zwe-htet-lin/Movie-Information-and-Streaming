import ProfilePage from "@/components/ProfilePage";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense fallback={<div></div>}>
      <ProfilePage />
    </Suspense>
  );
}
