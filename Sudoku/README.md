# Sudoku Solver

The goal of this exercise is to have a fully-functioning Sudoku solver that you can run from the command line.


## Introduction to Sudoku

[Sudoku](http://en.wikipedia.org/wiki/Sudoku) is a logic-based, combinatorial number-placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 sub-grids that compose the grid (also called "boxes") contains all of the digits from 1 to 9.

The person who created the puzzle provides a partial solution so that some squares already have numbers.  Typically, there are enough initial numbers to guarantee a unique solution.

![Unsolved](unsolved.png) &nbsp; ![Solved Sudoku](solved.png)

## First Iteration

For the first iteration, we're just going build a solver that fills in "logically necessary" squares and requires no guessing.

### Learning Goals

Your goal here is to learn how to model a relatively complex real-world system &mdash; a person solving Sudoku.  You'll learn the importance of well organized code, and some advanced problem solving skills.


### Let's get started

Your Sudoku solver should take a string like this as its input:

```text
.39...12....9.7...8..4.1..6.42...79...........91...54.5..1.9..3...8.5....14...87.
```

Each consecutive 9 digits represents a row of the Sudoku board, and a `.` represents an empty cell.  It'd work like this:

```

var sudoku = new Sudoku(".39...12....9.7...8..4.1..6.42...79...........91...54.5..1.9..3...8.5....14...87.");
game.solve

```

This would print something like this:

```
439658127156927384827431956342516798785294631691783542578149263263875419914362875
```

Again, **note**, this first iteration might not solve every possible Sudoku board.  This means it would finish when it can no longer make a choice and "give up."  We'll create the fully-featured version in the next iteration.

Don't worry about the particular format of the board when printed.  The key thing is getting the logic around solving/guessing correctly.


#### What about performance?

Do *not* worry about performance yet!  Optimizations can come later.  Clean, logical code is more important and will be easier to refactor.

#### Get Started

- Open a terminal window and navigate to the `Sudoku` folder
- Install jasmine-node `npm install jasmine-node -g` This is the test framework we will use to run the tests
- Run the tests by running `jasmine-node .`
- Update `sudoku.js` to make the tests pass

### Step 1

- [ ] Detect bad boards through duplication (first two tests)
- [ ] Detect unsolvable boards (next four tests)
- [ ] Detect when a board is solved (next 1 test)


### Step 2

Now that we've detected bad boards, it's time to start thinking about solving really simple boards.

### Modeling: Pseudocode for First Iteration

Remember, for the first iteration, we're just going build a solver that fills in "logically necessary" squares and requires no guessing.  This might not solve every Sudoku board, although it often solves the easiest.  How can you tell when you've filled in all the "logically necessary" squares?

- [ ] Write out pseudocode for this version, separately (each person on their own), and compare it to each other.  How does it differ?  Which approach seems more sound?  Are there some core operations or methods you need to support?

For example, given a cell/square, you'll probably need at least three methods:

1. Give me the other cells in that cell's row.
2. Give me the other cells in that cell's column.
3. Give me the other cells in that cell's box.

- [ ] Solve boards that only have 'Naked Singles' which occur when a square has only one possible value remaining (next 2 tests)

### Step 3

Now that we've solved simple boards, let's start approaching boards with 'Hidden Singles'. These are boards where there are multiple possibilities per square

### Modeling: Strategies for Humans

A computer program that solves Sudoku is simulating the *player*, which means the better you can empathize with the player the more likely you'll understand how to write a Sudoku solver.  You'll be tempted to focus on the board first &mdash; is it some kind of array, a hash, something else? &mdash; but don't!  Understanding the person playing the game is key; the code to "power" the board is a detail.

Get out an actual Sudoku puzzle, printed on a piece of paper.  Play it with your pair.  Pay attention to yourself and to each other.

1. What strategies are you adopting and why?
2. How do you choose where to start?
3. How do you know when to really put a number in a cell?
4. Did you adopt the same notation/board markings while playing Sudoku?  Why?  If not, why did you choose differently?
5. Are you avoiding any strategies because they're too tedious or require you to remember too much?

It's important to see that sometimes the strategies that work for us (humans) would be really hard to implement on a computer, and vice versa: strategies we avoid because we'd have to write too much, use too many sheets of paper, or remember too much are a cakewalk for a computer.

- [ ] Solve board with hidden singles (next test)
- [ ] Detect boards with multiple solutions (remaining tests)

### Step 4

Time to start thinking about performance. Can your solver crunch through multiple puzzles quickly? What about puzzles where the solution space is too large, can it narrow down the possibilities by being smart about which squares to solve for first?

- [ ] Modify your code so that it reads an input file with multiple puzzles and writes a corresponding file with the solutions
- [ ] Run your code with the following file as input, and solve all the puzzles in less than 10 minutes: `45.unsolved.txt`
- [ ] Run your code with the following file as input, and solve all the puzzles in less than 10 minutes: `40.unsolved.txt`
- [ ] Run your code with the following file as input, and solve all the puzzles in less than 10 minutes: `35.unsolved.txt`
- [ ] Run your code with the following file as input, and solve all the puzzles in less than 10 minutes: `30.unsolved.txt`
- [ ] Run your code with the following file as input, and solve all the puzzles in less than 10 minutes: `25.unsolved.txt`

```

.96.4...11...6...45.481.39...795..43.3..8....4.5.23.18.1.63..59.59.7.83...359...7
1.58.2....9..764.52..4..819.19..73.6762.83.9.....61.5...76...3.43..2.5.16..3.89..
..5.3..819.285..6.6....4.5...74.283.34976...5..83..49.15..87..2.9....6...26.495.3
.96.4...11...6...45.481.39...795..43.3..8....4.5.23.18.1.63..59.59.7.83...359...7
1.58.2....9..764.52..4..819.19..73.6762.83.9.....61.5...76...3.43..2.5.16..3.89..
..5.3..819.285..6.6....4.5...74.283.34976...5..83..49.15..87..2.9....6...26.495.3
29.5....77.....4....4738.129.2..3.648...5..7.5...672..3.9..4..5....8.7...87..51.9
.8..2.....4.5..32..2.3.9.466...9...4...64.5.1134.5.7..36...4..24.723.6.....7..45.
6.873....2.....46.....6482..8...57.19..618..4.31....8.86.2...39.5....1..1..4562..
37......1...7....54.8.61.9.....1.....5..9.46..86..2.3..........694..52.38..1495..
...6891..8......2915......84.3....5.2....5....9.24.8.1.847..91.5......6..6.41....
.3.5..8.45.42...1...8..9...79.8.61.3.....54...5......78.....7.2...7.46..61.3..5..
....754..........8.8.19....3....1.6........34....6817.2.4...6.39......2.53.2.....
3.........5.7.3..8....28.7.7......43...........39.41.54..3..8..1...4....968...2..
3.26.9..55..73..........9.....94..........1.9....57.6...85....6........3.19.82.4.

```
