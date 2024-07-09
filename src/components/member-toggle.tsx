import React from "react";

import { Users } from "lucide-react";

import MemberNav from "~/components/member-nav";
import { Button } from "~/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "~/components/ui/sheet";

interface Props {
  serverId: string;
}

export default function MemberToggle({ serverId }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Users />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0">
        <MemberNav serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
