"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { verifySolPubKeyOwner } from "@/actions/verifySolPubKeyOwner";
import { useSession } from "next-auth/react";
import getAllPubKeys from "@/actions/getAllPubKeys";

export default function AddPubKeyToSolNotifier() {
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [error, setError] = useState("");
  const selectedWallet = useWallet();
  const publicKey = selectedWallet.publicKey;
  const encoder = new TextEncoder();
  const session = useSession();
  const email = session.data?.user?.email;

  async function _verify() {
    setError("");
    if (!publicKey) {
      setError("Please connect a wallet first");
      return;
    }
    const resp = await getAllPubKeys();
    if (resp.pubKeys.some((pubkey) => pubkey.address == publicKey.toBase58())) {
      setError(`You already added the ${publicKey.toBase58()} key`);
      return;
    }
    const message = `${email} owns ${publicKey!.toBase58()}`;
    if (selectedWallet.signMessage) {
      const resp = await selectedWallet.signMessage(encoder.encode(message));
      let result;
      const walletName = selectedWallet.wallet?.adapter.name;
      if (walletName == "Phantom") {
        const phantomData: { data: Uint8Array } = JSON.parse(
          JSON.stringify(resp),
        );
        console.log(phantomData.data);
        result = await verifySolPubKeyOwner(
          message,
          phantomData.data,
          publicKey!.toBase58(),
        );
      } else if (walletName == "Backpack") {
        result = await verifySolPubKeyOwner(
          message,
          resp,
          publicKey!.toBase58(),
        );
      }
      setVerifyStatus(result?.isValid || false);
      if (result?.error) {
        setError(result.error);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="w-48 rounded bg-blue-500 px-2 py-2 text-white hover:bg-blue-400"
        onClick={_verify}
      >
        Add Public Key
      </button>
      <br></br>
      {error ? <span className="text-red-400">{error}</span> : " "}
    </div>
  );
}
