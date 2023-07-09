import { graphql } from "relay-runtime";

const CreatePasswordResetTokenMutation = graphql`
  mutation CreatePasswordResetTokenMutation($input: ResetPasswordInput!) {
    createPasswordResetToken(input: $input)
  }
`;
export default CreatePasswordResetTokenMutation;
