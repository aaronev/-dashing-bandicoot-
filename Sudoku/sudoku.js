const {buildMap} = require('./buildMap')

module.exports = class Sudoku{
  constructor(board){
    this.board = buildMap(board)
  }

  isSolved() {

  }

  errorChecking(){

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
