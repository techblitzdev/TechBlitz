// This utility type creates a union type where at least one property from T must be present
export type RequireAtLeastOne<T> = {
  // [K in keyof T] creates a mapped type, iterating over each property K in type T
  // The -? removes optional modifiers (making properties required by default)
  [K in keyof T]-?: // Example: if K is 'name', this makes { name: string } required // Required<...> makes that property required // Pick<T, K> selects just the current property K from T // Part 1: Required<Pick<T, K>> // For each property K, we create a type that:
  Required<Pick<T, K>> &
    // & performs an intersection with...
    // Part 2: Partial<Pick<T, Exclude<keyof T, K>>>
    // Exclude<keyof T, K> takes all properties of T EXCEPT the current one K
    // Pick<T, ...> creates a type with those remaining properties
    // Partial<...> makes all those properties optional
    // Example: if K is 'name', this makes all other properties optional
    Partial<Pick<T, Exclude<keyof T, K>>>;
  // [keyof T] at the end creates a union of all these combinations
  // This transforms the mapped type into a union type where at least one property must be present
}[keyof T];
