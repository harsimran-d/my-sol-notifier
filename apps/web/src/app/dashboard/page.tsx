import SolWalletButtons from "@/ui/components/SolWalletButtons";
import AddPubKeyToSolNotifier from "@/ui/components/AddPubKeyToSolNotifier";
import MyAddedKeys from "@/ui/components/MyAddedKeys";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-end pr-2 pt-2">
        <SolWalletButtons />
      </div>
      <div className="m-auto flex w-8/12 flex-col justify-center">
        <AddPubKeyToSolNotifier />
        <MyAddedKeys />
      </div>
    </div>
  );
}
