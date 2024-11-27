import React from "react";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "~/components/mode-toggle";
import NotificationToggle from "~/components/notification-toggle";
import ServerNavAction from "~/components/server-nav/server-nav-action";
import ServerNavItem from "~/components/server-nav/server-nav-item";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/server";

export default async function ServerNav() {
  const servers = await api.server.getAll();

  return (
    <aside className="sticky top-0 z-30 h-full">
      <div className="flex h-full w-20 flex-col items-center gap-4 border-r bg-background py-4">
        <ServerNavAction />
        <Separator className=" w-1/2" />
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => (
            <ServerNavItem key={server.id} server={server} />
          ))}
        </ScrollArea>
        <div className="flex flex-col items-center gap-4">
          <NotificationToggle />
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
