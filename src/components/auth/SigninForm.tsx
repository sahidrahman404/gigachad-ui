import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import { useMemo } from "react";
import { useMutation } from "react-relay";
import { useRouter } from "next/router";
import CreateAuthenticationTokenMutation from "@/gql/CreateAuthenticationToken";
import wretch from "wretch";
import { CreateAuthenticationTokenMutation as CreateAuthenticationTokenMutationToken } from "../../../__generated__/CreateAuthenticationTokenMutation.graphql";
import { atom, useAtom, useAtomValue } from "jotai";
import { ShowPasswordCheckBox, showPasswordAtom } from "./ShowPasswordCheckBox";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

const signInErrorMessageAtom = atom<GqlErrorStatus>({
  error: null,
  message: null,
  messages: null,
});

export function SigninForm() {
  const router = useRouter();
  const showPassword = useAtomValue(showPasswordAtom);

  const isPasswordReseted = router.query["reset"] ?? "";
  const signInTitleClass = "mt-2 text-sm text-gray-600 dark:text-gray-400";

  const forgotPathAtom = useMemo(() => atom(""), []);
  const forgotPath = useAtomValue(forgotPathAtom);
  forgotPathAtom.onMount = (setPathAtom) => {
    setPathAtom(router.asPath);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [status, setStatus] = useAtom(signInErrorMessageAtom);
  signInErrorMessageAtom.onMount = () => {
    setStatus({
      error: null,
      message: null,
      messages: null,
    });
  };
  const [commitMutation, isMutationInFlight] =
    useMutation<CreateAuthenticationTokenMutationToken>(
      CreateAuthenticationTokenMutation
    );
  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          email: values.email,
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
      onCompleted: (res, err) => {
        if (err) {
          setStatus((status) => ({
            ...status,
            error: true,
            message: null,
            messages: err,
          }));
        }

        if (res.createAuthenticationToken?.user.activated === 1) {
          const tokenPlainText = res.createAuthenticationToken?.tokenPlainText;
          wretch(`http://localhost:4444/v1/tokens/set/${tokenPlainText}`)
            .options({ credentials: "include", mode: "cors" })
            .get()
            .json((res) => console.log(res));
          router.push(`/dashboard`);
          return;
        }

        if (res.createAuthenticationToken?.user.activated === 0) {
          router.push(
            `/auth/verify/?mail=${res.createAuthenticationToken.user.email}`
          );
        }
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            {isPasswordReseted === "success"
              ? "Password changed successfully!"
              : "Sign in"}
          </h1>
          {isPasswordReseted === "success" ? (
            <p className={signInTitleClass}>
              Please login to your account again
            </p>
          ) : (
            <p className={signInTitleClass}>
              Don&#39;t have an account yet?{" "}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="auth/?mode=signup"
              >
                Sign up here
              </Link>
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
            Or
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jenna@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="strongpa5word"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ShowPasswordCheckBox />
              <Link
                className="text-sm text-blue-600 decoration-2 hover:underline font-medium block"
                href={`${forgotPath}&forgot=true`}
              >
                Forgot password?
              </Link>
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
