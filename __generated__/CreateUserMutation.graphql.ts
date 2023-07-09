/**
 * @generated SignedSource<<9f96e4a8a3109336ec81fc23b2d5f075>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateUserInput = {
  email: string;
  exerciseIDs?: ReadonlyArray<string> | null;
  hashedPassword: string;
  name: string;
  routineIDs?: ReadonlyArray<string> | null;
  tokenIDs?: ReadonlyArray<string> | null;
  username: string;
  workoutIDs?: ReadonlyArray<string> | null;
  workoutLogIDs?: ReadonlyArray<string> | null;
};
export type CreateUserMutation$variables = {
  input: CreateUserInput;
};
export type CreateUserMutation$data = {
  readonly createUser: {
    readonly id: string;
  };
};
export type CreateUserMutation = {
  response: CreateUserMutation$data;
  variables: CreateUserMutation$variables;
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
    "name": "createUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "CreateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "47620a12fcb9e2d2b0f7ff68a06beb13",
    "id": null,
    "metadata": {},
    "name": "CreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation CreateUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9859da8998d053fe64b00de5bed290d4";

export default node;
