type GqlErrorStatus = {
  error: boolean | null;
  message: string | null;
};

function parseGqlError(s: string) {
  return s.split(":")[1].split(/\r?\n/)[1];
}

export type { GqlErrorStatus };
export { parseGqlError };
