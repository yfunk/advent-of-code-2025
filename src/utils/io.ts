export type Day =
  | 'day-01'
  | 'day-02'
  | 'day-03'
  | 'day-04'
  | 'day-05'
  | 'day-06'
  | 'day-07'
  | 'day-08'
  | 'day-09'
  | 'day-10'
  | 'day-11'
  | 'day-12';

type ReadFileOptions = {
  trim?: boolean;
};

export async function readFile(filepath: string, options: ReadFileOptions = { trim: true }) {
  const file = Bun.file(filepath);
  const text = await file.text();
  return options?.trim ? text.trim() : text;
}

export async function readInput(
  dir: Day,
  fileName: string = 'input',
  options: ReadFileOptions = { trim: true }
) {
  const filepath = `./inputs/${dir}/${fileName}.txt`;
  return readFile(filepath, options);
}
