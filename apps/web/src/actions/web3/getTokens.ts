"use server";

import { PublicKey, Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
export const getTokens = async (publicKey: string) => {
  const connection = new Connection(process.env.SOLANA_RPC_ENDPOINT as string);
  console.log(process.env.SOLANA_RPC_ENDPOINT);
  try {
    const ownerPublicKey = new PublicKey(publicKey);
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      ownerPublicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );
    console.log("Token Accounts ", JSON.stringify(tokenAccounts));
    const tokenBalances = await Promise.all(
      tokenAccounts.value.map(async (accountInfo) => {
        const tokenBalance = await connection.getTokenAccountBalance(
          accountInfo.pubkey,
        );

        return {
          pubkey: accountInfo.pubkey.toBase58(),
          balance: tokenBalance.value.uiAmount,
          decimals: tokenBalance.value.decimals,
        };
      }),
    );

    return tokenBalances;
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return [];
  }
};
