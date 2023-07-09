import AuthLayout from "@/components/auth/AuthLayout";
import { VerificationForm } from "@/components/auth/VerificationForm";
import { ReactNode } from "react";

export default function VerificationPage() {
  return <VerificationForm />;
}

VerificationPage.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
