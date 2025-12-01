export function sum(numbers: number[]) {
  return numbers.reduce(function (sum, num) {
    return sum + num;
  }, 0);
}

export function multiply(numbers: number[]) {
  return numbers.reduce(function (res, num) {
    return res * num;
  }, 1);
}

export function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export function isBetween(x: number, [min, max]: [number, number]) {
  return x >= min && x <= max;
}

export function min(numbers: number[]) {
  return Math.min(...numbers);
}

export function max(numbers: number[]) {
  return Math.max(...numbers);
}

export function range(length: number, start?: number) {
  const values = [...Array(length).keys()];
  return start
    ? values.map(function (v) {
        return start + v;
      })
    : values;
}

export function wrap(value: number, min: number, max: number) {
  const range = max - min + 1;
  return ((((value - min) % range) + range) % range) + min;
}

export function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}

export function lcm(numbers: number[]) {
  return numbers.reduce(function (res, num) {
    return (res * num) / gcd(res, num);
  }, 1);
}
