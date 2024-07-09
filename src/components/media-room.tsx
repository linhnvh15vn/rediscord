"use client";

import "@livekit/components-styles";

import React, { useCallback, useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import {
  LiveKitRoom,
  formatChatMessageLinks,
  VideoConference,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  chatId: string;
  audio: boolean;
  video: boolean;
}

export default function MediaRoom({ chatId, audio, video }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const [token, setToken] = useState("");

  const onLeave = useCallback(() => router.push("/"), [router]);

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;
    const name = `${user.firstName} ${user.lastName}`;

    void (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`,
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [chatId, user?.firstName, user?.lastName]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 size-7 animate-spin" />
        <p className="text-sx">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
      data-lk-theme="default"
      style={{ height: "100dvh" }}
      onDisconnected={onLeave}
    >
      <VideoConference chatMessageFormatter={formatChatMessageLinks} />
    </LiveKitRoom>
  );
}
