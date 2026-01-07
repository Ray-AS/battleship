import "../styles/board.css";
import Cell from "./Cell";
import { Outcome, type Board, type GamePhase, type PlayerType, type Position } from "../models";
import type { Gameboard } from "../utils/gameboard";
import { useContext } from "react";
import { PlayerContext } from "./PlayerContext";

interface boardProps {
  player: PlayerType;
  boardInstance: Gameboard;
  phase: GamePhase;
  handleAllSunk: (player: PlayerType) => void;
  handlePlacement?: (position: Position) => void;
}

export default function Board({
  player,
  boardInstance,
  phase,
  handleAllSunk,
  handlePlacement,
}: boardProps) {
  const board = boardInstance.board;
  const { currentPlayer, setCurrentPlayer } = useContext(PlayerContext)!;

  // Update board instance and board state based on clicked cell position (i.e. attack or place ships)
  function handleInteraction(position: Position) {
    // If in setup, use placement logic instead of attack logic
    if (phase === "setup" && handlePlacement) {
      handlePlacement(position);
      return;
    }

    console.log(`Player attacking (${position.x}, ${position.y})`);
    const result = boardInstance.receiveAttack(position);

    // Don't switch turns if attack is invalid
    if (result.outcome === Outcome.UNAVAILABLE) return;

    if (boardInstance.allShipsSunk()) {
      handleAllSunk(player);
    } else {
      setCurrentPlayer("Computer");
    }
  }

  // Iterate over board to create a 2-D array of cells to display
  function createDisplayBoard(board: Board) {
    const displayBoard = [];
    // Generate rows
    for (let y = 0; y < board.length; y++) {
      const row = [];
      // Generate cells
      for (let x = 0; x < board[y].length; x++) {
        const position: Position = { x, y };

        let disabled = false;
        if(phase === "setup") {
          disabled = player === "Computer" || !handlePlacement;
        } else if (phase === "playing") {
          disabled = player === "Player" || player === currentPlayer;
        }

        row.push(
          <Cell
            key={`${x}-${y}`}
            state={board[y][x].type}
            position={position}
            // Only allow attacking on computer board and placing on player board
            disabled={disabled}
            // Hide ships if board is computer
            hide={player === "Computer"}
            interact={handleInteraction}
          />
        );
      }
      displayBoard.push(row);
    }
    return displayBoard;
  }

  const displayBoard = createDisplayBoard(board);

  return <div className="board">{displayBoard}</div>;
}
