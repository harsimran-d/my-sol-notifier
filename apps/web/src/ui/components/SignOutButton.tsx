"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="rounded bg-white px-2 text-blue-500 hover:bg-gray-200"
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
}
