"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function LeaveModal() {
  const { type, data, onClose } = useModalStore();

  const isOpen = type === "LEAVE";

  const { mutate: leaveServer } = api.server.leave.useMutation({});

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Rời '${data.server?.name}'`}</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn rời khỏi <strong>{data.channel?.name}</strong>? Bạn
            sẽ không thể gia nhập lại máy chủ trừ khi bạn được mời lại.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => leaveServer({ id: data.server?.id })}
          >
            Rời phòng
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
