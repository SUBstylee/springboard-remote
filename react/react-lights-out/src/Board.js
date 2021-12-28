import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  //only added this for testing in dev tools (toggle state in components to simulate win)
  const [win, setWin] = useState(false);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell)) && true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        };
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      // TODO: return the copy
      return boardCopy;
    });
  };

  if (hasWon() || win) {
    return (
      <div className="Board-name">
        <div className="flux">YOU</div>
        <div className="neon">WIN!</div>
      </div>
    );
  };

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  function field() {
    let tableGrid = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        const coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      };
      tableGrid.push(<tr key={y}>{row}</tr>)
    }
    return tableGrid;
  };
  // make table board
  return (
    <>
      <div className="Board-name">
        <div className="neon">Lights</div>
        <div className="flux">Out</div>
      </div>
      <table className="Board">
        <tbody>
          {field()}
        </tbody>
      </table>
    </>
  );
  // TODO
}

Board.defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.25
};

export default Board;
