import Hero from "@/components/hero";
import { useLazyLoadQuery } from "react-relay";
import { GetUserQuery as GetUserQueryType } from "../../__generated__/GetUserQuery.graphql";
import GetUserQuery from "@/gql/GetUser";

export default function Home() {
  const user = useLazyLoadQuery<GetUserQueryType>(GetUserQuery, {});
  return <Hero user={user} />;
}
