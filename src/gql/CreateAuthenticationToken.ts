import { graphql } from "relay-runtime";

const CreateAuthenticationTokenMutation = graphql`
  mutation CreateAuthenticationTokenMutation($input: LoginInput!) {
    tokenPlainText: createAuthenticationToken(input: $input)
  }
`;
export default CreateAuthenticationTokenMutation;
