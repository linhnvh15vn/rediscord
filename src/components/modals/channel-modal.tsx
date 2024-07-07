"use client";

import React from "react";

import ChannelForm from "~/components/forms/channel-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModalStore } from "~/store/use-modal-store";

export default function ChannelModal() {
  const { type, onClose } = useModalStore();

  const isOpen = type === "CHANNEL";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo kênh</DialogTitle>
        </DialogHeader>
        <ChannelForm />
        <DialogFooter>
          <Button type="submit" form="channel-form">
            Tạo kênh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
