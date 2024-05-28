"use client";

import Link from "next/link";
import Board from "~/app/_components/shobu-board";
import { api } from "~/trpc/react";
import { arrayToGame } from "~/utils/gamelogic";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const gameDataQuery = api.game.getGameData.useQuery({ slug });
  const gameData = gameDataQuery.data;

  if (!gameData)
    return (
      <main className="flex h-full flex-col items-center font-old text-gold">
        <div className="my-auto flex flex-col gap-4">
          <h2 className="text-5xl">Tato hra není aktivní :(</h2>
          <Link href="/" className="major-button mx-auto">
            Vrátit se zpět
          </Link>
        </div>
      </main>
    );

  return (
    <main className="flex h-full flex-col items-center font-old text-gold">
      <Board board={arrayToGame(gameData.board)} />
    </main>
  );
}
