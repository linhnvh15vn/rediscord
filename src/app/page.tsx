import React from "react";

import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const InitialModal = dynamic(
  () => import("~/components/modals/initial-modal"),
  { ssr: false },
);

import { api } from "~/trpc/server";

export default async function Page() {
  const profile = await api.profile.initialProfile();

  const server = await api.server.getFirst();

  console.log(server);

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
}
