import { HttpErrorResponse } from '@angular/common/http';
import type { GraphqlError } from '../../interfaces/graphql';
import type { GraphqlClientErrorOptions } from '../../interfaces/graphql-client-error-options';

export class GraphqlClientError extends Error {
  readonly graphQLErrors?: GraphqlError[];
  readonly status?: number;
  readonly originalError?: Error;

  constructor(message: string, options: GraphqlClientErrorOptions = {}) {
    super(message);
    this.name = 'GraphqlClientError';
    this.graphQLErrors = options.graphQLErrors;
    this.status = options.status;
    this.originalError = options.originalError;
  }
}

export const GRAPHQL_CLIENT_ERROR_KIND = {
  responseErrors: 'response-errors',
  missingData: 'missing-data',
  transport: 'transport',
} as const;

const GRAPHQL_CLIENT_ERROR_MESSAGES = {
  responseErrors: 'GraphQL response contains errors',
  missingData: 'GraphQL response did not include data',
  network: 'Network error while calling AniList.',
  unexpected: 'Unexpected GraphQL client error.',
} as const;

type GraphqlClientErrorKind =
  (typeof GRAPHQL_CLIENT_ERROR_KIND)[keyof typeof GRAPHQL_CLIENT_ERROR_KIND];

interface GraphqlClientErrorContextBase {
  readonly kind: GraphqlClientErrorKind;
}

interface GraphqlClientErrorContextResponseErrors extends GraphqlClientErrorContextBase {
  readonly kind: typeof GRAPHQL_CLIENT_ERROR_KIND.responseErrors;
  readonly graphQLErrors: GraphqlError[];
}

interface GraphqlClientErrorContextMissingData extends GraphqlClientErrorContextBase {
  readonly kind: typeof GRAPHQL_CLIENT_ERROR_KIND.missingData;
}

interface GraphqlClientErrorContextTransport extends GraphqlClientErrorContextBase {
  readonly kind: typeof GRAPHQL_CLIENT_ERROR_KIND.transport;
  readonly error: unknown;
}

type GraphqlClientErrorContext =
  | GraphqlClientErrorContextResponseErrors
  | GraphqlClientErrorContextMissingData
  | GraphqlClientErrorContextTransport;

/**
 * Centraliza el mensaje y la normalizacion de errores para el cliente GraphQL.
 */
export function toGraphqlClientError(context: GraphqlClientErrorContext): GraphqlClientError {
  if (context.kind === GRAPHQL_CLIENT_ERROR_KIND.responseErrors) {
    return new GraphqlClientError(GRAPHQL_CLIENT_ERROR_MESSAGES.responseErrors, {
      graphQLErrors: context.graphQLErrors,
    });
  }

  if (context.kind === GRAPHQL_CLIENT_ERROR_KIND.missingData) {
    return new GraphqlClientError(GRAPHQL_CLIENT_ERROR_MESSAGES.missingData);
  }

  const { error } = context;
  if (error instanceof GraphqlClientError) {
    return error;
  }

  if (error instanceof HttpErrorResponse) {
    return new GraphqlClientError(GRAPHQL_CLIENT_ERROR_MESSAGES.network, {
      status: error.status,
      originalError: normalizeError(error),
    });
  }

  return new GraphqlClientError(GRAPHQL_CLIENT_ERROR_MESSAGES.unexpected, {
    originalError: normalizeError(error),
  });
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  if (error instanceof HttpErrorResponse) {
    return new Error(error.message);
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  return new Error('Unknown error');
}
