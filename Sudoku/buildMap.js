const getRow = cell => Math.floor(cell / 9)
const getCol = cell => cell % 9
const getBlock = cell => Math.floor(getRow(cell) / 3) * 3 + Math.floor(getCol(cell) / 3)
const NUMBERS = [1,2,3,4,5,6,7,8,9]

const buildMap = (boardString, removeNumbers) => {
  const board = boardString.split('')
  let rowsObj = {}
  let colsObj = {}
  let sqrsObj = {}
  const map = {
    rows: [],
    cols: [],
    sqrs: [],
    potentialNumbers: [], // TODO: Rename better. Potential numbers is all numbers that could potentially fit into a given slot. No regard to what numbers the square has already consumed.
    numbersNeededForSquare: [],    // Where as numbersNeeded is an array indexed by big square, of numbers that that square still needs to have filled.
    secondRunHack: false
  }
  const pushContainers = [
    [rowsObj, 'rows'],
    [colsObj, 'cols'],
    [sqrsObj, 'sqrs']
  ]

  for( let number in board ) {
    let obj = {
      row: getRow(number),
      col: getCol(number),
      sqr: getBlock(number),
      num: board[number]
    }

    const pushContainers = [
      [rowsObj, 'row'],
      [colsObj, 'col'],
      [sqrsObj, 'sqr']
    ]
    for( let container of pushContainers ) {
      if( container[0][ obj[container[1]] ] ) {
        container[0][ obj[container[1]] ].push(obj)
      } else {
        container[0][ obj[container[1]] ] = Array(obj)
      }
    }
  }
  for( let container of pushContainers ){
    for( let item in container[0] ) {
      map[container[1]][item] = container[0][item]

      // Error catching
      for( let itI = 0; itI < 9; itI++ ) {
        for( let itJ = itI+1; itJ < 9; itJ++ ) {
          if( container[0][item][itI].num === container[0][item][itJ].num && container[0][item][itI].num !== '.') {
            throw 'ERROR: Bad Board'
          }
        }
      }
    }
  }

  for( let square in map.sqrs ) {
    for( let slot of map.sqrs[square] ) {
      let numbersRemaining = NUMBERS.slice()
      if( slot.num === '.' ) {
        for( let rowNumber of map.rows[slot.row] ) {
          numbersRemaining = removeNumbers(rowNumber.num, numbersRemaining)
        }
        for( let colNumber of map.cols[slot.col] ) {
          numbersRemaining = removeNumbers(colNumber.num, numbersRemaining)
        }
        if( numbersRemaining.length <= 0 ) {
          throw 'ERROR: Bad Board'
        }
        for( let sqrNumber of map.sqrs[slot.sqr] ) {
          numbersRemaining = removeNumbers(sqrNumber.num, numbersRemaining)
        }
        const info = {
          sqr: square,
          col: slot.col,
          row: slot.row,
          numbers: numbersRemaining.slice()
        }
        map.potentialNumbers.push(info)
      }
    }
  }

  return map
}

module.exports = {
  buildMap
}
