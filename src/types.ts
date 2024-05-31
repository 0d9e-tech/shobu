export type Pos = {
  x: number;
  y: number;
  z: number;
};

export type Vec = {
  x: number;
  y: number;
};

export type PlayerInfo = {
  role: 'player1' | 'player2',
  playerId: string,
} | {
  role: 'spectator',
  playerId: undefined,
}

export type LocalData = Record<string, PlayerInfo>;