import { graphql } from "relay-runtime";

const UpdatetUserPasswordMutation = graphql`
  mutation UpdateUserPasswordMutation($input: ResetUserPasswordInput!) {
    updateUserPassword(input: $input)
  }
`;

export default UpdatetUserPasswordMutation;
