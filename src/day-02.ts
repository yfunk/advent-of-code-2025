import { readInput } from 'io';
import { chunk } from 'utils/array';
import { range, unique } from 'utils/math';

const input = await readInput('day-02');

export function part1() {
  const ranges = parseInput(input);

  let sum = 0;

  for (const id of traverseIds(ranges)) {
    if (id.length % 2 !== 0) continue;

    const [firstHalf, secondHalf] = chunkString(id, 2);
    if (firstHalf === secondHalf) sum += Number(id);
  }

  return sum;
}

export function part2() {
  const ranges = parseInput(input);

  let sum = 0;

  for (const id of traverseIds(ranges)) {
    for (let i = 2; i <= id.length; i++) {
      if (id.length % i !== 0) continue;

      const chunks = chunkString(id, i);

      if (unique(chunks).length === 1) {
        sum += Number(id);
        break;
      }
    }
  }

  return sum;
}

function parseInput(input: string) {
  return input.split(',').map((rangeString) => {
    const [start, end] = rangeString.split('-').map(Number);
    return range(end - start + 1, start).map((num) => String(num));
  });
}

function chunkString(value: string, chunkCount: number) {
  const parts = value.split('');
  const chunkSize = Math.ceil(parts.length / chunkCount);
  return chunk(parts, chunkSize).map((part) => part.join(''));
}

function* traverseIds(ranges: string[][]) {
  for (const range of ranges) {
    for (const id of range) {
      yield id;
    }
  }
}
