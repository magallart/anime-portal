import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError, type Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type {
  GraphqlError,
  GraphqlOperation,
  GraphqlRequest,
  GraphqlResponse,
} from '../interfaces/graphql';
import type { GraphqlClientErrorOptions } from '../interfaces/graphql-client-error-options';

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

@Injectable({
  providedIn: 'root',
})
export class GraphqlClientService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.anilistApiUrl;

  execute<TData, TVariables = Record<string, never>>(
    query: string,
    variables?: TVariables,
  ): Observable<TData>;
  execute<TData, TVariables = Record<string, never>>(
    operation: GraphqlOperation<TData, TVariables>,
    variables?: TVariables,
  ): Observable<TData>;
  execute<TData, TVariables = Record<string, never>>(
    queryOrOperation: string | GraphqlOperation<TData, TVariables>,
    variables?: TVariables,
  ): Observable<TData> {
    const query = typeof queryOrOperation === 'string'
      ? queryOrOperation
      : queryOrOperation.query;
    const body: GraphqlRequest<TVariables> =
      variables === undefined ? { query } : { query, variables };

    return this.http
      .post<GraphqlResponse<TData>>(this.apiUrl, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((response) => {
          if (response.errors?.length) {
            throw new GraphqlClientError('GraphQL response contains errors', {
              graphQLErrors: response.errors,
            });
          }

          if (response.data === undefined) {
            throw new GraphqlClientError('GraphQL response did not include data');
          }

          return response.data;
        }),
        catchError((error) => throwError(() => this.asGraphqlClientError(error))),
      );
  }

  private asGraphqlClientError(error: unknown): GraphqlClientError {
    if (error instanceof GraphqlClientError) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      return new GraphqlClientError('Network error while calling AniList.', {
        status: error.status,
        originalError: this.normalizeError(error),
      });
    }

    return new GraphqlClientError('Unexpected GraphQL client error.', {
      originalError: this.normalizeError(error),
    });
  }

  private normalizeError(error: unknown): Error {
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
}
