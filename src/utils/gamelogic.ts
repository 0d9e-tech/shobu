const createGame = () => {
   let state:number[] = [];
   for(let i = 0; i < 64; i++) {
      if(Math.floor((i % 16) / 4) == 0) state.push(1);
      else if(Math.floor((i % 16) / 4) == 3) state.push(2);
      else state.push(0);
   }
   return state;
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

const gameToArray = (game:number[][][]) => {
   let arr:number[] = [];
   for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
         for(let k = 0; k < 4; k++)
            arr.push(game[i]![j]![k]!);
   return arr;
}

const arrayToGame = (arr:number[]) => {
   let game:number[][][] = [[[]]];
   for(let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
         for(let k = 0; k < 4; k++)
            game[i]![j]![k]! = arr[i*16 + j*4 + k]!;
   return game;
}
