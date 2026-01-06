import { DEFAULT_BOARD_SIZE } from "../configs";
import type { Position } from "../models";
import { Player, SHIPS } from "./player";

export class Computer extends Player {
  // Keep track of previously hit positions to ensure no repetition

  constructor(
    // private prevHits: Position[] = [],
    private availableHits: Position[] = [],
    private shipsToSink = SHIPS.map((s) => s.ship)
  ) {
    super();
    for (let y = 0; y < DEFAULT_BOARD_SIZE; y++) {
      for (let x = 0; x < DEFAULT_BOARD_SIZE; x++) {
        this.availableHits.push({ x, y });
      }
    }
  }

  // Random attack choosing for now (TODO: implement smarter algorithm)
  // chooseAttackRandom(): Position {
  //   if (this.prevHits.length >= DEFAULT_BOARD_SIZE ** 2) {
  //     throw new Error("All positions exhausted");
  //   }

  //   let cellPosition: Position;

  //   do {
  //     cellPosition = {
  //       x: Math.floor(Math.random() * DEFAULT_BOARD_SIZE),
  //       y: Math.floor(Math.random() * DEFAULT_BOARD_SIZE),
  //     };
  //   } while (
  //     this.prevHits.some(
  //       (position) =>
  //         position.x === cellPosition.x && position.y === cellPosition.y
  //     )
  //   );

  //   this.prevHits.push(cellPosition);
  //   return cellPosition;
  // }

  chooseAttackRandom(): Position {
    if (this.availableHits.length <= 0) {
      throw new Error("All positions exhausted");
    }

    const index = Math.floor(Math.random() * this.availableHits.length);
    const cellPosition = this.availableHits[index];

    this.availableHits.splice(index, 1);

    return cellPosition;
  }

  chooseAttack() {}
}
