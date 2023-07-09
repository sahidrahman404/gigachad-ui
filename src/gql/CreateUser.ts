import { graphql } from "relay-runtime";

const CreateUserMutation = graphql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

export default CreateUserMutation;
