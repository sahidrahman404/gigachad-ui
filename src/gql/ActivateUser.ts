import { graphql } from "relay-runtime";

const ActivateUserMutation = graphql`
  mutation ActivateUserMutation($input: ActivateUserInput!) {
    activateUser(input: $input) {
      id
      activated
    }
  }
`;
export default ActivateUserMutation;
