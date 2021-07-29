function myParseInt(value) {
  if(typeof value !== 'string') {
    throw new Error('Not correct type.')
  }

  return +value
}

function spiralMatrix(rows, columns) {
  if(rows <= 0 || columns <= 0) {
    throw new Error('Incorrect data.')
  }

  const matrixValues = Array(rows * columns).fill('').map((_, i) => i + 1)

  const matrix = []
  let iterator = 0

  for (let i = 1; i <= rows; i++) {
    matrix.push(
      matrixValues.slice(iterator, columns * i)
    )
    iterator = columns * i
  }

  const result = []

  let startRowIndex = 0
  let endRowIndex = 0
  iterator = 0

  while (startRowIndex < rows && endRowIndex < columns) {
    for (iterator = startRowIndex; iterator < columns; ++iterator) {
      result.push(matrix[startRowIndex][iterator])
    }

    startRowIndex++

    for (iterator = startRowIndex; iterator < rows; ++iterator) {
      result.push(matrix[iterator][columns - 1])
    }
    columns--

    if (startRowIndex < rows) {
      for (iterator = columns - 1; iterator >= endRowIndex; --iterator) {
        result.push(matrix[rows - 1][iterator])
      }
      rows--
    }

    if (endRowIndex < columns) {
      for (iterator = rows - 1; iterator >= startRowIndex; --iterator) {
        result.push(matrix[iterator][endRowIndex])
      }
      endRowIndex++
    }
  }

  return result.join(' ')
}

console.log(
  '\n myParseInt test below: \n',
  myParseInt('256'),
  myParseInt('256.55'),
  myParseInt('256.241241'),
)

console.log(
  '\n spiralMatrix test below: \n',
  spiralMatrix(4, 4)
)






































