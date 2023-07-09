import { graphql } from "relay-runtime";

const ActivateUserMutation = graphql`
  mutation ActivateUserMutation($input: ActivateUserInput!) {
    activateUser(input: $input) {
      tokenPlainText
      user {
        id
        username
      }
    }
  }
`;
export default ActivateUserMutation;
