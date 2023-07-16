import GetUserQuery from "@/gql/GetUser";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import { useGetUserQueryRef } from "@/lib/UseGetUser";
import { ReactNode, Suspense, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function AccountPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && <Account getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}

interface AccountProps {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
}

function Account(props: AccountProps) {
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

  return <p>account</p>;
}

AccountPage.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
