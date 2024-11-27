import React from "react";

import ChannelNavHeader from "~/components/channel-nav/channel-nav-header";
import ChannelNavSearch from "~/components/channel-nav/channel-nav-search";
import ChannelNavSection from "~/components/channel-nav/channel-nav-section";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

interface Props {
  serverId: string;
}

export default async function ChannelNav({ serverId }: Props) {
  const [server, currentMember] = await Promise.all([
    api.server.getById({
      id: serverId,
      include: {
        channels: { orderBy: { createdAt: "asc" } },
        members: { include: { profile: true }, orderBy: { role: "asc" } },
      },
    }),
    api.member.getCurrentMember(),
  ]);

  const categorizedChannels = server.channels.reduce(
    (acc, channel) => {
      acc[channel.type]?.push(channel);
      return acc;
    },
    { TEXT: [], VOICE: [], VIDEO: [] },
  );

  const searchData = [
    { label: "Kênh văn bản", type: "channel", data: categorizedChannels.TEXT },
    { label: "Kênh thoại", type: "channel", data: categorizedChannels.VOICE },
    { label: "Kênh video", type: "channel", data: categorizedChannels.VIDEO },
    { label: "Thành viên", type: "member", data: server.members },
  ];

  const renderChannelSections = () =>
    Object.entries(categorizedChannels).map(([type, channels]) => {
      if (!channels.length) return null;
      const label = type === "TEXT" ? "Text Channels" : `${type} Channels`;
      return (
        <ChannelNavSection
          key={type}
          label={label}
          role={currentMember?.role}
          channels={channels}
        />
      );
    });

  return (
    <aside className="sticky top-0 z-10 h-screen">
      <div className="flex h-full w-60 flex-col bg-background">
        <ChannelNavHeader server={server} role={currentMember?.role} />
        <ScrollArea className="flex-1 px-2">
          <ChannelNavSearch data={searchData} />
          <Separator />
          {renderChannelSections()}
        </ScrollArea>
      </div>
    </aside>
  );
}
