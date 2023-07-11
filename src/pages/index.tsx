import Hero from "@/components/hero";
import { useGetUserQueryRef } from "@/lib/UseGetUser";
import { Suspense } from "react";

export default function Home() {
  const getUserQueryRef = useGetUserQueryRef();

  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && <Hero getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}
