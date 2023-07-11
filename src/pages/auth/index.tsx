import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import GetUserQuery from "@/gql/GetUser";
import { useLazyLoadQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function AuthPage() {
  const router = useRouter();
  const user = useLazyLoadQuery<GetUserQueryType>(GetUserQuery, {});

  if (user.getUser?.activated === 1) {
    router.push(`/dashboard`);
  }

  const isForgot = router.query["forgot"] ?? "";
  if (isForgot) {
    return <ForgotPasswordForm />;
  }

  const params = router.query["mode"] ?? "signup";
  if (params === "signup") {
    return <SignupForm />;
  }
  if (params === "signin") {
    return <SigninForm />;
  }
  return null;
}

AuthPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
