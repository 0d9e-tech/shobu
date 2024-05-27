import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex h-full flex-col items-center bg-gradient-to-br text-gold font-old">
      <h1 className="text-8xl md:text-9xl mt-20 mb-3">Shobu</h1>
      <h2 className="text-2xl md:text-4xl">ඞ klání mozků s kamenama ඞ</h2>

      <div className="my-auto flex flex-col">
        <input type="text" placeholder="Kód hry" className="p-5 mb-3 text-black text-4xl rounded-lg" />
        <button className="major-button mb-10">
          Připojit se
        </button>

        <button className="major-button">
          Začít novou hru
        </button>
      </div>
    </main>
  );
}