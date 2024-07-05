"use client";

import React, { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandItem,
} from "~/components/ui/command";
import { CHANNEL_ICON, ROLE_ICON } from "~/constants";
import { type Channel, type Member } from "~/types";

interface Props {
  data: {
    label: string;
    type: "channel" | "member";
    data: Channel[] | Member[];
  }[];
}

export default function ChannelNavSearch({ data }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", keydown);

    return () => document.removeEventListener("keydown", keydown);
  }, []);

  return (
    <div className="my-2">
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <p className="text-sm font-semibold">Search</p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">CTRL</span>
          <span>K</span>
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Tìm kiếm kênh và mọi người" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map((d) => (
                  <CommandItem key={d.id} className="space-x-2">
                    {type === "channel" ? (
                      <>
                        {CHANNEL_ICON[d.type]}
                        <span>{d.name}</span>
                      </>
                    ) : (
                      <>
                        {/* <UserAvatar src={d.profile.imageUrl} /> */}
                        {ROLE_ICON[d.role]}
                        <span>{d.profile.name}</span>
                      </>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
