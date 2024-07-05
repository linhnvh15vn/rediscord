"use client";

import React from "react";

import ServerForm from "~/components/forms/server-form";
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

export default function ServerModal() {
  const { type, onClose } = useModalStore();

  const isOpen = type === "SERVER";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tủy chỉnh máy chủ của bạn</DialogTitle>
          <DialogDescription>
            Hãy cá nhân hóa máy chủ bằng cách đặt tên và thêm biểu tượng đại
            diện. Bạn có thể thay đổi bất cứ lúc nào.
          </DialogDescription>
        </DialogHeader>
        <ServerForm />
        <DialogFooter>
          <Button type="submit" form="server-form">
            Tạo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
