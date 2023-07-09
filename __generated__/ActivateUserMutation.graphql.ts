/**
 * @generated SignedSource<<29d294ac43253c946cc290695ed4b86c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ActivateUserInput = {
  tokenPlainText: string;
};
export type ActivateUserMutation$variables = {
  input: ActivateUserInput;
};
export type ActivateUserMutation$data = {
  readonly activateUser: {
    readonly tokenPlainText: string;
    readonly user: {
      readonly id: string;
      readonly username: string;
    };
  } | null;
};
export type ActivateUserMutation = {
  response: ActivateUserMutation$data;
  variables: ActivateUserMutation$variables;
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
    "name": "activateUser",
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
    "name": "ActivateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d3981adf7a32e72edcb3883de68dbe30",
    "id": null,
    "metadata": {},
    "name": "ActivateUserMutation",
    "operationKind": "mutation",
    "text": "mutation ActivateUserMutation(\n  $input: ActivateUserInput!\n) {\n  activateUser(input: $input) {\n    tokenPlainText\n    user {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff78f4a9ccbde27421a3a4469fc759c2";

export default node;
