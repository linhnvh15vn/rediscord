"use client";

import React, {
  type ElementRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";

import { Loader2, ServerCrash } from "lucide-react";
import { useParams } from "next/navigation";

import ChatItem from "~/components/chat/chat-item";
import ChatWelcom from "~/components/chat/chat-welcom";
import { Button } from "~/components/ui/button";
import { pusherClient } from "~/lib/pusher";
import { api } from "~/trpc/react";
import { type Member, type Message } from "~/types";

interface Props {
  type: "channel" | "conversation";
  name: string; // Channel name or member name
  currentMember: Member;
}

export default function ChatMessage({ type, name, currentMember }: Props) {
  const params = useParams();

  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = api.message.get.useInfiniteQuery(
    { channelId: params.channelId as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    pusherClient.subscribe(params.channelId as string);
    pusherClient.bind("sendMessage", (data: Message) => {
      setIncomingMessages((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unbind("sendMessage");
      pusherClient.unsubscribe(params.channelId as string);
    };
  }, [params.channelId]);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="my-4 size-7 animate-spin" />
        <p className="text-xs">Đang tải tin nhắn...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
        <ServerCrash className="my-4 size-7" />
        <p className="text-xs">Lỗi!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcom type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="my-4 size-6 animate-spin" />
          ) : (
            <Button variant="link" className="italic text-muted-foreground">
              Load previous messages
            </Button>
          )}
        </div>
      )}
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.messages.map((message: Message) => (
              <ChatItem
                key={message.id}
                type={type}
                message={message}
                currentMember={currentMember}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col-reverse">
        {incomingMessages.map((message) => (
          <ChatItem
            key={message.id}
            type={type}
            message={message}
            currentMember={currentMember}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
