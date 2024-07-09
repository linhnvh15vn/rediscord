"use client";

import React from "react";

import AttachmentForm from "~/components/forms/attachment-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModalStore } from "~/store/use-modal-store";

export default function AttachmentModal() {
  const { type, onClose } = useModalStore();

  const isOpen = type === "ATTACHMENT";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đính kèm tệp</DialogTitle>
          <DialogDescription>Gửi tập tin dưới dạng tin nhắn</DialogDescription>
        </DialogHeader>
        <AttachmentForm />
        <DialogFooter>
          <Button type="submit" form="attachment-form">
            Gửi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
