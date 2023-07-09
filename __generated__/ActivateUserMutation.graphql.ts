/**
 * @generated SignedSource<<03f2887d81b7f6890e0e0c32be58ce2d>>
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
    readonly activated: number;
    readonly id: string;
  };
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "activateUser",
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
        "name": "activated",
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
    "cacheID": "76d07d875533c4f68ac4aabeb92e9480",
    "id": null,
    "metadata": {},
    "name": "ActivateUserMutation",
    "operationKind": "mutation",
    "text": "mutation ActivateUserMutation(\n  $input: ActivateUserInput!\n) {\n  activateUser(input: $input) {\n    id\n    activated\n  }\n}\n"
  }
};
})();

(node as any).hash = "3e0805928c0ed8ab86c35b5261120148";

export default node;
