import { Pos, Vec } from "~/types";

export const createGame = () => {
  let state: number[] = [];
  for (let i = 0; i < 64; i++) {
    if (Math.floor((i % 16) / 4) == 0) state.push(1);
    else if (Math.floor((i % 16) / 4) == 3) state.push(2);
    else state.push(0);
  }
  return state;
};

// Konvertování formátů

const at = (game: number[][][], pos: Pos) => {
  return game[pos.z]![pos.y]![pos.x]!;
};

const intToVector = (int: number) => {
  let x = (int % 5) - 2;
  let y = Math.floor(int / 5) - 2;
  return { x: x, y: y };
};

const vectorToInt = (vec: Vec) => {
  let int = 0;
  int += vec.x! + 2;
  int += (vec.y! + 2) * 5;
  return int;
};

const turnToInt = (turn: number[]) => {
  let int: number = 0;
  for (let i = 0; i < 3; i++) {
    let pow = Math.pow(10, (2 - i) * 2);
    int += pow * turn[i]!;
  }
  return int;
};

const intToTurn = (int: number) => {
  let turn: number[] = [];
  for (let i = 0; i < 3; i++) {
    let pow = Math.pow(10, (2 - i) * 2);
    turn.push(Math.floor(int / pow));
    int = int % pow;
  }
  return turn;
};

const intToPos = (int: number) => {
  let z = Math.floor(int / 16);
  let y = Math.floor((int % 16) / 4);
  let x = int % 4;
  return { x: x, y: y, z: z };
};

const posToInt = (pos: Pos) => {
  return pos.z * 16 + pos.y * 4 + pos.x;
};

export const gameToArray = (game: number[][][]) => {
  let arr: number[] = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++) arr.push(game[i]![j]![k]!);
  return arr;
};

export const arrayToGame = (arr: number[]) => {
  let game: number[][][] = [];
  for (let i = 0; i < 4; i++) {
    game.push([]);
    for (let j = 0; j < 4; j++) {
      game[i]!.push([]);
      for (let k = 0; k < 4; k++) game[i]![j]!.push(arr[i * 16 + j * 4 + k]!);
    }
  }
  return game;
};

// Validace tahů

const vecIsValid = (vec: Vec) => {
  let ax = Math.abs(vec.x);
  let ay = Math.abs(vec.y);
  return (
    ax <= 2 &&
    ay <= 2 &&
    !(ay == 2 && ax == 1) &&
    !(ay == 1 && ax == 2) &&
    !(ay == 0 && ax == 0)
  );
};

const playerControlsPlace = (game: number[][][], player: number, pos: Pos) => {
  return at(game, pos) == player;
};

const turnInMap = (pos: Pos, vec: Vec) => {
  let x = pos.x + vec.x;
  let y = pos.y + vec.y;
  return x >= 0 && x < 4 && y >= 0 && y < 4;
};

const stonesInTheWay = (
  game: number[][][],
  player: number,
  pos: Pos,
  vec: Vec,
) => {
  let count = 0;
  let size = Math.max(Math.abs(vec.x), Math.abs(vec.y));
  let vec2 = { x: vec.x / size, y: vec.y / size };
  for (let i = 1; i <= size + 1; i++) {
    if (i == size + 1 && count == 0) break;

    let trg = { x: pos.x + vec2.x * i, y: pos.y + vec2.y * i, z: pos.z };
    if (at(game, trg) == player) count += 2;
    else if (at(game, trg) != 0) count += 1;
  }
  return count;
};

const posIsPassive = (player: number, pos: Pos) => {
  return Math.floor(pos.z / 2) + 1 == player;
};

const passiveActiveSidesCheck = (ppos: Pos, apos: Pos) => {
  return ppos.z % 2 != apos.z % 2;
};

export const validatePassive = (
  game: number[][][],
  player: number,
  pos: Pos,
  vec: Vec,
) => {
  return (
    vecIsValid(vec) &&
    playerControlsPlace(game, player, pos) &&
    turnInMap(pos, vec) &&
    stonesInTheWay(game, player, pos, vec) == 0 &&
    posIsPassive(player, pos)
  );
};

export const validateActive = (
  game: number[][][],
  player: number,
  pos: Pos,
  vec: Vec,
) => {
  return (
    vecIsValid(vec) &&
    playerControlsPlace(game, player, pos) &&
    turnInMap(pos, vec) &&
    stonesInTheWay(game, player, pos, vec) <= 1
  );
};

export const validateMove = (
  game: number[][][],
  player: number,
  ppos: Pos,
  apos: Pos,
  vec: Vec,
) => {
  return (
    validatePassive(game, player, ppos, vec) &&
    validateActive(game, player, apos, vec) &&
    passiveActiveSidesCheck(ppos, apos)
  );
};

// Dělání tahů

const getPossibleTurns = (
  game: number[][][],
  player: number,
  ppos: Pos,
  apos: Pos,
) => {
  let possible: Vec[] = [];
  for (let i = 0; i < 24; i++) {
    let vec = intToVector(i);
    if (validateMove(game, player, ppos, apos, vec)) possible.push(vec);
  }
  return possible;
};

const vecFromPosDif = (pos1: Pos, pos2: Pos) => {
  return { x: pos2.x - pos1.x, y: pos2.y - pos1.y };
};

export const move = (
  game: number[][][],
  player: number,
  ppos: Pos,
  apos: Pos,
  vec: Vec,
) => {
  // Passive move

  game[ppos.z]![ppos.y]![ppos.x]! = 0;
  game[ppos.z]![ppos.y + vec.y]![ppos.x + vec.x] = player;

  // Active move

  let count = stonesInTheWay(game, player, apos, vec);
  let size = Math.max(Math.abs(vec.x), Math.abs(vec.y));

  for (
    let i = 0;
    i < size - 1;
    i++ // Po nás ať přijde potopa
  )
    game[apos.z]![apos.y + (i * vec.y) / size]![apos.x + (i * vec.x) / size] =
      0;

  game[apos.z]![apos.y + vec.y]![apos.x + vec.x] = player;

  if (count == 1) {
    let vec2 = {
      x: (vec.x / size) * (size + 1),
      y: (vec.y / size) * (size + 1),
    };
    if (turnInMap(apos, vec2))
      game[apos.z]![apos.y + vec2.y]![apos.x + vec2.x]! = 3 - player;
  }

  return game;
};

// Victory check

const checkVictory = (game: number[][][]) => {
  for (let z = 0; z < 4; z++) {
    let rock_count = [0, 0];
    for (let y = 0; y < 4; y++)
      for (let x = 0; x < 4; x++) {
        let player = game[z]![y]![x]!;
        if (player > 0) rock_count[player - 1]++;
      }
    for (let i = 0; i <= 1; i++) if (rock_count[i] == 0) return 2 - i;
  }
  return 0;
};
