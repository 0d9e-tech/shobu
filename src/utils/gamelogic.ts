const createGame = () => {
   let state:number[] = [];
   for(let i = 0; i < 64; i++) {
      if(Math.floor((i % 16) / 4) == 0) state.push(1);
      else if(Math.floor((i % 16) / 4 == 3)) state.push(2);
      else state.push(0);
   }
   return state;
}
