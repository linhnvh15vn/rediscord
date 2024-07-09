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

export default function DeleteMessageModal() {
  const { type, data, onClose } = useModalStore();

  const isOpen = type === "DELETE_MESSAGE";

  const { mutate: deleteMessage } = api.message.delete.useMutation();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa tin nhắn</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc muốn xóa tin nhắn này?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          {/* fix later */}
          <AlertDialogAction onClick={() => deleteMessage({})}>
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
