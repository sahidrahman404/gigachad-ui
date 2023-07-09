import { SigninForm } from "@/components/auth/SigninForm";
import { SignupForm } from "@/components/auth/SignupForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function AuthPage() {
  const router = useRouter();
  const params = router.query["q"] ?? "signup";
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
