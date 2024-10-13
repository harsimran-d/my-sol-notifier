"use server";

import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth_config";
import { prisma, PrismaClientKnownRequestError } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function verifySolPubKeyOwner(
  message: string,
  data: Uint8Array,
  publicKey: string,
): Promise<{ isValid: boolean; error?: string }> {
  const session = await getServerSession(authConfig);
  if (!session) {
    throw new Error("User not found");
  }
  const userId = (session.user as { id: string }).id;

  const loggedInEmail = session?.user?.email;
  const messageEmail = message.split(" ")[0];
  if (messageEmail != loggedInEmail) {
    return { isValid: false };
  }
  console.log("Message:", message);
  console.log("Received signedMessage:", data);
  console.log("Public Key:", publicKey);

  const encoder = new TextEncoder();
  const messageUint8 = encoder.encode(message);
  const publicKeyBytes = new PublicKey(publicKey).toBytes();

  try {
    const isValid = nacl.sign.detached.verify(
      messageUint8,
      Uint8Array.from(data),
      publicKeyBytes,
    );
    if (isValid) {
      console.log("Signature is valid");
      try {
        const PubKey = await prisma.pubKey.create({
          data: {
            address: publicKey,
            blockchain: "Solana",
            userId: userId,
          },
        });

        revalidatePath("/dashboard");
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            console.error("Error: Public key already exists in the database.");
            return {
              isValid: false,
              error: "Public key already exists. Please use a different one.",
            };
          }
        }
      }
    } else {
      console.log("Signature is invalid");
    }
    return { isValid };
  } catch (error) {
    console.log("Verification failed with error:", error);
    return { isValid: false };
  }
}
