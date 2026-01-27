import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError, type Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { GraphqlError, GraphqlRequest, GraphqlResponse } from '../interfaces/graphql';

interface GraphqlClientErrorOptions {
  readonly graphQLErrors?: GraphqlError[];
  readonly status?: number;
  readonly originalError?: unknown;
}

export class GraphqlClientError extends Error {
  readonly graphQLErrors?: GraphqlError[];
  readonly status?: number;
  readonly originalError?: unknown;

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

  execute<TData, TVariables = Record<string, unknown>>(
    query: string,
    variables?: TVariables,
  ): Observable<TData> {
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
        originalError: error,
      });
    }

    return new GraphqlClientError('Unexpected GraphQL client error.', {
      originalError: error,
    });
  }
}
