const {buildMap} = require('./buildMap')
const NUMBERS = [1,2,3,4,5,6,7,8,9]

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

const runForEachSquareSlot = (callback, board) => {
  const squares = board.sqrs
  for( let square of squares) {
    const numbersNeeded = getNumsNeeded(square)
    for( let slot of square ) {
      try {
        let numbersRemaining = NUMBERS.slice()
        if ( slot.num === '.' ) {
          numbersRemaining = getNumbersMinusColRow(numbersRemaining, slot, board)
          callback( slot, numbersNeeded, numbersRemaining )
        }
        // While were at it, capture what numbers could go in a given slot here.
        // NOTE: This isn't part of error checking, but we're already looped
        // in the particular nested way that we would need to be in order to
        // access this particular information :
        const info = {
          col: slot.col,
          row: slot.row,
          numbers: numbersRemaining.slice()
        }
        board.potentialNumbers.push(info)
        // END NOTE
      } catch(err) {
        throw err
      }
    }
  }
}

module.exports = class Sudoku{
  constructor(board){
    this.boardString = board
    try {
      this.board = buildMap(board)

      // Calculate and populate potential numbers for each square
      for( let square in this.board.sqrs ) {
        let potentialNumbers = NUMBERS.slice()
        for( let itI of this.board.sqrs[square] ) {
          potentialNumbers = removeNumbers(itI.num, potentialNumbers)
        }
        this.board.numbersNeeded.push(potentialNumbers)
      }
      console.log('THIS.BOARD.NUMBERSNEEDED', this.board.numbersNeeded)
    }
    catch(err) {
      this.error = err
    }
  }

  isSolved() {

  }

  errorChecking(){
    try {
      // Check if row and column adjacent to slot have consumed all numbers
      runForEachSquareSlot( (slot, numbersNeeded, numbersRemaining ) => {
        if( numbersRemaining.length <= 0 ) {
          this.error = 'ERROR: Bad Board'
          throw 'Error'
        }
      }, this.board)

      // Check all numbers needed are available to place somewhere
      runForEachSquareSlot( (slot, numbersNeeded, numbersRemaining) => {
        let matching
        let potentialNumbers = this.board.numbersNeeded[slot.sqr]

        // TODO: Left off here before commit. Looking for way to track numbers used from the matching array. if any numbers are remaining after assigning them all, we have a bad board

        matching = arrayIntersect(numbersRemaining, potentialNumbers)
        console.log('MATCHING', matching)

      }, this.board)
    }
    catch(err){
      console.log('ERR', err)
      throw this.error ? this.error : err
    }
  }

  solve() {
    console.log('\n')
    this.printBoard()

    try {
      this.errorChecking()
    }
    catch(err) {
      return err
    }

    return false
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
