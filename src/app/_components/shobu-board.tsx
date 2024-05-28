"use client";

import { useState } from "react";

export default function Board(props: { board: number[][][] }) {
  const { board } = props;

  const [passive, setPassive] = useState(null);
  const [active, setActive] = useState(null);
  const [vector, setVector] = useState(null);

  const resetSelection = () => {
    setPassive(null);
    setActive(null);
    setVector(null);
  };

  const clicked = (vec: number[]) => {
    if (!passive) {
    }
  };

  return (
    <main className="m-auto flex flex-col gap-4 md:gap-6 lg:gap-7 ">
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-7">
        <SubBoard sub={board[0]!} z={0} clicked={clicked} />
        <SubBoard sub={board[1]!} z={1} clicked={clicked} />
      </div>
      <div className="flex flex-row gap-4 md:gap-6 lg:gap-7">
        <SubBoard sub={board[2]!} z={2} clicked={clicked} />
        <SubBoard sub={board[3]!} z={3} clicked={clicked} />
      </div>
    </main>
  );
}

function SubBoard(props: {
  sub: number[][];
  z: number;
  clicked: (vec: {}) => void;
}) {
  const { sub, z, clicked } = props;

  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      {[0, 1, 2, 3].map((y) => (
        <div key={y} className="flex flex-row gap-2 lg:gap-3">
          {[0, 1, 2, 3].map((x) => (
            <div
              key={x}
              onClick={() => clicked([x, y, z])}
              className="flex h-11 w-11 rounded border-2 bg-stone-300 sm:h-14 sm:w-14 sm:rounded-md md:h-16 md:w-16 md:rounded-xl lg:h-20 lg:w-20"
            >
              {sub[y]![x] != 0 && (
                <div
                  className={`"w-9 lg:w-18 lg:h-18 m-auto h-9 rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14 ${sub[y]![x] == 1 ? "bg-stone-600" : "bg-stone-900"}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
