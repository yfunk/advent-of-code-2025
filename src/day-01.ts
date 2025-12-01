import { readInput } from 'io';
import { parseLines } from 'parse';
import { wrap } from 'utils/math';

const RANGE_MIN = 0;
const RANGE_MAX = 99;
const RANGE_SIZE = RANGE_MAX - RANGE_MIN + 1;

const input = await readInput('day-01');

export function part1() {
  const movements = parseInput(input);

  let count = 0;
  let pos = 50;

  for (const { direction, distance } of movements) {
    const step = direction === 'R' ? 1 : -1;
    const normalizedDistance = distance % RANGE_SIZE;

    pos = wrap(pos + step * normalizedDistance, RANGE_MIN, RANGE_MAX);
    if (pos === 0) count++;
  }

  return count;
}

export function part2() {
  const movements = parseInput(input);

  let count = 0;
  let pos = 50;

  for (const { direction, distance } of movements) {
    const step = direction === 'R' ? 1 : -1;

    for (let steps = 0; steps < distance; steps++) {
      pos = wrap(pos + step, RANGE_MIN, RANGE_MAX);
      if (pos === 0) count++;
    }
  }

  return count;
}

function parseInput(input: string) {
  return parseLines(input, (line) => ({ direction: line[0], distance: Number(line.slice(1)) }));
}
