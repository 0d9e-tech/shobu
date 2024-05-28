'use client';

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
    }

    const clicked = (vec: number[]) => {
        if (!passive) {

        }
    }
    
    return (
        <main className="flex flex-col lg:gap-7 md:gap-6 gap-4 m-auto ">
            <div className="flex flex-row lg:gap-7 md:gap-6 gap-4">
                <SubBoard sub={board[0]!} z={0} clicked={clicked}/>
                <SubBoard sub={board[1]!} z={1} clicked={clicked}/>
            </div>
            <div className="flex flex-row lg:gap-7 md:gap-6 gap-4">
                <SubBoard sub={board[2]!} z={2} clicked={clicked}/>
                <SubBoard sub={board[3]!} z={3} clicked={clicked}/>
            </div>
        </main>
    );
}

function SubBoard(props: { sub: number[][], z: number, clicked: (vec: {}) => void }) {
    const { sub, z, clicked, } = props;

    return (
        <div className="flex flex-col gap-2 lg:gap-3">
            {[0, 1, 2, 3].map(y => (
                <div className="flex flex-row gap-2 lg:gap-3">
                    {[0, 1, 2, 3].map(x => (
                        <div onClick={() => clicked([x, y, z])} className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border-2 rounded sm:rounded-md md:rounded-xl bg-stone-300 flex">
                            { sub[y]![x] != 0 &&
                                <div className={`"w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full m-auto ${sub[y]![x] == 1 ? "bg-stone-600" : "bg-stone-900"}`} />
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}