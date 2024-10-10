"use client";

import { useSession } from "next-auth/react";

export default function UserEmail() {
  const session = useSession();

  return <div>Hi {session.data?.user?.email}</div>;
}
