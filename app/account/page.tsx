import UserPage from "@/components/UserPage";
import UserPageSkeleton from "@/components/UserPageSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Account",
  description: "Manage your account settings and preferences.",
};

export default function AccountPage() {
  return (
    <>
      <Suspense fallback={<UserPageSkeleton />}>
        <UserPage />
      </Suspense>
    </>
  );
}
