import type { cellState } from "../models";

interface cellProps {
  state: cellState;
}

export default function Cell({ state }: cellProps) {
  let value: string;
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
      break;
    default:
      value = "~";
      break;
  }

  return <div className="cell">{value}</div>;
}
