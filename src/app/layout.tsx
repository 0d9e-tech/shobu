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
      <body className="flex h-screen min-h-screen flex-col bg-gradient-to-br from-[#21371D] to-[#204620]">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <footer className="flex flex-row justify-center gap-4 bg-[#21371D] px-6 py-2 font-old text-gold">
          <a href="https://0d9e.tech" className="font-bold">
            <p>Made by 0d9e</p>
          </a>
        </footer>
      </body>
    </html>
  );
}
