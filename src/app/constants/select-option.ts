export type SelectOption<T extends string | number> = Readonly<{
  value: T;
  label: string;
}>;
