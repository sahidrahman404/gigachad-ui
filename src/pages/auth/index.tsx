import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useEffect, useMemo } from "react";
import GetUserQuery from "@/gql/GetUser";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useGetUserQueryRef } from "@/lib/UseGetUser";

export default function AuthPage() {
  const getUserQueryRef = useGetUserQueryRef();
  return (
    <Suspense fallback="loading...">
      {getUserQueryRef && <Auth getUserQueryRef={getUserQueryRef} />}
    </Suspense>
  );
}

interface AuthProps {
  getUserQueryRef: PreloadedQuery<GetUserQueryType, Record<string, unknown>>;
}

function Auth(props: AuthProps) {
  const router = useRouter();
  const user = usePreloadedQuery<GetUserQueryType>(
    GetUserQuery,
    props.getUserQueryRef
  );

  const userMemo = useMemo(() => user, [user.getUser?.id]);

  useEffect(() => {
    if (user.getUser?.activated === 1) {
      router.push(`/dashboard`);
    }
  }, [userMemo]);

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
}

AuthPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
