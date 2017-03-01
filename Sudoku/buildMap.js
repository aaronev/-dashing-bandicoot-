const getRow = cell => Math.floor(cell / 9)
const getCol = cell => cell % 9
const getBlock = cell => Math.floor(getRow(cell) / 3) * 3 + Math.floor(getCol(cell) / 3)

const buildMap = boardString => {
  const board = boardString.split('')
  let rowsObj = {}
  let colsObj = {}
  let sqrsObj = {}
  const map = {
    rows: [],
    cols: [],
    sqrs: []
  }
  const pushContainers = [
    [rowsObj, 'rows'],
    [colsObj, 'cols'],
    [sqrsObj, 'sqrs']
  ]

  for( let number in board ) {
    let obj = {
      row: getRow(number),
      col: getCol(number),
      sqr: getBlock(number),
      num: board[number]
    }

    const pushContainers = [
      [rowsObj, 'row'],
      [colsObj, 'col'],
      [sqrsObj, 'sqr']
    ]
    for( let container of pushContainers ){
      if(container[0][ obj[container[1]] ]){
        container[0][ obj[container[1]] ].push(obj)
      } else {
        container[0][ obj[container[1]] ] = Array(obj)
      }
    }
  }
  for( let container of pushContainers ){
    for( let item in container[0] ) {
      map[container[1]][item] = container[0][item]
    }
  }

  return map
}

module.exports = {
  buildMap
}
