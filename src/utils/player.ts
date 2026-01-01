import type { Orientation } from "../models";
import { Gameboard } from "./gameboard";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

export class Player {
  public gameboard: Gameboard;
  constructor() {
    this.gameboard = new Gameboard();
  }

  // Just pre-populate ships for now (TODO: add placement functionality)
  populate() {
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      const result = this.gameboard.placeShip(
        SHIP_LENGTHS[i],
        { x: i, y: 0 },
        "vertical"
      );
      if (!result) throw new Error("Failed to place all ships.");
    }
  }

  randomPopulate() {
    for (let i = 0; i < SHIP_LENGTHS.length; i++) {
      let isValid: boolean;
      let x, y, orientation: Orientation;

      do {
        isValid = true;

        x = Math.floor(Math.random() * this.gameboard.board_size);
        y = Math.floor(Math.random() * this.gameboard.board_size);

        orientation = ["horizontal", "vertical"][Math.floor(Math.random() * 2)] as Orientation;

        if (!this.gameboard.isInBounds(SHIP_LENGTHS[i], {x, y}, orientation)) {
          isValid = false;
          continue;
        }

        if(!this.gameboard.isOccupied(SHIP_LENGTHS[i], {x, y}, orientation)) {
          isValid = false;
        }
      } while (!isValid);

      const result = this.gameboard.placeShip(
        SHIP_LENGTHS[i],
        { x, y },
        orientation
      );
      if (!result) throw new Error("Failed to place all ships.");
    }
  }
}
