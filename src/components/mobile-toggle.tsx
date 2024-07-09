import React from "react";

import { Menu } from "lucide-react";

import ChannelNav from "~/components/channel-nav";
import ServerNav from "~/components/server-nav";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

interface Props {
  serverId: string;
}

export default function MobileToggle({ serverId }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-20">
          <ServerNav />
        </div>
        <div className="flex-1">
          <ChannelNav serverId={serverId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
