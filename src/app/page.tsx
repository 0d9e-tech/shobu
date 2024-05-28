'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Home() {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  const createGameMutation = api.game.createGame.useMutation({
      onSuccess: async (data) => {
          router.push(`/game/${data.slug}`);
      }
  })

  const goToGame = () => router.push(`/game/${slug}`)

  return (
    <main className="flex h-full flex-col items-center text-gold font-old">
      <h1 className="text-8xl md:text-9xl mt-20 mb-3">Shobu</h1>
      <h2 className="text-2xl md:text-4xl">ඞ klání mozků s kamenama ඞ</h2>

      <div className="my-auto flex flex-col">
        <input type="text" placeholder="Kód hry" onChange={(e) => setSlug(e.target.value)} className="p-5 mb-3 text-black text-4xl rounded-lg" />
        <button className="major-button mb-10" onClick={() => goToGame()}>
          Připojit se
        </button>

        <button className="major-button" onClick={() => createGameMutation.mutate()}>
          Začít novou hru
        </button>
      </div>
    </main>
  );
}