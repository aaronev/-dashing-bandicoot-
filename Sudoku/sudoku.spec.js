var Sudoku = require('./sudoku');

describe('Sudoku solver', function() {

  // This board is bad because the middle column (c5) has the value ‘1’ twice.
  it('Recognizes a bad board', function() {
    var sudoku = new Sudoku("..9.7...5..21..9..1...28....7...5..1..851.....5....3.......3..68........21.....87");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  // This puzzle cannot be solved, because the middle row (r5) has the value ‘2’ twice.
  it('Recognizes a bad board (duplicate given in row)', function() {
    var sudoku = new Sudoku(".4.1..35.............2.5......4.89..26.....12.5.3....7..4...16.6....7....1..8..2.");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  // This puzzle cannot be solved, because the left-most square of the middle row (r5c1) has no possible candidates.
  it('Detects an unsolvable square', function() {
    var sudoku = new Sudoku("..9.287..8.6..4..5..3.....46.........2.71345.........23.....5..9..4..8.7..125.3..");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  // This puzzle cannot be solved, because the center box (b5) has no possible candidates for the value ‘4’.
  it('Detects an unsolvable box', function() {
    var sudoku = new Sudoku(".9.3....1....8..46......8..4.5.6..3...32756...6..1.9.4..1......58..2....2....7.6.");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  //This puzzle cannot be solved, because the middle column (c5) has no possible candidates for the value ‘2’.
  it('Detects an unsolvable column', function() {
    var sudoku = new Sudoku("....41....6.....2...2......32.6.........5..417.......2......23..48......5.1..2...");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  // This puzzle cannot be solved, because the middle row (r5) has no possible candidates for the value ‘1’.
  it('Detects an unsolvable row', function() {
    var sudoku = new Sudoku("9..1....4.14.3.8....3....9....7.8..18....3..........3..21....7...9.4.5..5...16..3");
    expect(sudoku.solve()).toBe("ERROR: Bad Board");
  });

  it('recognizes a solved board as solved', function() {
    var sudoku = new Sudoku("974236158638591742125487936316754289742918563589362417867125394253649871491873625");
    expect(sudoku.isSolved()).toBe(true);
  });

  it('recognizes an unsolved board as solved', function() {
    var sudoku = new Sudoku("...236158638591742125487936316754289742918563589362417867125394253649871491873...");
    expect(sudoku.isSolved()).toBe(false);
  });

  it('solves a board with only 1 missing square', function() {
    var sudoku = new Sudoku("2564891733746159829817234565932748617128.6549468591327635147298127958634849362715");
    expect(sudoku.solve()).toBe("256489173374615982981723456593274861712836549468591327635147298127958634849362715");
  });

  it('solves a board with only Naked Singles', function() {
    var sudoku = new Sudoku("3.542.81.4879.15.6.29.5637485.793.416132.8957.74.6528.2413.9.655.867.192.965124.8");
    expect(sudoku.solve()).toBe("365427819487931526129856374852793641613248957974165283241389765538674192796512438");
  });

  it('solves a board with hidden singles', function() {
    var sudoku = new Sudoku("..2.3...8.....8....31.2.....6..5.27..1.....5.2.4.6..31....8.6.5.......13..531.4..");
    expect(sudoku.solve()).toBe("672435198549178362831629547368951274917243856254867931193784625486592713725316489");
  });

  it('Recognizes if there are too many solutions', function() {
    var sudoku = new Sudoku(".................................................................................");
    expect(sudoku.solve()).toBe("ERROR: Too many solutions");
  });

  it('Recognizes if there are insuficient givens', function() {
    var sudoku = new Sudoku("...........5....9...4....1.2....3.5....7.....438...2......9.....1.4...6..........");
    expect(sudoku.solve()).toBe("ERROR: Too many solutions");
  });

  // This puzzle is not a valid Sudoku, because it has two possible solutions.
  it('Detects multiple solutions - 1', function() {
    var sudoku = new Sudoku(".39...12....9.7...8..4.1..6.42...79...........91...54.5..1.9..3...8.5....14...87");
    expect(sudoku.solve()).toBe("ERROR: No Unique Solution");
  });

  // This puzzle is not a valid Sudoku, because it has three possible solutions.
  it('Detects multiple solutions - 2', function() {
    var sudoku = new Sudoku("..3.....6...98..2.9426..7..45...6............1.9.5.47.....25.4.6...785...........");
    expect(sudoku.solve()).toBe("ERROR: No Unique Solution");
  });

  // This puzzle is not a valid Sudoku, because it has four possible solutions.
  it('Detects multiple solutions - 3', function() {
    var sudoku = new Sudoku("....9....6..4.7..8.4.812.3.7.......5..4...9..5..371..4.5..6..4.2.17.85.9.........");
    expect(sudoku.solve()).toBe("ERROR: No Unique Solution");
  });

  // This puzzle is not a valid Sudoku, because it has ten possible solutions.
  it('Detects multiple solutions - 4', function() {
    var sudoku = new Sudoku("59.....486.8...3.7...2.1.......4.....753.698.....9.......8.3...2.6...7.934.....65");
    expect(sudoku.solve()).toBe("ERROR: No Unique Solution");
  });

  // This puzzle is not a valid Sudoku, because it has 125 possible solutions.
  it('Detects multiple solutions - 5', function() {
    var sudoku = new Sudoku("...3165..8..5..1...1.89724.9.1.85.2....9.1....4.263..1.5.....1.1..4.9..2..61.8...");
    expect(sudoku.solve()).toBe("ERROR: No Unique Solution");
  });

});
