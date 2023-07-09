/**
 * @generated SignedSource<<9d65c1629f86a25b4de1299160858ec4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {
  email: string;
  password: string;
};
export type CreateAuthenticationTokenMutation$variables = {
  input: LoginInput;
};
export type CreateAuthenticationTokenMutation$data = {
  readonly tokenPlainText: string | null;
};
export type CreateAuthenticationTokenMutation = {
  response: CreateAuthenticationTokenMutation$data;
  variables: CreateAuthenticationTokenMutation$variables;
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
    "alias": "tokenPlainText",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "createAuthenticationToken",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAuthenticationTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAuthenticationTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f99ff5c515a1a1db8260de5b5dae82bc",
    "id": null,
    "metadata": {},
    "name": "CreateAuthenticationTokenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAuthenticationTokenMutation(\n  $input: LoginInput!\n) {\n  tokenPlainText: createAuthenticationToken(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "67a3c862eae47989dd1193fb1dd088fd";

export default node;
