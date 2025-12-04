import { readInput } from 'io';
import { parseLines } from 'parse';

const input = await readInput('day-03');

export function part1() {
  const banks = parseInput(input);

  let sum = 0;

  for (const bank of banks) {
    let firstBattery = -1;
    let firstBatteryIndex = -1;

    for (let i = 0; i < bank.length - 1; i++) {
      if (bank[i] > firstBattery) {
        firstBattery = bank[i];
        firstBatteryIndex = i;
      }
    }

    const secondBattery = Math.max(...bank.slice(firstBatteryIndex + 1));

    sum += concatNumbers([firstBattery, secondBattery]);
  }

  return sum;
}

export function part2() {
  return 0;
}

function parseInput(input: string) {
  return parseLines(input, (line) => line.split('').map(Number));
}

function concatNumbers(digits: number[]) {
  return Number(digits.join(''));
}
