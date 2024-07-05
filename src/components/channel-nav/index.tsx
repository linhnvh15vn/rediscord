import React from "react";

import ChannelNavHeader from "~/components/channel-nav/channel-nav-header";
import ChannelNavSearch from "~/components/channel-nav/channel-nav-search";
import ChannelNavSection from "~/components/channel-nav/channel-nav-section";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { api } from "~/trpc/server";

interface Props {
  serverId: string;
}

export default async function ChannelNav({ serverId }: Props) {
  const server = await db.server.findFirst({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const currentMember = await api.member.getCurrentMember();

  const textChannels = server.channels.filter(
    (channel) => channel.type === "TEXT",
  );
  const voiceChannels = server.channels.filter(
    (channel) => channel.type === "VOICE",
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === "VIDEO",
  );

  const searchData = [
    {
      label: "Kênh văn bản",
      type: "channel",
      data: textChannels,
    },
    {
      label: "Kênh thoại",
      type: "channel",
      data: voiceChannels,
    },
    {
      label: "Kênh video",
      type: "channel",
      data: videoChannels,
    },
    {
      label: "Thành viên",
      type: "member",
      data: server.members,
    },
  ];

  return (
    <aside className="sticky top-0 z-10 h-screen">
      <div className="flex h-full flex-col bg-background">
        <ChannelNavHeader server={server} role={currentMember?.role} />
        <ScrollArea className="flex-1 px-2">
          <ChannelNavSearch data={searchData} />
          <Separator />
          {!!textChannels?.length && (
            <ChannelNavSection
              label="Text Channels"
              role={currentMember?.role}
              channels={textChannels}
            />
          )}
          {!!voiceChannels?.length && (
            <ChannelNavSection
              label="Voice Channels"
              role={currentMember?.role}
              channels={voiceChannels}
            />
          )}
          {!!videoChannels?.length && (
            <ChannelNavSection
              label="Video Channels"
              role={currentMember?.role}
              channels={videoChannels}
            />
          )}
        </ScrollArea>
      </div>
    </aside>
  );
}
