export interface AnimeTag {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly rank?: number;
  readonly isAdult?: boolean;
}
