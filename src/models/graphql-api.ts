import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

export interface GraphQLOptions {
  input?: object;
  variables?: object;
  authMode?: GRAPHQL_AUTH_MODE;
}

// generic interface
export interface SubscriptionValue<T> {
  value: { data: T }
}

// Small Generic wrapper for type safety. Returns the result of API.graphql(...). Result is from type GraphQLResult<T>.
async function callGraphQL<T>(query: any, options?: GraphQLOptions): Promise<GraphQLResult<T>> {
  return (await API.graphql(graphqlOperation(query, options))) as GraphQLResult<T>
}

// Subscriptions enable realtime updates.
export function subscribeGraphQL<T>(subscription: any, callback: (value: T) => void) {
  //@ts-ignore
  return API.graphql(graphqlOperation(subscription)).subscribe({
    next: (response: SubscriptionValue<T>) => {
      callback(response.value.data)
    },
  });
}

export default callGraphQL;