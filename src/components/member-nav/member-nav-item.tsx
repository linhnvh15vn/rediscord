"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";

import UserAvatar from "~/components/user-avatar";
import { cn } from "~/lib/utils";
import { type Member } from "~/types";

interface Props {
  member: Member;
  currentMember: Member;
}

export default function MemberNavItem({ member, currentMember }: Props) {
  const router = useRouter();
  const params = useParams();

  const isOnline = true;

  const handleMemberClick = () => {
    if (member.id === currentMember.id) return;
    router.push(
      `/server/${params.serverId as string}/conversation/${member.id}`,
    );
  };

  return (
    <div
      className={cn(
        "mb-2 flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-accent",
        isOnline ? "" : "opacity-30",
      )}
      onClick={handleMemberClick}
    >
      <div className="relative">
        <UserAvatar src={member.profile?.imageUrl} className="relative" />
        <div
          className={cn(
            "absolute bottom-0 right-0 z-10 size-3 rounded-full",
            isOnline ? "bg-green-500" : "hidden",
          )}
        />
      </div>

      <h4>{member.profile?.name}</h4>
    </div>
  );
}
