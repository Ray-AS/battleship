import type { cellState, Position } from "../models";

interface cellProps {
  state: cellState;
  position: Position;
  disabled: boolean;
  hide: boolean;
  interact: (position: Position) => void;
}

export default function Cell({
  state,
  position,
  disabled,
  hide,
  interact,
}: cellProps) {
  let value: string;
  let style: string = state;

  // Determine display value and class name based on cell state
  switch (state) {
    case "empty":
      value = "·";
      break;
    case "hit":
      value = "×";
      break;
    case "miss":
      value = "-";
      break;
    case "ship":
      value = "=";
      if (hide) {
        value = "·";
        style = "empty";
      }
      break;
    default:
      value = "~";
      break;
  }

  return (
    <button
      className={`cell ${style}`}
      onClick={() => interact(position)}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
