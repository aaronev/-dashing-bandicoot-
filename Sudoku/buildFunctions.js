const {SQUARES, BOARD_LENGTH, NUMBERS_PER_SQUARE} = require('./constants')

const buildSquareContainer = (arrayOrObject, board) => {
  const bigSquareContainer = arrayOrObject === 'array' ? [] : {}
  for(let bigSquare in SQUARES) {
    let iterI = 0
    const smallSquareContainer = arrayOrObject === 'array' ? [] : {}
    for(let smallSquare in SQUARES[ bigSquare ]) {
      const location = SQUARES[ bigSquare ][ smallSquare ]
      const smallIndex = arrayOrObject === 'array' ? iterI++ : smallSquare
      smallSquareContainer[ smallIndex ] = board[ location ]
    }
    if(arrayOrObject === 'array'){
      bigSquareContainer.push( smallSquareContainer )
    } else {
      bigSquareContainer[ bigSquare ] = smallSquareContainer
    }
  }

  return bigSquareContainer
}

const buildRowContainer = board => {
  const arr = []
  for(let itJ = 0; itJ < 9; itJ++) {
    arr.push( board.substring(itJ*9, (itJ*9)+9).split('') )
  }

  return arr
}

const buildColumnContainer = board => {
  const arr = []
  for(let itI = 0; itI < 9; itI++) {
    let smallArr = []
    for(let itJ = 0; itJ < 9; itJ++) {
      smallArr.push( board.substring( (itI+(itJ*9)), (itI+(itJ*9) + 1) ) )
    }
    arr.push(smallArr)
  }

  return arr
}

const buildNumbersUsedNeeded = squaresArr => {
  const numbersUsed = []
  const numbersNeeded = []
  for(let square of squaresArr) {
    const singleSquareUsed = []
    let singleSquareNeeded = NUMBERS_PER_SQUARE.slice()
    for(let slot of square) {
      if(slot !== '.'){
        slot = parseInt(slot)
        if( singleSquareUsed.indexOf(slot) === -1) {
          singleSquareUsed.push( slot )
          singleSquareNeeded = singleSquareNeeded.filter( ele => {
            return ele !== slot
          })
        }
      }
    }
    numbersUsed.push( singleSquareUsed )
    numbersNeeded.push( singleSquareNeeded )
  }

  return {numbersUsed, numbersNeeded}
}

module.exports = {
  buildSquareContainer,
  buildRowContainer,
  buildColumnContainer,
  buildNumbersUsedNeeded
}
