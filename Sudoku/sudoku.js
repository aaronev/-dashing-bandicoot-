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
    this.errorChecking()
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

  errorChecking() {
    const board = this.board
    let squareRepeat = false

    // Check for errors:
    squareRepeat = this.checkSquare(squareRepeat)
    squareRepeat = this.checkRow(squareRepeat)

    const errorConditions = (
        board.length !== BOARD_LENGTH
     || squareRepeat
    )
    if(errorConditions) return 'ERROR: Bad Board'
  }

  solve() {
    this.errorChecking()

    // Solve the board
  }

  checkSquare(squareRepeat) {
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

    return squareRepeat
  }

  checkRow(squareRepeat) {
    const arrRows = []
    const board = this.board

    for(let itJ = 0; itJ < 9; itJ++) { // Rows
      arrRows.push( board.substring(itJ*9, (itJ*9)+9).split('') )
    }

    for(let itI of arrRows) {
      for(let itJ in itI) {
        let tempBool = itI.some( (ele, idx) => {
          itI[itJ].indexOf(ele) !== idx
        })
        squareRepeat = tempBool ? true : squareRepeat
        // squareRepeat   tempBool    newValue
        //      T             T           T
        //      T             F           T
        //      F             T           T
        //      F             F           F
        // NAND Latch
      }
    }

    return squareRepeat
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
