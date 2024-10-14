export default async function Page({
  params,
}: {
  params: { walletAddress: string };
}) {
  return (
    <div className="m-auto w-8/12">
      <div>In your wallet: {params.walletAddress} you have:</div>
      <p>Following Tokens</p>
    </div>
  );
}
