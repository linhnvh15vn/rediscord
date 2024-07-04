import React from "react";

import { Plus } from "lucide-react";

import CustomTooltip from "~/components/custom-tooltip";

export default function ServerNavAction() {
  return (
    <CustomTooltip side="right" align="center" label="Tạo máy chủ">
      <div className="group">
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-3xl bg-accent transition-all group-hover:rounded-2xl group-hover:bg-emerald-500"
        >
          <Plus className="text-emerald-500 transition-all group-hover:text-white" />
        </button>
      </div>
    </CustomTooltip>
  );
}
