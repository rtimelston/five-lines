
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
  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;
  drop(): void;
  rest(): void;
  update(x: number, y: number): void;
  getBlockOnTopState(): FallingState;
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

  moveHorizontal(player: Player, dx: number) {
    moveToTile(player.getX() + dx, player.getY());
  }

  moveVertical(player: Player, dy: number) {
    moveToTile(player.getX(), player.getY() + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState() {
    return new Falling();
  }
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

  moveHorizontal(player: Player, dx: number) {
    moveToTile(player.getX() + dx, player.getY());
  }

  moveVertical(player: Player, dy: number) {
    moveToTile(player.getX(), player.getY() + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState(): FallingState {
    return new Resting();
  }
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

  moveHorizontal(player: Player, dx: number) {
  }

  moveVertical(player: Player, dy: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class PlayerTile implements Tile {
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

  moveHorizontal(player: Player, dx: number) {
  }

  moveVertical(player: Player, dy: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState(): FallingState {
    return new Resting();
  }
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

  moveHorizontal(player: Player, dx: number) {
    this.fallStrategy.moveHorizontal(this, dx);
  }

  moveVertical(player: Player, dy: number) {
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

  getBlockOnTopState(): FallingState {
    return new Resting();
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

  moveHorizontal(player: Player, dx: number) {
    this.fallStrategy.moveHorizontal(this, dx);
  }

  moveVertical(player: Player, dy: number) {
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

  getBlockOnTopState(): FallingState {
    return new Resting();
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
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number) {
    this.keyConf.removeLock();
    moveToTile(player.getX() + dx, player.getY());
  }

  moveVertical(player: Player, dy: number) {
    this.keyConf.removeLock();
    moveToTile(player.getX(), player.getY() + dy);
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState(): FallingState {
    return new Resting();
  }
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
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number) {
  }

  moveVertical(player: Player, dx: number) {
  }

  drop(): void {
  }

  rest(): void {
  }

  update(x: number, y: number): void {}

  getBlockOnTopState(): FallingState {
    return new Resting();
  }
}

class KeyConfiguration {
  constructor(private color: string,
              private _1: boolean,
              private removeStrategy: RemoveStrategy) {
  }
  setColor(g: CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  }
  is1() {
    return this._1;
  }

  removeLock() {
    remove(this.removeStrategy)
  }
}

interface Input {
  move(): void
}

class Right implements Input {
  move() {
    moveHorizontal(player, 1);
  }
}

class Left implements Input {
  move() {
    moveHorizontal(player, -1);
  }
}

class Up implements Input {
  move() {
    moveVertical(player, -1);
  }
}

class Down implements Input {
  move() {
    moveVertical(player, 1);
  }
}

class Player {
  private x = 1;
  private y = 1;

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  draw(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

let player = new Player();

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
    case RawTile.PLAYER: return new PlayerTile();
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
  drop(tile: Tile, x: number, y: number): void;
}

class FallStrategy {
  constructor(private falling: FallingState) {
  }

  update(tile: Tile, x: number, y: number): void {
    this.falling = map[y + 1][x].getBlockOnTopState();
    this.falling.drop(tile, x, y);
  }

  moveHorizontal(tile: Tile, dx: number) {
    this.falling.moveHorizontal(tile, dx);
  }
}

class Falling implements FallingState {
  isFalling() { return true; }
  moveHorizontal(title: Tile, dx: number) {
  }

  drop(tile: Tile, x: number, y: number): void {
    map[y + 1][x] = tile;
    map[y][x] = new Air();
  }
}

class Resting implements FallingState {
  isFalling() { return false; }
  moveHorizontal(title: Tile, dx: number) {
    if (map[player.getY()][player.getX() + dx + dx].isAir()
        && !map[player.getY() + 1][player.getX() + dx].isAir()) {
      map[player.getY()][player.getX() + dx + dx] = map[player.getY()][player.getX() + dx];
      moveToTile(player.getX() + dx, player.getY());
    }
  }
  drop(tile: Tile, x: number, y: number): void {
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
  map[player.getY()][player.getX()] = new Air();
  map[newy][newx] = new PlayerTile();
  player.setX(newx);
  player.setY(newy);
}

function moveHorizontal(player: Player, dx: number) {
  map[player.getY()][player.getX() + dx].moveHorizontal(player, dx);
}

function moveVertical(player: Player, dy: number) {
  map[player.getY() + dy][player.getX()].moveVertical(player, dy);
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

function drawPlayer(player: Player, g: CanvasRenderingContext2D) {
  player.draw(g);
}

function draw() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);

  drawMap(g);
  drawPlayer(player, g);
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

