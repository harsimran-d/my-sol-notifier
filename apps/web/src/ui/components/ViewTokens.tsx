"use client";

import { useRouter } from "next/navigation";

export default function ViewTokens({ address }: { address: string }) {
  const router = useRouter();
  return (
    <button
      className="rounded bg-green-500 px-1 py-1 text-xs text-white"
      onClick={() => {
        router.push(`/dashboard/solana/tokens/${address}`);
      }}
    >
      View Tokens
    </button>
  );
}
