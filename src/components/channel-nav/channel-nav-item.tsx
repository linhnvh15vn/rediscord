"use client";

import React from "react";

import { Edit, Trash, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import CustomTooltip from "~/components/custom-tooltip";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface Props {
  channel: any;
  role?: any;
}

export default function ChannelNavItem({ channel, role }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "group w-full justify-start text-muted-foreground",
        params?.channelId === channel.id && "bg-accent text-accent-foreground",
      )}
    >
      {/* {CHANNEL_ICON_MAP[channel.type]} */}
      <span className="line-clamp-1 text-sm font-semibold">{channel.name}</span>
      {channel.name !== "general" && role !== "GUESS" && (
        <div className="ml-auto flex items-center gap-2 text-muted-foreground">
          <CustomTooltip label="Sửa">
            <Edit className="hidden size-4 hover:text-accent-foreground group-hover:block" />
          </CustomTooltip>
          <CustomTooltip label="Xóa">
            <Trash className="hidden size-4 hover:text-accent-foreground group-hover:block" />
          </CustomTooltip>
        </div>
      )}
      {channel.name === "general" && <Lock className="ml-auto size-4" />}
    </Button>
  );
}
