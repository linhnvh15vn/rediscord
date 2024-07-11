"use client";

import React, { useState } from "react";

import { BellRing, BellOff, Loader2 } from "lucide-react";

import CustomTooltip from "~/components/custom-tooltip";

export default function NotificationToggle() {
  const [loading, setLoading] = useState(false);
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();

  return (
    <div className="relative">
      {loading && (
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="animate-spin" />
        </span>
      )}

      {hasActivePushSubscription ? (
        <CustomTooltip label="Tắt thông báo trên thiết bị này">
          <BellOff
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </CustomTooltip>
      ) : (
        <CustomTooltip label="Bật thông báo trên thiết bị này">
          <BellRing
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </CustomTooltip>
      )}
    </div>
  );
}
