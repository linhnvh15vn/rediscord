import React from "react";

interface Props {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <div className="flex h-screen flex-col border-x">{params.channelId}</div>
  );
}
