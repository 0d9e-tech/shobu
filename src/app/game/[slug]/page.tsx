"use client";

import dynamic from "next/dynamic";
import GameConnect from "../../_components/game-connect";
import Head from "next/head";

const GameConnectDynamic = dynamic(() => {
  return import('../../_components/game-connect');
}, {
  ssr: false,
});

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <>
        <Head>
            <title>Shobu | hra</title>
            <meta name="description" content="Shobu gaming!!!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            {/* <GameConnectDynamic key={slug} slug={slug} /> */}
            <GameConnectDynamic key={slug} slug={slug}/>
        </main>
    </>
  );
}