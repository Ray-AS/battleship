import "../styles/board.css"
import Cell from "./Cell";
import { type Board } from "../models"

interface boardProps {
  board: Board
}

export default function Board({ board }: boardProps) {
  const display_board = [];
  for (let i = 0; i < board.length; i++) {
    const row = [];
    for (let j = 0; j < board[i].length; j++) {
      row.push(<Cell state={board[i][j].type} />);
    }
    display_board.push(row);
  }

  return <div className="board">{display_board}</div>;
}
