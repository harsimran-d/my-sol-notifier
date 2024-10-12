"use client";

import { SessionProvider } from "next-auth/react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </SessionProvider>
  );
}
