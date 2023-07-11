import AuthLayout from "@/components/auth/AuthLayout";
import { VerificationForm } from "@/components/auth/VerificationForm";
import GetUserQuery from "@/gql/GetUser";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useLazyLoadQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../../__generated__/GetUserQuery.graphql";
import { ResendVerificationForm } from "@/components/auth/ResendVerificationForm";

export default function VerificationPage() {
  const router = useRouter();
  const user = useLazyLoadQuery<GetUserQueryType>(GetUserQuery, {});

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
