"use client";

import React from "react";

import { Plus } from "lucide-react";

import CustomTooltip from "~/components/custom-tooltip";
import { useModalStore } from "~/store/use-modal-store";

export default function ServerNavAction() {
  const { onOpen } = useModalStore();

  return (
    <CustomTooltip side="right" align="center" label="Tạo máy chủ">
      <div className="group">
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-3xl bg-accent transition-all group-hover:rounded-2xl group-hover:bg-emerald-500"
          onClick={() => onOpen("SERVER", {})}
        >
          <Plus className="text-emerald-500 transition-all group-hover:text-white" />
        </button>
      </div>
    </CustomTooltip>
  );
}
