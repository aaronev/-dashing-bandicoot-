const checkSquare = (squareRepeat, squaresArr) => {
  for(let bigSquare of squaresArr) {
    for(let iterI in bigSquare){
      iterI = parseInt(iterI)
      for(let iterJ = iterI+1; iterJ < 9; iterJ++) { // What big O is this?
        if( bigSquare[ iterI ] === bigSquare[ iterJ ] && bigSquare[ iterI ] !== '.' ) {
          squareRepeat = true
          break
        }
      }
    }
  }

  return squareRepeat
}

const checkContainer = container => {
  for(let itI of container) {
    const frequencyCount = {}
    for(let itJ of itI) {
      if(frequencyCount[itJ] && itJ !== '.'){
        return true
      } else {
        frequencyCount[itJ] = 1
      }
    }
  }

  return false
}

const checkAnyNumbersAvailable = (rowsArr, columnsArr) => {
  for(let itPR in rowsArr) {
    for(let itPC in columnsArr) {
      const pointRow = itPR
      const pointCol = itPC
      const usedNumbers = {}
      let freeNumbersAvailable = false
      for(let itR of rowsArr[ pointRow ]) {
        usedNumbers[ itR ] = true
      }
      for(let itC of columnsArr[ pointCol ]) {
        usedNumbers[ itC ] = true
      }
      for(let itI = 1; itI <= 9; itI++) {
        if( !usedNumbers.hasOwnProperty(itI) ) {
          freeNumbersAvailable = true
        }
      }
      if(!freeNumbersAvailable){
        return true
      }
    }
  }

  return false
}

const errorChecking = (board, squaresArr, rowsArr, columnsArr, BOARD_LENGTH) => {
  let squareRepeat = false

  squareRepeat = checkSquare(squareRepeat, squaresArr)
  if(!squareRepeat) {
    squareRepeat = checkContainer(rowsArr)
  }
  if(!squareRepeat) {
    squareRepeat = checkContainer(columnsArr)
  }
  if(!squareRepeat) {
    squareRepeat = checkAnyNumbersAvailable(rowsArr, columnsArr)
  }

  const errorConditions = (
      board.length !== BOARD_LENGTH
   || squareRepeat
  )
  if(errorConditions) return 'ERROR: Bad Board'
  return undefined
}

module.exports = errorChecking
