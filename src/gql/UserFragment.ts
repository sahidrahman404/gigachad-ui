import { graphql } from "relay-runtime";

const UserFragment = graphql`
  fragment UserFragment on User {
    id
    username
    email
    activated
  }
`;

export default UserFragment;
