import { getTokens } from "@/actions/web3/getTokens";

export default async function Page({
  params,
}: {
  params: { walletAddress: string };
}) {
  const result = await getTokens(params.walletAddress);
  return (
    <div className="m-auto w-8/12">
      <div>In your wallet: {params.walletAddress} you have:</div>
      <p>Following Tokens</p>
      <table className="min-w-full table-auto border-separate border-spacing-y-3 rounded-lg border-t-2 border-gray-400 bg-gray-100 p-4 shadow-lg">
        <thead>
          <tr>
            <th className="text-left">Address</th>
            <th className="text-left">Balance</th>
            <th className="text-left">Decimals</th>
          </tr>
        </thead>
        <tbody>
          {result.map((tokenBalance: any) => (
            <tr key={tokenBalance.pubKey}>
              <td>{tokenBalance.pubkey}</td>
              <td>{tokenBalance.balance}</td>
              <td>{tokenBalance.decimals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
