import { PayloadError } from "relay-runtime";

type GqlErrorStatus = {
  error: boolean | null;
  message: string | null;
  messages: PayloadError[] | null;
};

function parseGqlError(s: string) {
  return s.split(":")[1].split(/\r?\n/)[1];
}

interface FormErrorMessageProps {
  status: GqlErrorStatus;
}

export function FormErrorMessage(props: FormErrorMessageProps) {
  const errorClassName = "text-red-500";
  if (props.status.message !== null) {
    return (
      <p className={errorClassName}>{parseGqlError(props.status.message)}</p>
    );
  }

  if (props.status.messages !== null) {
    return (
      <>
        {props.status.messages.map((error) => {
          return (
            <p className={errorClassName} key={error.message}>
              {error.message}
            </p>
          );
        })}
      </>
    );
  }
}

export type { GqlErrorStatus };
export { parseGqlError };
