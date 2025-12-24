import "../styles/board.css"
import type { ReactNode } from "react";
import { DEFAULT_BOARD_SIZE } from "../configs/board.configs";
import Cell from "./Cell";

export default function Board() {
  const board: ReactNode[][] = [];
  for (let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
    const row: ReactNode[] = [];
    for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
      row.push(<Cell />);
    }
    board.push(row);
  }

  return <div className="board">{board}</div>;
}
