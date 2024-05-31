"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Home() {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const createGameMutation = api.game.createGame.useMutation({
    onSuccess: async (data) => {
      router.push(`/game/${data.slug}`);
    },
  });

  const goToGame = () => router.push(`/game/${slug}`);

  return (
    <main className="flex h-full flex-col items-center font-old text-gold">
      <h1 className="mb-3 mt-20 text-8xl md:text-9xl">Shobu</h1>
      <h2 className="text-2xl md:text-4xl">ඞ klání mozků s kamenama ඞ</h2>

      {/* TODO: make this a from so you can hit enter to confirm */}
      <div className="my-auto flex flex-col">
        <input
          type="text"
          placeholder="Kód hry"
          onChange={(e) => setSlug(e.target.value)}
          className="mb-3 rounded-lg p-5 text-xl md:text-4xl text-black"
        />
        <button className="major-button mb-10" onClick={() => goToGame()}>
          Připojit se
        </button>

        <button
          className="major-button"
          onClick={() => createGameMutation.mutate()}
        >
          Začít novou hru
        </button>
      </div>
    </main>
  );
}
