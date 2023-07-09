import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";
import wretch from "wretch";
const HTTP_ENDPOINT = "http://localhost:4444";

const tokenApi = wretch(`${HTTP_ENDPOINT}/v1/tokens/get`)
  .options({ credentials: "include", mode: "cors" })
  .resolve((res) => res.json());

const gqlApi = wretch(`${HTTP_ENDPOINT}/query`)
  .headers({
    Accept:
      "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
    "Content-Type": "application/json",
  })
  .options({ credentials: "include", mode: "cors" })
  .resolve((res) => res.json());

const fetchFn: FetchFunction = async (request, variables) => {
  let token;
  try {
    token = await tokenApi.get();
  } catch (err) {
    console.log("CANNOT GET HTTP ACCESS TOKEN");
  }
  if (!token) {
    const resp = (await gqlApi
      // @ts-ignore
      .post({
        query: request.text, // <-- The GraphQL document composed by Relay
        variables,
      })) as any;

    return resp;
  }
  // @ts-ignore
  const resp = (await gqlApi
    // @ts-ignore
    .auth(`Bearer ${token["token"]}`)
    .post({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    })) as any;

  return resp;
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

let relayEnvironment: Environment | undefined;

export function initRelayEnvironment() {
  const environment = relayEnvironment ?? createRelayEnvironment();

  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return environment;
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return relayEnvironment;
}
