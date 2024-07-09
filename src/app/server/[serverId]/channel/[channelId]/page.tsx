import React from "react";

import { redirect } from "next/navigation";

import ChatHeader from "~/components/chat/chat-header";
import ChatInput from "~/components/chat/chat-input";
import ChatMessage from "~/components/chat/chat-message";
import MediaRoom from "~/components/media-room";
import { api } from "~/trpc/server";

interface Props {
  params: {
    serverId: string;
    channelId: string;
  };
}

export default async function Page({ params }: Props) {
  const channel = await api.channel.getById({ id: params.channelId });
  const currentMember = await api.member.getCurrentMember();

  if (!channel || !currentMember) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen flex-col border-x">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={params.serverId}
      />
      {channel.type === "TEXT" && (
        <>
          <ChatMessage
            type="channel"
            name={channel.name}
            currentMember={currentMember}
          />
          <ChatInput
            type="channel"
            name="general"
            query={{
              serverId: params.serverId,
              channelId: params.channelId,
            }}
          />
        </>
      )}
      {channel.type === "VOICE" && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === "VIDEO" && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
}
