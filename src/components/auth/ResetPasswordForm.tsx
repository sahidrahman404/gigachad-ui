import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErrorMessage, GqlErrorStatus } from "@/lib/FormErrorMessage";
import { useRouter } from "next/router";
import { useMutation } from "react-relay";
import UpdatetUserPasswordMutation from "@/gql/UpdateUserPassword";
import { UpdateUserPasswordMutation } from "../../../__generated__/UpdateUserPasswordMutation.graphql";
import Link from "next/link";
import { atom, useAtom, useAtomValue } from "jotai";
import { ShowPasswordCheckBox, showPasswordAtom } from "./ShowPasswordCheckBox";

const formSchema = z
  .object({
    token: z.string().min(26).max(26),
    password: z.string().min(8).max(72),
    confirmPassword: z.string().min(8).max(72),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const resetPasswordErrorMessageAtom = atom<GqlErrorStatus>({
  error: null,
  message: null,
  messages: null,
});

export function ResetPasswordForm() {
  const router = useRouter();

  const showPassword = useAtomValue(showPasswordAtom);

  const [status, setStatus] = useAtom(resetPasswordErrorMessageAtom);
  resetPasswordErrorMessageAtom.onMount = () => {
    setStatus({
      error: null,
      message: null,
      messages: null,
    });
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<UpdateUserPasswordMutation>(UpdatetUserPasswordMutation);

  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          tokenPlainText: values.token,
          password: values.password,
        },
      },
      onError: (err) => {
        setStatus((status) => ({
          ...status,
          error: true,
          message: err.message,
          messages: null,
        }));
      },
      onCompleted: (_res, err) => {
        if (err) {
          setStatus((status) => ({
            ...status,
            error: true,
            message: null,
            messages: err,
          }));
        }
        router.push(`/auth?mode=signin&reset=success`);
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            We sent you reset token
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please enter the reset token and your new password below
          </p>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                className="text-[0.8rem] text-blue-600 decoration-2 hover:underline font-medium block"
                href={`/auth?forgot=true`}
              >
                Didn't receive token?
              </Link>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ShowPasswordCheckBox />
              <FormErrorMessage status={status} />
              <Button type="submit" disabled={isMutationInFlight}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
