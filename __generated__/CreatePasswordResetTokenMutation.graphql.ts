/**
 * @generated SignedSource<<8091543d743724257e916b76cc5c97e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetPasswordInput = {
  email: string;
};
export type CreatePasswordResetTokenMutation$variables = {
  input: ResetPasswordInput;
};
export type CreatePasswordResetTokenMutation$data = {
  readonly createPasswordResetToken: string | null;
};
export type CreatePasswordResetTokenMutation = {
  response: CreatePasswordResetTokenMutation$data;
  variables: CreatePasswordResetTokenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "createPasswordResetToken",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePasswordResetTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePasswordResetTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "15d03ab164553fa790a873999985e7ad",
    "id": null,
    "metadata": {},
    "name": "CreatePasswordResetTokenMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePasswordResetTokenMutation(\n  $input: ResetPasswordInput!\n) {\n  createPasswordResetToken(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "8917b95d0d2e2bba3ee8861a90962987";

export default node;
