module.exports = function solveSudoku(matrix) {
  const len = matrix.length

  function ifZero(cb) {
    for (let row = 0; row < len; row++) {
      for (let col = 0; col < len; col++) {
        if (matrix[row][col] === 0) {
          return cb(row, col)
        }
      }
    }
    return matrix
  }

  function solveZero(row, col) {
    let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let k = 0; k < len; k++) {
      const blockRow = Math.floor(row / 3) * 3 + Math.floor(k / 3)
      const blockCol = Math.floor(col / 3) * 3 + (k % 3)
      if (matrix[row][k] !== 0) {
        digits = digits.filter(e => e !== matrix[row][k])
      }
      if (matrix[k][col] !== 0) {
        digits = digits.filter(e => e !== matrix[k][col])
      }
      if (matrix[blockRow][blockCol] !== 0) {
        digits = digits.filter(e => e !== (matrix[blockRow][blockCol]))
      }
    }
    if (digits.length === 0) {
      return false
    }
    for (let l = 0; l < digits.length; l++) {
      matrix[row][col] = digits[l]
      if (ifZero(solveZero)) return matrix
      else matrix[row][col] = 0
    }
  }

  return ifZero(solveZero)
}
