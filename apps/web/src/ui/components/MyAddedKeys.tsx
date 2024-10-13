import getAllPubKeys from "@/actions/getAllPubKeys";
import DeletePubKey from "./DeletePubKey";

export default async function MyAddedKeys() {
  const resp = await getAllPubKeys();

  return (
    <div className="mt-2">
      <p className="text-center text-lg">Your keys</p>
      <table className="min-w-full table-auto border-separate border-spacing-y-3 rounded-lg border-t-2 border-gray-400 bg-gray-100 p-4 shadow-lg">
        <thead>
          <tr>
            <th className="text-left">Address</th>
            <th className="text-left">Chain</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resp.pubKeys.map((pubKey) => {
            return (
              <tr key={pubKey.id}>
                <td>{pubKey.address}</td>
                <td>{pubKey.blockchain}</td>
                <td>
                  <DeletePubKey id={pubKey.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
