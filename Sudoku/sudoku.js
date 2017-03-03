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
        this.board.numbersNeededForSquare.push(numbersToBeUsed)
      }

      // var sqrForNumbers = this.board.potentialNumbers.filter( n => {
      //   return n.sqr === '4'
      // })
      // console.log('SQRFORNUMBERS', sqrForNumbers)
    }
    catch(err) {
      console.log('ERR', err)
      this.error = err
    }
  }

  isSolved() {

  }

  errorChecking(){
    for( let square in this.board.sqrs ) {
      const sqrNumbersNeeded = this.board.numbersNeededForSquare[square]
      let numbersNotUsed = sqrNumbersNeeded.slice()
      const numbersUsedInSqr = this.board.potentialNumbers.filter( n => {
        return n.sqr === square
      })
      for( let numberSet of numbersUsedInSqr ) {
        numberSet.numbers.forEach( n => {
          numbersNotUsed = removeNumbers(n, numbersNotUsed)
        })
      }
      if(numbersNotUsed.length > 0){
        throw 'ERROR: Bad Board'
      }

    }
  }

  solve() {
    if(this.error){
      return this.error
    }

    console.log('\n')
    this.printBoard()

    console.log("Entering error check")
    try {
      this.errorChecking()
    } catch(err) {
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
