const {buildMap} = require('./buildMap')

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
