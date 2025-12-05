import { readInput } from 'io';
import { parseGroups } from 'parse';

type Range = { min: number; max: number };

const input = await readInput('day-05');

export function part1() {
  const { ranges, ingredients } = parseInput(input);

  let sum = 0;

  for (const ingredient of ingredients) {
    for (const { min, max } of ranges) {
      if (ingredient >= min && ingredient <= max) {
        sum++;
        break;
      }
    }
  }

  return sum;
}

export function part2() {
  const { ranges } = parseInput(input);

  let sum = 0;

  for (const range of toMergedRanges(ranges)) {
    const length = range.max - range.min + 1;
    sum += length;
  }

  return sum;
}

function parseInput(input: string) {
  const [ranges, ingredients] = parseGroups(input);

  return {
    ranges: ranges.map((line) => {
      const [min, max] = line.split('-').map(Number);
      return { min, max };
    }),
    ingredients: ingredients.map(Number),
  };
}

function toMergedRanges(ranges: Range[]) {
  const clone = structuredClone(ranges);

  // sort by min value to ensure ranges that may overlap are always adjacent
  const sorted = clone.toSorted((a, b) => a.min - b.min);
  const merged: Range[] = [];

  for (const range of sorted) {
    const last = merged.at(-1);

    if (!last) {
      merged.push(range);
      continue;
    }

    // full overlap, skip
    if (range.max <= last.max) {
      continue;
    }

    // partial overlap, merge into previous range
    if (range.min <= last.max) {
      last.max = range.max;
      continue;
    }

    // no overlap, add new range
    merged.push(range);
  }

  return merged;
}
