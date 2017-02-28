const SQUARES = require('./locationMap.js')
const BOARD_LENGTH = 81
//
// This is only a SKELETON file for the "Sudoku" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

module.exports = class Sudoku{
  constructor(board){
    // THIS would be the better way of handling a bad board,
    // but testing suite won't let us throw error at beginning.
    // if(board.length !== BOARD_LENGTH){
    //   throw new Error('ERROR: Bad Board')
    // }
    this.board = board
    this.solved = false

    // Build object from squares location map
    this.squaresObj = this.buildContainer('object')
    this.squaresArr = this.buildContainer('array')
  }



  isSolved() {
    // Is everything a number and there's no .'s?
    // Are any numbers repeated where they're not allowed?

    const flattenedArray = this.squaresArr.reduce( (a,b) => {
      // console.log('a:', a, '\nb:', b)
      return a.concat(b)
    })
    for(let smallSquare of flattenedArray) {
      // console.log( smallSquare )
    }

    return false
  }

  solve() {
    const board = this.board
    let squareRepeat = false
    // Check for errors:
    // Check if number is repeated in single square
    for(let bigSquare of this.squaresArr) {
      for(let iterI in bigSquare){
        iterI = parseInt(iterI)
        for(let iterJ = iterI+1; iterJ < 9; iterJ++) { // What big O is this?
          if( bigSquare[ iterI ] === bigSquare[ iterJ ] ) {
            squareRepeat = true
            break
          }
        }
      }
    }

    // Check if number is repeated along row.
    const arrRows = []
    for(let itJ = 0; itJ < 9; itJ++) { // Rows
      const littleArr = []
      for(let itI = 0; itI < 9; itI++) { // Columns
        littleArr.push( board[itJ][itI] )
      }
      arrRows.push( littleArr )
    }

    for(let itI of arrRows) {
      itI.some( ele, idx => {
        
      })
    }

    console.log('THIS.BOARD', board.length)
    console.log('SQUAREREPEAT', squareRepeat)
    const errorConditions = (
        board.length !== BOARD_LENGTH
     || squareRepeat
    )
    if(errorConditions) return 'ERROR: Bad Board'
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

  buildContainer(arrayOrObject){
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
}
