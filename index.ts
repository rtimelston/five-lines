
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isKey1(): boolean;
  isKey2(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  isFalling(): boolean;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
  drop(): void;
  rest(): void;
  update(x: number, y: number): void;
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}

  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }

  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class Flux implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
      g.fillStyle = "#ccffcc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }

  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
      g.fillStyle = "#999999";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
  }

  moveVertical(dy: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class Player implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {}

  moveHorizontal(dx: number) {
  }

  moveVertical(dy: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class Stone implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
      g.fillStyle = "#0000cc";
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
    this.fallStrategy.isFalling()
        .moveHorizontal(this, dx);
  }

  moveVertical(dy: number) {
  }

  drop(): void {
    this.falling = new Falling();
  }

  rest(): void {
    this.falling = new Resting();
  }

  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Box implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
      g.fillStyle = "#8b4513";
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
    this.fallStrategy.isFalling()
        .moveHorizontal(this, dx);
  }

  moveVertical(dy: number) {
  }

  drop(): void {
    this.falling = new Falling();
  }

  rest(): void {
    this.falling = new Resting();
  }

  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Key implements Tile {
  constructor(private keyConf: KeyConfiguration) {
  }
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return true;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {
      // g.fillStyle = "#ffcc00";
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.keyConf.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
    remove(this.keyConf.getRemoveStrategy());
    moveToTile(playerx + dx, playery);
  }

  moveVertical(dy: number) {
    remove(this.keyConf.getRemoveStrategy());
    moveToTile(playerx, playery + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class Lockk implements Tile {
  constructor(private keyConf: KeyConfiguration) {
  }
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isFalling() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return this.keyConf.is1();
  }
  isLock2() {
    return !this.keyConf.is1();
  }

  color(g: CanvasRenderingContext2D) {
      // g.fillStyle = "#00ccff";
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = this.keyConf.getColor();
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {
  }

  moveVertical(dx: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}
}

class KeyConfiguration {
  constructor(private color: string,
              private _1: boolean,
              private removeStrategy: RemoveStrategy) {
  }
  getColor() {
    return this.color;
  }
  is1() {
    return this._1;
  }
  getRemoveStrategy() {
    return this.removeStrategy;
  }
}

interface Input {
  move(): void
}

class Right implements Input {
  move() {
    moveHorizontal(1);
  }
}

class Left implements Input {
  move() {
    moveHorizontal(-1);
  }
}

class Up implements Input {
  move() {
    moveVertical(-1);
  }
}

class Down implements Input {
  move() {
    moveVertical(1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile[][];

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR: return new Air();
    case RawTile.PLAYER: return new Player();
    case RawTile.UNBREAKABLE: return new Unbreakable();
    case RawTile.STONE: return new Stone(new Resting());
    case RawTile.FALLING_STONE: return new Stone(new Falling());
    case RawTile.BOX: return new Box(new Resting());
    case RawTile.FALLING_BOX: return new Box(new Falling());
    case RawTile.FLUX: return new Flux();
    case RawTile.KEY1: return new Key(YELLOW_KEY);
    case RawTile.LOCK1: return new Lockk(YELLOW_KEY);
    case RawTile.KEY2: return new Key(YELLOW_KEY_2);
    case RawTile.LOCK2: return new Lockk(YELLOW_KEY_2);
    default: assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(title: Tile, dx: number): void;
}

class FallStrategy {
  constructor(private falling: FallingState) {
  }

  update(tile: Tile, x: number, y: number): void {
    this.falling = map[y + 1][x].isAir()
        ? new Falling()
        : new Resting();
    this.drop(tile, x, y);
  }

  private drop(tile: Tile, x: number, y: number): void {
    if (this.falling.isFalling()) {
      map[y + 1][x] = tile;
      map[y][x] = new Air();
    }
  }

  isFalling() {
    return this.falling;
  }
}

class Falling implements FallingState {
  isFalling() { return true; }
  moveHorizontal(title: Tile, dx: number) {
  }
}

class Resting implements FallingState {
  isFalling() { return false; }
  moveHorizontal(title: Tile, dx: number) {
    if (map[playery][playerx + dx + dx].isAir()
        && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
}

let inputs: Input[] = [];

function remove(shouldRemove: RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (shouldRemove.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

interface RemoveStrategy {
  check(title: Tile): boolean;
}

class RemoveLock1 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock2();
  }
}

const YELLOW_KEY = new KeyConfiguration("#ffcc00",
    true, new RemoveLock1());

const YELLOW_KEY_2 = new KeyConfiguration("#ffcc00",
    false, new RemoveLock2());

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  map[playery + dy][playerx].moveVertical(dy);
}

function update() {
  while (inputs.length > 0) {
    inputs.pop().move();
  }

  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(x, y);
    }
  }
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function draw() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);

  // Draw map
  drawMap(g);

  // Draw player
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

