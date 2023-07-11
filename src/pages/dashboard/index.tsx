import GetUserQuery from "@/gql/GetUser";
import {
  PreloadedQuery,
  useLazyLoadQuery,
  usePreloadedQuery,
} from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import { useGetUserQueryRef } from "@/lib/UseGetUser";
import { Suspense, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

export default function DashboradPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && <Dashboard getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}

interface DashboardProps {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
}

function Dashboard(props: DashboardProps) {
  const user = usePreloadedQuery<GetUserQueryType>(
    GetUserQuery,
    props.getUserQueryRef
  );
  const router = useRouter();

  const userMemo = useMemo(() => user, [user.getUser?.id]);

  useEffect(() => {
    if (user.getUser?.activated === 0 || user.getUser === null) {
      router.push("/auth?mode=signin");
    }
  }, [userMemo]);

  return <p>dashboard</p>;
}
