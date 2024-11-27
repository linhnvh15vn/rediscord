import React from "react";

import { Users } from "lucide-react";
import { redirect } from "next/navigation";

import MemberNavItem from "~/components/member-nav/member-nav-item";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";

interface Props {
  serverId: string;
}

export default async function MemberNav({ serverId }: Props) {
  const members = await api.member.getAll({ serverId });
  const currentMember = await api.member.getCurrentMember();
  if (!currentMember) {
    return redirect("/");
  }

  return (
    <aside className="h-full w-60">
      <div className="flex h-12 items-center border-b px-3">
        <span className="text-md flex items-center gap-2 font-semibold">
          <Users className="text-muted-foreground" />
          Thành viên
        </span>
      </div>
      <ScrollArea className="p-1">
        {members.map((member) => (
          <MemberNavItem
            key={member.id}
            currentMember={currentMember}
            member={member}
          />
        ))}
      </ScrollArea>
    </aside>
  );
}
