import type { GraphqlError } from './graphql';

export interface GraphqlClientErrorOptions {
  readonly graphQLErrors?: GraphqlError[];
  readonly status?: number;
  readonly originalError?: Error;
}
