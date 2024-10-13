"use server";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function deletePubKey(id: string) {
  const session = await getServerSession();
  if (!session) {
    return;
  }
  const userEmail = session.user?.email;
  if (!userEmail) {
    return;
  }
  await prisma.pubKey.delete({
    where: {
      id: id,
      user: {
        email: userEmail,
      },
    },
  });
  revalidatePath("/dashboard");
}
