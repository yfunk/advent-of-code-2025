export function union<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a, ...b]);
}

export function intersection<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a].filter((value) => b.has(value)));
}

export function difference<T>(a: Set<T>, b: Set<T>) {
  return new Set([...a].filter((value) => !b.has(value)));
}
