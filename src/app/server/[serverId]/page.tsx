import React from "react";

import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

interface Props {
  params: {
    serverId: string;
  };
}

export default async function Page({ params }: Props) {
  const server = await api.server.getById({
    id: params.serverId,
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }

  return redirect(`/server/${params.serverId}/channel/${initialChannel.id}`);
}
