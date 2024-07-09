import React from "react";

import { redirect } from "next/navigation";

import ChannelNav from "~/components/channel-nav";
import MemberNav from "~/components/member-nav";
import { api } from "~/trpc/server";

interface Props {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}

export default async function Layout({ children, params }: Props) {
  const server = await api.server.getById({ id: params.serverId });
  if (!server) {
    return redirect("/");
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_240px]">
      <div className="hidden md:block">
        <ChannelNav serverId={params.serverId} />
      </div>
      <main className="flex-1">{children}</main>
      <div className="hidden lg:block">
        <MemberNav serverId={params.serverId} />
      </div>
    </div>
  );
}
