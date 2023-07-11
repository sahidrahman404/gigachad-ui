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
import {
  FormErrorMessage,
  GqlErrorStatus,
  parseGqlError,
} from "@/lib/FormErrorMessage";
import { useRouter } from "next/router";
import { useMutation } from "react-relay";
import CreateActivationTokenMutation from "@/gql/CreateActivationToken";
import { CreateActivationTokenMutation as CreateActivationTokenMutationType } from "../../../__generated__/CreateActivationTokenMutation.graphql";
import { atom, useAtom } from "jotai";

const formSchema = z.object({
  email: z.string().email(),
});

const resendVerificationnFormErrorMessageAtom = atom<GqlErrorStatus>({
  error: null,
  message: null,
  messages: null,
});

export function ResendVerificationForm() {
  const router = useRouter();
  const [status, setStatus] = useAtom(resendVerificationnFormErrorMessageAtom);
  resendVerificationnFormErrorMessageAtom.onMount = () => {
    setStatus({
      error: null,
      message: null,
      messages: null,
    });
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [commitMutation, isMutationInFlight] =
    useMutation<CreateActivationTokenMutationType>(
      CreateActivationTokenMutation
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
        router.push(`/auth/verify?mail=${values.email}`);
      },
    });
  }
  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Resend your token
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
