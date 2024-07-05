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

interface Props {
  server: any;
  role?: any;
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
          <DropdownMenuItem className="px-3 py-2 text-primary">
            Mời mọi người
            <UserPlus size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2">
            Cài đặt máy chủ
            <Settings size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2">
            Quản lý thành viên
            <User size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2">
            Tạo kênh
            <PlusCircle size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-destructive">
            Xóa máy chủ
            <Trash size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-destructive">
            Rời khỏi máy chủ
            <LogOut size={20} className="ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
