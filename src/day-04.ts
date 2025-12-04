import { readInput } from 'io';
import { parseLines, parseMatrix } from 'parse';
import { count } from 'utils/array';
import { matrixElements, surroundingFields } from 'utils/matrix';

const input = await readInput('day-04');

export function part1() {
  const diagram = parseInput(input);

  let sum = 0;

  for (const { value, coords } of matrixElements(diagram)) {
    if (value !== '@') continue;

    const surrounding = [...surroundingFields(diagram, coords, { diagonal: true })];
    const surroundingValues = surrounding.map(({ value }) => value);

    if (count(surroundingValues, '@') < 4) {
      sum++;
    }
  }

  return sum;
}

export function part2() {
  const diagram = parseInput(input);

  let sum = 0;

  let current = diagram;
  let processed = structuredClone(current);

  while (true) {
    const start = sum;

    for (const { value, coords } of matrixElements(current)) {
      if (value !== '@') continue;

      const surrounding = [...surroundingFields(current, coords, { diagonal: true })];
      const surroundingValues = surrounding.map(({ value }) => value);

      if (count(surroundingValues, '@') < 4) {
        processed[coords[1]][coords[0]] = 'x';
        sum++;
      }
    }

    if (sum === start) break;

    current = processed;
    processed = structuredClone(current);
  }

  return sum;
}

function parseInput(input: string) {
  return parseMatrix(input);
}
