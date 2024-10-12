"use client";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false },
);
const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false },
);

export default function SolWalletButtons() {
  return (
    <div className="flex space-x-2">
      <WalletMultiButtonDynamic />
      <WalletDisconnectButtonDynamic />
    </div>
  );
}
