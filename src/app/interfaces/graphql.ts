export interface GraphqlRequest<TVariables = Record<string, never>> {
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
  readonly status?: number;
  readonly validation?: Readonly<Record<string, readonly string[]>>;
  readonly extensions?: GraphqlErrorExtensions;
}

export interface GraphqlErrorLocation {
  readonly line: number;
  readonly column: number;
}

export type GraphqlErrorExtensions = Record<string, never>;
