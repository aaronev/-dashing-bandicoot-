const {buildMap} = require('./buildMap')
const NUMBERS = [1,2,3,4,5,6,7,8,9]

const checkNumbersNeededAreUsedForGivenContainerType = (type, board) => { // TODO: HELP! What do I name this function to be informative AND concise?
  const boardContainerName = {
    square: 'sqrs',
    row: 'rows',
    column: 'cols'
  }
  const slotContainerName = {
    square: 'sqr',
    row: 'row',
    column: 'col'
  }
  const parentContainer = board[boardContainerName[type]]
  for( let container in parentContainer ) {
    container = parseInt(container)
    let numbersNotUsed = board.numbersNeeded[type][container].slice()
    // console.log('NUMBERSNOTUSED', numbersNotUsed[0] === board.potentialNumbers[0].numbers[0])
    const numbersUsedInContainer = board.potentialNumbers.filter( n => {
      return parseInt(n[slotContainerName[type]]) === container
    })
    for( let numberSet of numbersUsedInContainer ) {
      numberSet.numbers.forEach( n => {
        numbersNotUsed = removeNumbers(n, numbersNotUsed)
      })
    }
    if(numbersNotUsed.length > 0){
      const err = {
        fromWho: type,
        error: 'ERROR: Bad Board'
      }
      throw err
    }
  }
}

const arrayIntersect = (arr1, arr2) => {
  return arr1.reduce(
    (r,a) => arr2.includes(a) && r.concat(a) || r, [] // What does this mean?!
  )
}

const getNumbersMinusColRow = (numbersRemaining, slot, board) => {
  for( let rowNumber of board.rows[slot.row] ) {
    numbersRemaining = removeNumbers(rowNumber.num, numbersRemaining)
  }
  for( let colNumber of board.cols[slot.col] ) {
    numbersRemaining = removeNumbers(colNumber.num, numbersRemaining)
  }
  return numbersRemaining
}

const removeNumbers = (number, arrayCheckAgainst) => {
  if(number !== '.') {
    const num = parseInt(number)
    const indexLocation = arrayCheckAgainst.findIndex( ele => {
      return ele === num
    })
    const returnArray = arrayCheckAgainst.slice()
    if( indexLocation !== -1 ) {
      returnArray.splice( indexLocation, 1 )
      return returnArray
    }
  }
  return arrayCheckAgainst
}

const getNumsNeeded = square => {
  let numbersNeeded = NUMBERS.slice()
  for( let number of square ) {
    if( number.num !== '.' ) {
      numbersNeeded = removeNumbers(number.num, numbersNeeded)
    }
  }

  return numbersNeeded
}

module.exports = class Sudoku{
  constructor(board){
    this.boardString = board
    try {
      this.board = buildMap(board, removeNumbers)

      // Calculate and populate potential numbers for each square
      for( let square in this.board.sqrs ) {
        const boardSqrs = this.board.sqrs
        let numbersToBeUsed = NUMBERS.slice()
        for( let itI of boardSqrs[square] ) {
          numbersToBeUsed = removeNumbers(itI.num, numbersToBeUsed)
        }
        this.board.numbersNeeded.square.push(numbersToBeUsed)
      }
    }
    catch(err) {
      this.error = err
    }
  }

  isSolved() {
    try {
      this.errorChecking()
    } catch(err) {
      return err
    }

    // Are there dots? false. Else true.
    return this.boardString.match(/\./) === null
  }

  errorChecking(){
    try{
      // Check if any square cant use all of its numbers needed
      checkNumbersNeededAreUsedForGivenContainerType('square', this.board)

      // Check if any column cant use all of its numbers needed
      checkNumbersNeededAreUsedForGivenContainerType('column', this.board)

      // Check if any row cant use all of its numbers needed
      checkNumbersNeededAreUsedForGivenContainerType('row', this.board)
    }
    catch(err){
      console.log(err)
      throw err.error
    }
  }

  solve() {
    if(this.error){
      return this.error
    }

    try {
      this.errorChecking()
    } catch(err) {
      return err
    }

    let solvedBoardString = undefined
    for( let i = 0; i < 20; i++) {
      this.board.potentialNumbers.forEach( ele => {
        if(ele.numbers.length === 1) {
          const numberToSetTo = ele.numbers.pop()
          this.board.rows[ele.row][ele.col].num = numberToSetTo
          this.board.cols[ele.col][ele.row].num = numberToSetTo
          // this.board.sqrs[ele.sqr][ele.sqrPos].num = numberToSetTo
          const newBoardString = []
          this.board.rows.forEach( singleRow => {
            singleRow.forEach( itemInRow => {
              newBoardString.push(itemInRow.num)
            })
          })
          solvedBoardString = newBoardString.join('')
        }
      })
      console.log('SOLVEDBOARDSTRING', solvedBoardString)
      if(solvedBoardString) {
        this.boardString = solvedBoardString
      }
    }

    console.log('\n')
    this.printBoard()

    return solvedBoardString ? solvedBoardString : false
  }

  printBoard() {
    const board = this.boardString
    let logString = ' |-----------------------|\n'
    for(let iterI = 0; iterI < 80; iterI += 3) {
      logString += ' | ' + board.substring(iterI, iterI+1) + ' '
                + board.substring(iterI+1, iterI+2) + ' '
                + board.substring(iterI+2, iterI+3)
      if( (iterI+3) % 9 === 0 ) logString += ' |\n'
      if( (iterI+3) % 27 === 0 ) logString += ' |-----------------------|\n'
    }
    console.log( logString )
  }
}
