import React from "react";

import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

interface Props {
  params: {
    inviteCode: string;
  };
}

export default async function Page({ params }: Props) {
  let profile = await api.profile.getCurrent();
  if (!profile) {
    profile = await api.profile.initialProfile();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const server = await api.server.invite({ inviteCode: params.inviteCode });
  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return null;
}
