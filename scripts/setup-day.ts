import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import chalk from 'chalk';
import { formatDay, formatDayName, generateTemplate, isBetween, validateDay } from './utils';
import { fetchInput } from './api';

type DayContext = { year: number; day: number };

type File = {
  name: string | ((ctx: DayContext) => string);
  input?: boolean;
  getContent?: (ctx: DayContext) => Promise<string | undefined>;
};

const files: Array<File> = [
  {
    name: ({ day }) => {
      return `${formatDayName(day)}.ts`;
    },
    getContent: async ({ day }) => {
      return generateTemplate(day);
    },
  },
  {
    name: 'input.txt',
    input: true,
    getContent: async ({ year, day }) => {
      console.log('📄 Fetching input...');

      const input = await fetchInput({ day, year }).catch(() => {
        console.log(chalk.red.bold('❌ Fetching input failed, empty file will be created.'));
      });

      return input ?? undefined;
    },
  },
  {
    name: 'example.txt',
    input: true,
  },
];

const setupDay = async (day: number) => {
  if (!validateDay(day)) {
    console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(12)}.`);
    console.log(`🎅 To get started, try: ${chalk.cyan('bun setup 1')}`);
    return;
  }

  const currentYear = new Date().getFullYear();
  const year = Number.parseInt(Bun.env.YEAR ?? currentYear.toString());

  if (Number.isNaN(year) || !isBetween(year, [2015, currentYear])) {
    console.log(
      chalk.red(`📅 Year must be between ${chalk.bold(2015)} and ${chalk.bold(currentYear)}.`)
    );
    return;
  }

  console.log(`📂 Setting up day ${formatDay(day)}...`);

  const srcDir = new URL('../src/', import.meta.url);
  const inputDir = new URL(`../inputs/${formatDayName(day)}/`, import.meta.url);

  try {
    if (!existsSync(srcDir)) await mkdir(srcDir, { recursive: true });
    if (!existsSync(inputDir)) await mkdir(inputDir, { recursive: true });

    for (const file of files) {
      const name = typeof file.name === 'function' ? file.name({ year, day }) : file.name;
      const fileUrl = new URL(name, file.input ? inputDir : srcDir);

      if (existsSync(fileUrl)) {
        console.log(`⚠️  ${name} already exists.`);
      } else {
        const content = await file.getContent?.({ year, day });

        await Bun.write(fileUrl, content ?? '');
        console.log(`✅ ${name} created.`);
      }
    }

    console.log(chalk.green.bold(`🎉 Day ${formatDay(day)} successfully set up!`));
  } catch (err: any) {
    console.error(chalk.red(err?.message ?? 'Failed to set up day'));
  }
};

const day = Number(Bun.argv[2] ?? '') ?? new Date().getDate();
setupDay(day);
