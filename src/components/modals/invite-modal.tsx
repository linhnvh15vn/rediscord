"use client";

import React, { useState } from "react";

import { Copy, RefreshCw, Check } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useOrigin } from "~/hooks/use-origin";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

export default function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { type, data, onClose } = useModalStore();
  const origin = useOrigin();

  const isOpen = type === "INVITE";
  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const { mutate: generateInviteUrl } =
    api.server.generateInviteUrl.useMutation({
      onSuccess: () => {
        setIsLoading(false);
        // reopen invite modal
      },
    });

  const handleCopy = () => {
    void navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  const handleGenerateInviteUrl = async () => {
    setIsLoading(true);
    generateInviteUrl(data.server?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mời mọi người</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="text-xs font-bold">GỬI LINK MỜI CHO HỌ</Label>
          <div className="mt-2 flex items-center gap-2">
            <Input value={inviteUrl} readOnly />
            <Button size="icon" onClick={handleCopy}>
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs"
            onClick={handleGenerateInviteUrl}
          >
            TẠO LINK MỚI
            <RefreshCw className="ml-2 size-3" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
