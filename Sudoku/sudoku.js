const {SQUARES, BOARD_LENGTH, NUMBERS_PER_SQUARE} = require('./constants')
const BuildFunctions = require('./buildFunctions')

module.exports = class Sudoku{
  constructor(board){
    this.board = board
    this.solved = false

    // Build object from squares location map
// TODO: Will be use this? :
// this.squaresObj = this.buildSquareContainer('object')
    this.squaresArr = BuildFunctions.buildSquareContainer('array', this.board)
    this.rowsArr = BuildFunctions.buildRowContainer(this.board)
    this.columnsArr = BuildFunctions.buildColumnContainer(this.board)

    // Destructuring, OOP style | http://stackoverflow.com/questions/32413025/es6-destructuring-in-class-constructor
    Object.assign( this, BuildFunctions.buildNumbersUsedNeeded(this.squaresArr) )
  }

  isSolved() {
    let error = this.errorChecking()
    if(error) return error

    const regex = /\./
    const condition = this.board.match(regex) !== null
    if(condition) return false

    return true
  }

  errorChecking(){
    return require('./errorChecking')
      (this.board
     , this.squaresArr
     , this.rowsArr
     , this.columnsArr
     , BOARD_LENGTH)
  }

  solve() {
    // DEBUG: Remove me before production or Prrr:
    console.log('\n')
    this.printBoard()

    let error = this.errorChecking()
    if(error) return error

  }

  printBoard() {
    const board = this.board
    let logString = ' |-----------------------|\n'
    for(let iterI = 0; iterI < 80; iterI += 3) {
      logString += ' | ' + board.substring(iterI, iterI+1) + ' '
                + board.substring(iterI+1, iterI+2) + ' '
                + board.substring(iterI+2, iterI+3)
      if( (iterI+3) % 9 === 0 ) logString += ' |\n'
      if( (iterI+3) % 27 === 0 ) logString += ' |-----------------------|\n'
    }
    console.log( logString )
    console.log( this.numbersNeeded )
  }
}
