export type Matrix<T> = T[][];
export type Coordinates = [x: number, y: number];

export function matrixAt<T>(matrix: Matrix<T>, coords: Coordinates) {
  const [x, y] = coords;
  return matrix[y][x];
}

export function isInBounds(matrix: Matrix<unknown>, coords: Coordinates) {
  const [x, y] = coords;
  return matrix[y] !== undefined && matrix[y][x] !== undefined;
}

export function* surroundingFields<T>(
  matrix: Matrix<T>,
  coords: Coordinates,
  options?: { diagonal?: boolean }
) {
  const [x, y] = coords;

  const surrounding = [
    [x, y - 1], // top
    [x - 1, y], // left
    [x + 1, y], // right
    [x, y + 1], // bottom

    ...(options?.diagonal
      ? [
          [x - 1, y - 1], // top left
          [x + 1, y - 1], // top right
          [x - 1, y + 1], // bottom left
          [x + 1, y + 1], // bottom right
        ]
      : []),
  ];

  for (const [sx, sy] of surrounding) {
    if (!isInBounds(matrix, [sx, sy])) continue;
    yield { value: matrix[sy][sx], coords: [sx, sy] as Coordinates };
  }
}

export function* matrixElements<T>(
  matrix: Matrix<T>,
  options?: { row?: number } | { column?: number }
) {
  if (options && 'row' in options && options.row !== undefined) {
    const rowElements = getRowElements(matrix, options.row);

    for (let i = 0; i < rowElements.length; i++) {
      yield { value: rowElements[i], coords: [i, options.row] as Coordinates };
    }
  } else if (options && 'column' in options && options.column !== undefined) {
    const columnElements = getColumnElements(matrix, options.column);

    for (let i = 0; i < columnElements.length; i++) {
      yield { value: columnElements[i], coords: [options.column, i] as Coordinates };
    }
  } else {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        yield { value: matrix[y][x], coords: [x, y] as Coordinates };
      }
    }
  }
}

export function getRowElements<T>(matrix: Matrix<T>, row: number) {
  return matrix[row];
}

export function getColumnElements<T>(matrix: Matrix<T>, col: number) {
  return matrix.map((row) => row[col]);
}
