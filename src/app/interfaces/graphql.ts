export interface GraphqlRequest<TVariables = Record<string, unknown>> {
  readonly query: string;
  readonly variables?: TVariables;
}

export interface GraphqlResponse<TData> {
  readonly data?: TData;
  readonly errors?: GraphqlError[];
}

export interface GraphqlError {
  readonly message: string;
  readonly locations?: GraphqlErrorLocation[];
  readonly path?: readonly (string | number)[];
  readonly extensions?: GraphqlErrorExtensions;
}

export interface GraphqlErrorLocation {
  readonly line: number;
  readonly column: number;
}

export interface GraphqlErrorExtensions {
  readonly code?: string;
  readonly [key: string]: unknown;
}
