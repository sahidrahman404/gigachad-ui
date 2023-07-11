import GetUserQuery from "@/gql/GetUser";
import { useLazyLoadQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../../__generated__/GetUserQuery.graphql";
import { useRouter } from "next/router";

export default function DashboradPage() {
  const router = useRouter();
  const user = useLazyLoadQuery<GetUserQueryType>(GetUserQuery, {});
  if (user.getUser?.activated === 0 || user.getUser === null) {
  }

  return <p>dashboard</p>;
}
