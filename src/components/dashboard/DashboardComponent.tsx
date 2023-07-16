import GetUserQuery from "@/gql/GetUser";
import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";

export type DashboardProps = {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
};

export default function DashboardComponent({
  getUserQueryRef,
}: DashboardProps) {
  const user = usePreloadedQuery<GetUserQueryType>(
    GetUserQuery,
    getUserQueryRef
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
