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

export async function readFile(filepath: string) {
  const file = Bun.file(filepath);
  const text = await file.text();
  return text.trim();
}

export async function readInput(dir: Day, fileName: string = 'input') {
  const filepath = `./inputs/${dir}/${fileName}.txt`;
  return readFile(filepath);
}
