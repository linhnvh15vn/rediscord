"use client";

import React from "react";

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useModalStore } from "~/store/use-modal-store";
import { type MemberRole, type Server } from "~/types";

interface Props {
  server: Server;
  role?: MemberRole;
}

export default function ChannelNavHeader({ server, role }: Props) {
  const { onOpen } = useModalStore();

  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || "MODERATOR";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 select-none justify-between rounded-none border-b"
        >
          {server.name}
          <ChevronDown className="hidden sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-0.5 text-xs text-muted-foreground">
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-primary"
            onSelect={() => onOpen("INVITE", { server })}
          >
            Mời mọi người
            <UserPlus className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("SERVER", { server })}
          >
            Cài đặt máy chủ
            <Settings className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("MEMBER", { server })}
          >
            Quản lý thành viên
            <User className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2"
            onClick={() => onOpen("CHANNEL", {})}
          >
            Tạo kênh
            <PlusCircle className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-destructive"
            onClick={() => onOpen("DELETE_SERVER", { server })}
          >
            Xóa máy chủ
            <Trash className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-destructive">
            Rời khỏi máy chủ
            <LogOut className="ml-auto size-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
