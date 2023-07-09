/**
 * @generated SignedSource<<80277dd076a7c7ee9f5a83ca09b33924>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type GetUserQuery$variables = {};
export type GetUserQuery$data = {
  readonly getUser: {
    readonly activated: number;
    readonly email: string;
    readonly id: string;
    readonly username: string;
  } | null;
};
export type GetUserQuery = {
  response: GetUserQuery$data;
  variables: GetUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "getUser",
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6eca4854e991ce996460c5b54dcde785",
    "id": null,
    "metadata": {},
    "name": "GetUserQuery",
    "operationKind": "query",
    "text": "query GetUserQuery {\n  getUser {\n    id\n    username\n    email\n    activated\n  }\n}\n"
  }
};
})();

(node as any).hash = "9bb03a1b2c528caa4234ec568a2da11a";

export default node;
