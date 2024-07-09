"use client";

import React from "react";

import { VideoOff, Video } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import CustomTooltip from "~/components/custom-tooltip";

export default function ChatVideoButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isVideo = searchParams?.get("video");

  const handleClick = () => {
    isVideo
      ? router.push(pathname ?? "")
      : router.push(`${pathname}?video=${isVideo ? undefined : true}`);
  };

  const Icon = isVideo ? VideoOff : Video;
  const label = isVideo ? "Kết thúc cuộc gọi" : "Bắt đầu cuộc gọi";

  return (
    <CustomTooltip side="bottom" label={label}>
      <button onClick={handleClick}>
        <Icon className="size-6" />
      </button>
    </CustomTooltip>
  );
}
