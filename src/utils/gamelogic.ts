const createGame = () => {
   let state:number[] = [];
   for(let i = 0; i < 64; i++) {
      if(Math.floor((i % 16) / 4) == 0) state.push(1);
      else if(Math.floor((i % 16) / 4) == 3) state.push(2);
      else state.push(0);
   }
   return state;
}

const intToVector = (int:number) => {
   let x = int % 5 - 2;
   let y = Math.floor(int/5) - 2;
   return {x: x, y: y};
}

const vectorToInt = (vec:{x:number, y:number}) => {
   let int = 0;
   int += vec.x! + 2;
   int += (vec.y! + 2)*5;
   return int;
}

const turnToInt = (turn:number[]) => {
   let int:number = 0;
   for(let i = 0; i < 3; i++) {
      let pow = Math.pow(10, (2-i)*2);
      int += pow * turn[i]!;
   }
   return int;
}

const intToTurn = (int:number) => {
   let turn:number[] = [];
   for(let i = 0; i < 3; i++) {
      let pow = Math.pow(10, (2-i)*2);
      turn.push(Math.floor(int/pow));
      int = int % pow;
   }
   return turn;
}

const intToPosition = (int:number) => {
   let z = Math.floor(int / 16);
   let y = Math.floor((int % 16) / 4);
   let x = int % 4;
   return {x: x, y: y, z: z};
}

const positionToInt = (pos:{x:number, y:number, z:number}) => {
   return pos.z * 16 + pos.y * 4 + pos.x;
}

const gameToArray = (game:number[][][]) => {
   let arr:number[] = [];
   for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
         for(let k = 0; k < 4; k++)
            arr.push(game[i]![j]![k]!);
   return arr;
}

const arrayToGame = (arr:number[]) => {
   let game:number[][][] = [];
   for(let i = 0; i < 4; i++) {
      game.push([]);
      for(let j = 0; j < 4; j++) {
         game[i]!.push([]);
         for(let k = 0; k < 4; k++)
            game[i]![j]!.push(arr[i*16 + j*4 + k]!);
      }
   }
   return game;
}

const validatePassive = (pos:number, vector:number, player:boolean) => {
   
}
