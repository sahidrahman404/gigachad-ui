import { useQueryLoader } from "react-relay";
import GetUserQuery from "@/gql/GetUser";
import { GetUserQuery as GetUserQueryType } from "../../__generated__/GetUserQuery.graphql";
import { useEffect } from "react";

export function useGetUserQueryRef() {
  const [getUserQueryRef, loadGetUserQuery] =
    useQueryLoader<GetUserQueryType>(GetUserQuery);

  useEffect(() => {
    loadGetUserQuery({});
  }, []);

  return getUserQueryRef;
}
