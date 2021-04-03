/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));  //adds an array with correct number of items, initially set to null
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');  //get "htmlBoard" variable from the item in HTML w/ID of "board"

  const top = document.createElement("tr"); //creates the top row
  top.setAttribute("id", "column-top"); //gives the tr id='column-top'
  top.addEventListener("click", handleClick);  //adds event click event listener for where pieces are dropped

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");  //makes each tr
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //makes each td
      cell.setAttribute("id", `${y}-${x}`);  //assigns unique id to each td
      cell.classList.add('cell');  //assigns class for transition
      row.append(cell);  //appends td to row
    }
    htmlBoard.append(row); //appends filled out row to dom
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) return y;
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) { // make a div and insert into correct table cell
  const newPiece = document.createElement('div');
  newPiece.classList.add('piece', `p${currPlayer}`);
  newPiece.style.top = -50 * (y + 2);

  const pos = document.getElementById(`${y}-${x}`);
  pos.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function () {
    window.alert(msg);  //pop up alert message
  }, 500);//wait .5 seconds so last piece falls in
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) { //checks that every cell is filled
    return endGame('Tie!');
  }

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  //change player display
  const display = document.getElementById('display');
  if (currPlayer === 2) {
    display.setAttribute('class', 'p2bg');
    display.innerHTML = 'Player 2';
  } else {
    display.setAttribute('class', '');
    display.innerHTML = 'Player 1';
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //increments on x axis
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //increments on y axis
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //increments on x y axis, increasing on x axis
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //increments on x y axis, decreasing on x axis

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
