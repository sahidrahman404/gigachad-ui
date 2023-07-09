/**
 * @generated SignedSource<<12cdcaf21a4bc460f044d7eb03f40f93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetUserPasswordInput = {
  password: string;
  tokenPlainText: string;
};
export type UpdateUserPasswordMutation$variables = {
  input: ResetUserPasswordInput;
};
export type UpdateUserPasswordMutation$data = {
  readonly updateUserPassword: string | null;
};
export type UpdateUserPasswordMutation = {
  response: UpdateUserPasswordMutation$data;
  variables: UpdateUserPasswordMutation$variables;
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
    "name": "updateUserPassword",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateUserPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateUserPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "80d5b0d4c17d90132ac01d94c2a046ec",
    "id": null,
    "metadata": {},
    "name": "UpdateUserPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateUserPasswordMutation(\n  $input: ResetUserPasswordInput!\n) {\n  updateUserPassword(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "1919659af5ae293de70919bf13fda87c";

export default node;
