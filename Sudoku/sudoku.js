const SQUARES = require('./locationMap.js')
const BOARD_LENGTH = 81

module.exports = class Sudoku{
  constructor(board){
    this.board = board
    this.solved = false

    // Build object from squares location map
// TODO: Will be use this? :
// this.squaresObj = this.buildSquareContainer('object')
    this.squaresArr = this.buildSquareContainer('array')
    this.rowsArr = this.buildRowContainer()
    this.columnsArr = this.buildColumnContainer()
  }

  isSolved() {
    let error = this.errorChecking()
    if(error) return error

    // Any .'s remaining?
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
    let error = this.errorChecking()
    if(error) return error

    // Check

    // Solve the board
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
  }

  buildSquareContainer(arrayOrObject){
    const bigSquareContainer = arrayOrObject === 'array' ? [] : {}
    for(let bigSquare in SQUARES) {
      let iterI = 0
      const smallSquareContainer = arrayOrObject === 'array' ? [] : {}
      for(let smallSquare in SQUARES[ bigSquare ]) {
        const location = SQUARES[ bigSquare ][ smallSquare ]
        const smallIndex = arrayOrObject === 'array' ? iterI++ : smallSquare
        smallSquareContainer[ smallIndex ] = this.board[ location ]
      }
      if(arrayOrObject === 'array'){
        bigSquareContainer.push( smallSquareContainer )
      } else {
        bigSquareContainer[ bigSquare ] = smallSquareContainer
      }
    }

    return bigSquareContainer
  }

  buildRowContainer() {
    const arr = []
    for(let itJ = 0; itJ < 9; itJ++) {
      arr.push( this.board.substring(itJ*9, (itJ*9)+9).split('') )
    }

    return arr
  }

  buildColumnContainer() {
    const arr = []
    for(let itI = 0; itI < 9; itI++) {
      let smallArr = []
      for(let itJ = 0; itJ < 9; itJ++) {
        smallArr.push( this.board.substring( (itI+(itJ*9)), (itI+(itJ*9) + 1) ) )
      }
      arr.push(smallArr)
    }

    return arr
  }
}
