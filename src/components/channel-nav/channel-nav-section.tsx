"use client";

import React from "react";

import { ChevronDown, Plus } from "lucide-react";

import ChannelNavItem from "~/components/channel-nav/channel-nav-item";
import CustomTooltip from "~/components/custom-tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

interface Props {
  label: string;
  role?: any;
  channels: any[];
}

export default function ChannelNavSection({ label, role, channels }: Props) {
  return (
    <Collapsible defaultOpen className="mt-4">
      <div className="flex items-center justify-between pr-3">
        <CollapsibleTrigger asChild>
          <div className="my-2 flex items-center justify-between">
            <p className="flex flex-1 cursor-pointer select-none items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent-foreground">
              <ChevronDown className="size-3" />
              <span>{label}</span>
            </p>
          </div>
        </CollapsibleTrigger>
        {role !== "GUESS" && (
          <CustomTooltip label="Tạo kênh" side="top">
            <button type="button">
              <Plus className="size-4 text-muted-foreground hover:text-accent-foreground" />
            </button>
          </CustomTooltip>
        )}
      </div>

      <CollapsibleContent className="space-y-1">
        {channels.map((channel) => (
          <ChannelNavItem key={channel.id} channel={channel} role={role} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
