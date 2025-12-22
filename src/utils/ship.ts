export class Ship {
  constructor(
    private readonly _length: number,
    private _hits: number = 0,
  ) {}

  get length(): number {
    return this._length;
  }

  get hits() {
    return this._hits;
  }

  hit() {
    this._hits++;
  }

  isSunk(): boolean {
    return this._hits >= this._length;
  }
}
