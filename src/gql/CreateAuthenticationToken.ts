import { graphql } from "relay-runtime";

const CreateAuthenticationTokenMutation = graphql`
  mutation CreateAuthenticationTokenMutation($input: LoginInput!) {
    createAuthenticationToken(input: $input) {
      tokenPlainText
      user {
        id
        username
        email
        activated
      }
    }
  }
`;
export default CreateAuthenticationTokenMutation;
