-- CreateEnum
CREATE TYPE "BlockChain" AS ENUM ('Solana');

-- CreateTable
CREATE TABLE "PubKey" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "blockchain" "BlockChain" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PubKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PubKey_address_key" ON "PubKey"("address");

-- CreateIndex
CREATE INDEX "PubKey_userId_idx" ON "PubKey"("userId");

-- AddForeignKey
ALTER TABLE "PubKey" ADD CONSTRAINT "PubKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
