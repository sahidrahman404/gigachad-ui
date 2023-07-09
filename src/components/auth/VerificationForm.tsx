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
import ActivateUserMutation from "@/gql/ActivateUser";
import { ActivateUserMutation as ActivateUserMutationType } from "../../../__generated__/ActivateUserMutation.graphql";

const formSchema = z.object({
  token: z.string().min(26).max(26),
});

export function VerificationForm() {
  const router = useRouter();
  const email = router.query["mail"] ?? "";
  const [status, setStatus] = useState<GqlErrorStatus>({
    error: null,
    message: null,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<ActivateUserMutationType>(ActivateUserMutation);
  function onSubmit(values: z.infer<typeof formSchema>) {
    commitMutation({
      variables: {
        input: {
          tokenPlainText: values.token,
        },
      },
      onError: (err) => {
        setStatus((status) => ({
          ...status,
          error: true,
          message: err.message,
        }));
      },
      onCompleted: (res, err) => {
        console.log(res.activateUser);
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            We sent you a token
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {`Enter it below to verify ${email}`}
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
