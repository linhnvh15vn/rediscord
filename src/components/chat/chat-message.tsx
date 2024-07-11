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
import ChatWelcome from "~/components/chat/chat-welcome";
import { Button } from "~/components/ui/button";
import { useChatScroll } from "~/hooks/use-chat-scroll";
import { beamsClient } from "~/lib/beams-client";
import { pusherClient } from "~/lib/pusher";
import { api } from "~/trpc/react";
import { type DirectMessage, type Member, type Message } from "~/types";

interface Props {
  type: "channel" | "conversation";
  name: string; // Channel name or member name
  chatId?: string;
  currentMember: Member;
}

export default function ChatMessage({
  type,
  name,
  chatId,
  currentMember,
}: Props) {
  const params = useParams();
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } =
    type === "channel"
      ? api.message.get.useInfiniteQuery(
          { channelId: params.channelId as string },
          { getNextPageParam: (lastPage) => lastPage.nextCursor },
        )
      : api.directMessage.get.useInfiniteQuery(
          { conversationId: chatId! },
          { getNextPageParam: (lastPage) => lastPage.nextCursor },
        );

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages[0]?.items.length ?? 0,
    loadMore: () => void fetchNextPage(),
  });

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

  useEffect(() => {
    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest(params.channelId as string))
      .catch(console.error);
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
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
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
            {group.items.map((message: Message | DirectMessage) => (
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
      <div className="flex flex-col">
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
