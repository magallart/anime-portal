import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError, type Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { GraphqlOperation, GraphqlRequest, GraphqlResponse } from '../interfaces/graphql';
import { GRAPHQL_CLIENT_ERROR_KIND, toGraphqlClientError } from '../lib/graphql/graphql-errors';

@Injectable({
  providedIn: 'root',
})
export class GraphqlClientService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.anilistApiUrl;

  executeOperation<TData, TVariables = Record<string, never>>(
    operation: GraphqlOperation<TData, TVariables>,
    variables?: TVariables,
  ): Observable<TData> {
    const body: GraphqlRequest<TVariables> =
      variables === undefined
        ? { query: operation.query }
        : { query: operation.query, variables };

    return this.http
      .post<GraphqlResponse<TData>>(this.apiUrl, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((response) => {
          if (response.errors?.length) {
            throw toGraphqlClientError({
              kind: GRAPHQL_CLIENT_ERROR_KIND.responseErrors,
              graphQLErrors: response.errors,
            });
          }

          if (response.data === undefined) {
            throw toGraphqlClientError({
              kind: GRAPHQL_CLIENT_ERROR_KIND.missingData,
            });
          }

          return response.data;
        }),
        catchError((error) =>
          throwError(() =>
            toGraphqlClientError({
              kind: GRAPHQL_CLIENT_ERROR_KIND.transport,
              error,
            }),
          ),
        ),
      );
  }
}
