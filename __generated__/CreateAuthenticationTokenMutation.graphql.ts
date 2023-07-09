/**
 * @generated SignedSource<<9ed9f669ff7d0fdc722a8359ed96f288>>
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
  readonly createAuthenticationToken: {
    readonly tokenPlainText: string;
    readonly user: {
      readonly activated: number;
      readonly email: string;
      readonly id: string;
      readonly username: string;
    };
  } | null;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AuthenticationToken",
    "kind": "LinkedField",
    "name": "createAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tokenPlainText",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "activated",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
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
    "cacheID": "5a4f6ed48053d785a4fef44840eb2334",
    "id": null,
    "metadata": {},
    "name": "CreateAuthenticationTokenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAuthenticationTokenMutation(\n  $input: LoginInput!\n) {\n  createAuthenticationToken(input: $input) {\n    tokenPlainText\n    user {\n      id\n      username\n      email\n      activated\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "29c1122ace645931e934e8b4c67b6b7b";

export default node;
