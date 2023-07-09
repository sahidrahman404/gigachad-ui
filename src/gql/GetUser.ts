import { graphql } from "relay-runtime";

const GetUserQuery = graphql`
  query GetUserQuery {
    getUser {
      id
      username
      email
      activated
    }
  }
`;

export default GetUserQuery;
