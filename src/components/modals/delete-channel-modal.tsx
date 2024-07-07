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

export default function DeleteChannelModal() {
  const { type, data, onClose } = useModalStore();

  const isOpen = type === "DELETE_CHANNEL";

  const { mutate: deleteChannel } = api.channel.delete.useMutation();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa kênh</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa <strong>{data.channel?.name}</strong> không?
            Hành động này không thể được bỏ dỡ giữa chừng.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteChannel({ id: data.channel?.id })}
          >
            Xóa kênh
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
