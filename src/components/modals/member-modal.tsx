"use client";

import React, { useState } from "react";

import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ScrollArea } from "~/components/ui/scroll-area";
import UserAvatar from "~/components/user-avatar";
import { ROLE_ICON } from "~/constants";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function MemberModal() {
  const { type, data, onClose } = useModalStore();

  const [loadingId, setLoadingId] = useState("");

  const isOpen = type === "MEMBER";

  const { mutate: updateRole } = api.member.updateRole.useMutation({});
  const { mutate: kick } = api.member.kick.useMutation({});

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quản lý thành viên</DialogTitle>
          <DialogDescription>
            {`${data.server?.members.length} thành viên`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          {data.server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-2">
              <UserAvatar src={member.profile?.imageUrl} />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-xs font-semibold">
                  {member.profile?.name}
                  {ROLE_ICON[member.role]}
                </div>
                <p className="text-xs text-muted-foreground">
                  {member.profile?.email}
                </p>
              </div>
              {data.server?.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto">
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="mr-2 size-4" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() =>
                                updateRole({
                                  serverId: data.server!.id,
                                  memberId: member.id,
                                  role: "GUEST",
                                })
                              }
                            >
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="ml-auto size-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateRole({
                                  serverId: data.server!.id,
                                  memberId: member.id,
                                  role: "MODERATOR",
                                })
                              }
                            >
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="ml-auto size-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          kick({
                            serverId: data.server!.id,
                            memberId: member.id,
                          })
                        }
                      >
                        <Gavel className="mr-2 size-4" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto size-4 animate-spin" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
