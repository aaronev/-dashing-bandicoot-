const {buildMap} = require('./buildMap')
const NUMBERS = [1,2,3,4,5,6,7,8,9]

const getNumsNeeded = square => {
  const numbersNeeded = NUMBERS.slice()
  for( let number of square ) {
    if( number.num !== '.' ) {
      const num = parseInt(number.num)
      const indexLocation = numbersNeeded.findIndex( ele => {
        return ele === num
      })
      numbersNeeded.splice( indexLocation, 1 )
    }
  }

  return numbersNeeded
}

module.exports = class Sudoku{
  constructor(board){
    this.boardString = board
    try {
      this.board = buildMap(board)
    }
    catch(err) {
      this.error = err
    }
  }

  isSolved() {

  }

  errorChecking(){

  }

  solve() {
    // DEBUG: Remove me before production or Prrr:
    console.log('\n')
    this.printBoard()

    // Check all numbers needed are available to place somewhere
    for( let square of this.board.sqrs ) {
      const numbersNeeded = getNumsNeeded(square)
// TODO: Put object which contains col & row each needed number could go into
// Figure out way to know what numbersNeeded can't find a placement
      for( let slot of square ) {
        if( slot.num === '.' ) {
          for( let numNeed in neededObject ) {
            let numberAlreadyUsed = false
            for( let rowNum of this.board.rows[slot.row] ) {
              if( rowNum.num === numNeeded ) {
                numberAlreadyUsed = true
                break
              }
            }
            if( !numberAlreadyUsed ) {
              if( availableSpot[slot.row][slot.col] ){
                availableSpot[slot.row][slot.col].push(numNeed)
              } else {
                availableSpot[slot.row][slot.col] = Array(numNeed)
              }
            }
          }
        }
      }
    }

    if( this.error ) return this.error
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
