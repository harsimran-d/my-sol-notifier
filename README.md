# sol-notifier

A simple frontend that let's users connect their wallets to notification sources like TG/WA/Native notifications on browser

## Stack

Create a monorepo which has

- Core web2 service

  - Next.js
  - Typescript
  - Authentication via gmail/wallet is required. See next-auth with mm over here - https://github.com/DakaiGroup/nextjs-nextauth-metamask

- Web3 indexer

  - Needs to index all the wallets and find the Tokens the user has and it's amount
  - NFTs the user has and it's amount (maybe only blue chips from a list)

- Price indexer
  - Needs to poll coingecko and get back prices for tokens
  - Needs to poll ME/Tensor for floor price of NFT (floor - royalty is the final proce)

## What needs to be done

A simple UI where a user can

1. Add their `public key + blockchain` on the left
2. Add notifiers on the right (connect a discord channel/slack/whatsapp/push notifications in the browser)
3. A portfolio header that shows the user their net worth

## Run Locally

- `git clone https://github.com/code100x/sol-notifier.git`
- `cd sol-notifier`
- `npm install`

Copy all `.env.example` files to respective `.env` files and add your own variables

- `cp apps/web/.env.example apps/web/.env`
- `cp packages/database/.env.example packages/database/.env`

1. One for `next-auth` and `Google Provider`
2. For `prisma database url`

### Then

- `npm run prisma:migrate:dev`
- `npm run prisma:generate`
- `npm run dev`
