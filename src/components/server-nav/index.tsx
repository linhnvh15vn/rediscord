import React from "react";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "~/components/mode-toggle";
import ServerNavAction from "~/components/server-nav/server-nav-action";
import ServerNavItem from "~/components/server-nav/server-nav-item";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

export default async function ServerNav() {
  const servers = await api.server.getAll();

  return (
    <aside className="sticky top-0 z-30 h-screen">
      <div className="flex h-full flex-col items-center space-y-4 border-r bg-background py-3">
        <ServerNavAction />
        <Separator className=" w-1/2 rounded-md" />
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => (
            <ServerNavItem key={server.id} server={server} />
          ))}
        </ScrollArea>
        <div className="flex flex-col items-center gap-y-4">
          {/* <ToggleNotification /> */}
          <ModeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-12",
              },
            }}
          />
        </div>
      </div>
    </aside>
  );
}
