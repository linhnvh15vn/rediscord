"use client";

import React from "react";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import CustomTooltip from "~/components/custom-tooltip";
import { cn } from "~/lib/utils";
import { type Server } from "~/types";

interface Props {
  server: Server;
}

export default function ServerNavItem({ server }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <CustomTooltip side="right" align="center" label={server.name}>
      <div className="group relative mb-2 flex items-center">
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-primary transition-all",
            params?.serverId !== server.id && "group-hover:h-5",
            params?.serverId === server.id ? "h-9" : "h-2",
          )}
        />
        <button
          type="button"
          className={cn(
            "group relative mx-auto flex size-12 overflow-hidden rounded-3xl transition-all group-hover:rounded-2xl",
            params?.serverId === server.id && "rounded-2xl",
          )}
          onClick={() => {
            router.push(`/server/${id}`);
          }}
        >
          <Image
            src={server.imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={server.name}
            priority
          />
        </button>
      </div>
    </CustomTooltip>
  );
}
