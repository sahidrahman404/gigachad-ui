import AuthLayout from "@/components/auth/AuthLayout";
import { VerificationForm } from "@/components/auth/VerificationForm";
import GetUserQuery from "@/gql/GetUser";
import { useRouter } from "next/router";
import { ReactNode, Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../../__generated__/GetUserQuery.graphql";
import { ResendVerificationForm } from "@/components/auth/ResendVerificationForm";
import { useGetUserQueryRef } from "@/lib/UseGetUser";

export default function VerificationPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && <Verification getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}

interface VerificationProps {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
}

function Verification(props: VerificationProps) {
  const router = useRouter();
  const user = usePreloadedQuery<GetUserQueryType>(
    GetUserQuery,
    props.getUserQueryRef
  );

  if (user.getUser?.activated === 1) {
    router.push(`/dashboard`);
  }

  const isResend = router.query["resend"] ?? "";

  if (isResend) {
    return <ResendVerificationForm />;
  }

  return <VerificationForm />;
}

VerificationPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
