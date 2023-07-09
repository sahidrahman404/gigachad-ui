import { graphql } from "relay-runtime";

const CreateActivationTokenMutation = graphql`
  mutation CreateActivationTokenMutation($input: ActivationTokenInput!) {
    createActivationToken(input: $input)
  }
`;
export default CreateActivationTokenMutation;
