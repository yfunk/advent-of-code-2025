import { readInput } from 'io';
import { parseLines, splitString } from 'parse';
import { sum, multiply } from 'utils/math';
import { getColumnElements, matrixElements } from 'utils/matrix';

type Problem = {
  grid: string[][];
  operand: string;
};

const input = await readInput('day-06', 'input', { trim: false });

export function part1() {
  const worksheet = parseInput(input);

  let total = 0;

  for (const { operand, grid } of worksheet) {
    const operation = operand === '+' ? sum : multiply;
    const values = grid.map((row) => parseNumber(row));

    total += operation(values);
  }

  return total;
}

export function part2() {
  const worksheet = parseInput(input);

  let total = 0;

  for (const { operand, grid } of worksheet) {
    const operation = operand === '+' ? sum : multiply;

    const values = [];

    for (let i = 0; i < grid[0].length; i++) {
      const column = getColumnElements(grid, i);
      values.push(parseNumber(column));
    }

    total += operation(values);
  }

  return total;
}

function parseInput(input: string) {
  const lines = parseLines(input).map((line) => line.split(''));

  const newProblem = (): Problem => ({
    grid: Array.from({ length: lines.length - 1 }, () => [] as string[]),
    operand: '',
  });

  const problems: Problem[] = [newProblem()];

  for (let i = 0; i < lines[0].length; i++) {
    const column = lines.map((row) => row[i]);

    // new problem starts when column is empty
    if (column.every((v) => v === ' ')) {
      problems.push(newProblem());
      continue;
    }

    const problem = problems.at(-1)!;

    const values = column.slice(0, -1);
    const operand = column.at(-1);

    if (!problem.operand && operand !== ' ') problem.operand = operand!;
    for (let j = 0; j < values.length; j++) {
      problem.grid[j].push(values[j]);
    }
  }

  return problems;
}

function parseNumber(digits: string[]) {
  return Number(digits.join(''));
}
