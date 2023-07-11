import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-relay";
import Link from "next/link";
import { FormErrorMessage, GqlErrorStatus } from "@/lib/FormErrorMessage";
import { useRouter } from "next/router";
import CreateUserMutation from "@/gql/CreateUser";
import { CreateUserMutation as CreateUserMutationType } from "../../../__generated__/CreateUserMutation.graphql";
import { ShowPasswordCheckBox, showPasswordAtom } from "./ShowPasswordCheckBox";
import { atom, useAtom, useAtomValue } from "jotai";

const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3),
    username: z.string().min(5).max(72),
    password: z.string().min(8).max(72),
    confirmPassword: z.string().min(8).max(72),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const signUpFormErrorMessageAtom = atom<GqlErrorStatus>({
  error: null,
  message: null,
  messages: null,
});

export function SignupForm() {
  const router = useRouter();
  const showPassword = useAtomValue(showPasswordAtom);
  const [status, setStatus] = useAtom(signUpFormErrorMessageAtom);
  signUpFormErrorMessageAtom.onMount = () => {
    setStatus({
      error: null,
      message: null,
      messages: null,
    });
  };
  const [commitMutation, isMutationInFlight] =
    useMutation<CreateUserMutationType>(CreateUserMutation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          email: values.email,
          name: values.name,
          username: values.username,
          hashedPassword: values.password,
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
        if (!err) {
          router.push(`auth/verify?mail=${res.createUser.email}`);
        }
        setStatus((status) => ({
          ...status,
          error: true,
          message: null,
          messages: err,
        }));
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Sign up
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="text-blue-600 decoration-2 hover:underline font-medium"
              href="/auth/?mode=signin"
            >
              Sign in here
            </Link>
          </p>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="jenna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jenna123" {...field} />
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
                        placeholder="5tr0n9p@5sw0rd"
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5tr0n9p@5sw0rd"
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
