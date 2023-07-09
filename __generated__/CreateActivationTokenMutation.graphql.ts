/**
 * @generated SignedSource<<430b55d2e9a5b527f4186e42b2c13884>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ActivationTokenInput = {
  email: string;
};
export type CreateActivationTokenMutation$variables = {
  input: ActivationTokenInput;
};
export type CreateActivationTokenMutation$data = {
  readonly createActivationToken: string | null;
};
export type CreateActivationTokenMutation = {
  response: CreateActivationTokenMutation$data;
  variables: CreateActivationTokenMutation$variables;
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
    "name": "createActivationToken",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateActivationTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateActivationTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "09348a71f57314e687bd8399d483e93e",
    "id": null,
    "metadata": {},
    "name": "CreateActivationTokenMutation",
    "operationKind": "mutation",
    "text": "mutation CreateActivationTokenMutation(\n  $input: ActivationTokenInput!\n) {\n  createActivationToken(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "217990c529ac58fd0b6031726c786bc7";

export default node;
