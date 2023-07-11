import AuthLayout from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import GetUserQuery from "@/gql/GetUser";
import router from "next/router";
import { ReactNode, Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../../__generated__/GetUserQuery.graphql";
import { useGetUserQueryRef } from "@/lib/UseGetUser";

export default function ResetPasswordPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense>
      {getUserQueryRef && <ResetPassword getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}

interface ResetPasswordProps {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
}

function ResetPassword(props: ResetPasswordProps) {
  const user = usePreloadedQuery<GetUserQueryType>(
    GetUserQuery,
    props.getUserQueryRef
  );

  if (user.getUser?.activated === 1) {
    router.push(`/dashboard`);
  }

  return <ResetPasswordForm />;
}

ResetPasswordPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
