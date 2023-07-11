import AuthLayout from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import GetUserQuery from "@/gql/GetUser";
import router from "next/router";
import { ReactNode } from "react";
import { useLazyLoadQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../../__generated__/GetUserQuery.graphql";

export default function ResetPasswordPage() {
  const user = useLazyLoadQuery<GetUserQueryType>(GetUserQuery, {});

  if (user.getUser?.activated === 1) {
    router.push(`/dashboard`);
  }

  return <ResetPasswordForm />;
}

ResetPasswordPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
