export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
export function isObject(value: unknown): value is object {
  return typeof value === 'object';
}

export function isNumericString(value: unknown): value is string {
  return isString(value) && !isNaN(+value);
}
