"use client";
import { deletePubKey } from "@/actions/deletePubKey";

export default function DeletePubKey({ id }: { id: string }) {
  function _deleteKey() {
    deletePubKey(id);
  }
  return (
    <button
      className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-400"
      onClick={_deleteKey}
    >
      Delete
    </button>
  );
}
