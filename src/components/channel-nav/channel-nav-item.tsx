"use client";

import React from "react";

import { Edit, Trash, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import CustomTooltip from "~/components/custom-tooltip";
import { Button } from "~/components/ui/button";
import { CHANNEL_ICON } from "~/constants";
import { cn } from "~/lib/utils";
import { useModalStore } from "~/store/use-modal-store";
import { type Channel, type MemberRole } from "~/types";

interface Props {
  channel: Channel;
  role?: MemberRole;
}

export default function ChannelNavItem({ channel, role }: Props) {
  const router = useRouter();
  const params = useParams();

  const { onOpen } = useModalStore();

  const changeUrl = () => {
    router.push(`/server/${params.serverId}/channel/${channel.id}`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "group w-full justify-start text-muted-foreground",
        params?.channelId === channel.id && "bg-accent text-accent-foreground",
      )}
      onClick={changeUrl}
    >
      {CHANNEL_ICON[channel.type]}
      <span className="ml-2 line-clamp-1 text-sm font-semibold">
        {channel.name}
      </span>
      {channel.name !== "general" && role !== "GUESS" && (
        <div className="ml-auto flex items-center gap-2 text-muted-foreground">
          <CustomTooltip label="Sửa">
            <Edit
              className="hidden size-4 hover:text-accent-foreground group-hover:block"
              onClick={() => onOpen("CHANNEL", { channel })}
            />
          </CustomTooltip>
          <CustomTooltip label="Xóa">
            <Trash
              className="hidden size-4 hover:text-accent-foreground group-hover:block"
              onClick={() => onOpen("DELETE_CHANNEL", { channel })}
            />
          </CustomTooltip>
        </div>
      )}
      {channel.name === "general" && <Lock className="ml-auto size-4" />}
    </Button>
  );
}
