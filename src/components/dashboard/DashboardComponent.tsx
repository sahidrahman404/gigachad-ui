import GetUserQuery from "@/gql/GetUser";
import { useRouter } from "next/router";
import { useMemo, useEffect, Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import Routines, { routinesQuery } from "./Routines";
import { RoutinesQuery } from "../../../__generated__/RoutinesQuery.graphql";

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

  const [routineQueryRef, loadRoutineQuery] =
    useQueryLoader<RoutinesQuery>(routinesQuery);

  const router = useRouter();

  const userMemo = useMemo(() => user, [user.getUser?.id]);

  useEffect(() => {
    if (user.getUser?.activated === 0 || user.getUser === null) {
      router.push("/auth?mode=signin");
    }

    if (user.getUser && user.getUser.id) {
      loadRoutineQuery({ input: user.getUser.id });
      return;
    }

    loadRoutineQuery({ input: "" });
  }, [userMemo]);

  return (
    <Suspense fallback="loading...">
      {routineQueryRef && (
        <div className="space-y-4">
          <p className="text-2xl font-bold">Routines</p>
          <Routines routinesQueryRef={routineQueryRef} />
        </div>
      )}
    </Suspense>
  );
}
