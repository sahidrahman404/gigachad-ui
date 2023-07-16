import { useGetUserQueryRef } from "@/lib/UseGetUser";
import { ReactNode, Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import DashboardComponent from "@/components/dashboard/DashboardComponent";

export default function DashboradPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && (
        <DashboardComponent getUserQueryRef={getUserQueryRef} />
      )}
    </Suspense>
  );
}

DashboradPage.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
