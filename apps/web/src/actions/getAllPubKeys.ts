"use server";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";

export default async function getAllPubKeys(): Promise<{
  pubKeys: {
    address: string;
    id: string;
    blockchain: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  error: string;
}> {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!userEmail) {
    console.log("user not found");
    return { pubKeys: [], error: "User not found" };
  } else {
    const allKeys = await prisma.pubKey.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
    });
    return { pubKeys: allKeys, error: "" };
  }
}
