import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "shobu",
  description: "0d9e online shobu",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="from-[#21371D] to-[#204620] bg-gradient-to-br min-h-screen flex flex-col h-screen">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <footer className="bg-[#21371D] flex flex-row gap-4 text-gold py-2 px-6 font-old justify-center">
          <a href="https://0d9e.tech" className="font-bold"><p>Made by 0d9e</p></a>   
        </footer>
      </body>
    </html>
  );
}
