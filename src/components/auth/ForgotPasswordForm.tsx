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
import { GqlErrorStatus, parseGqlError } from "@/lib/error";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-relay";
import CreatePasswordResetTokenMutation from "@/gql/CreatePasswordResetToken";
import { CreatePasswordResetTokenMutation as CreatePasswordResetTokenMutationType } from "../../../__generated__/CreatePasswordResetTokenMutation.graphql";

const formSchema = z.object({
  email: z.string().email(),
});

export function ForgotPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<GqlErrorStatus>({
    error: null,
    message: null,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<CreatePasswordResetTokenMutationType>(
      CreatePasswordResetTokenMutation
    );

  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          email: values.email,
        },
      },
      onError: (err) => {
        setStatus((status) => ({
          ...status,
          error: true,
          message: err.message,
        }));
      },
      onCompleted: (_res, _err) => {
        router.push(`/auth/reset-password`);
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {`Please enter email address of your registration below`}
          </p>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>{status.message && parseGqlError(status.message)}</p>
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
