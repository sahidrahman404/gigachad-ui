import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="flex h-full items-center py-16">
        <div className="w-full max-w-md mx-auto p-6">{children}</div>
      </div>
    </div>
  );
}
