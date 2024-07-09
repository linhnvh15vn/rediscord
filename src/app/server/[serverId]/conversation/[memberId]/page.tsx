import React from "react";

import { redirect } from "next/navigation";

import ChatHeader from "~/components/chat/chat-header";
import ChatInput from "~/components/chat/chat-input";
import ChatMessage from "~/components/chat/chat-message";
import MediaRoom from "~/components/media-room";
import { api } from "~/trpc/server";

interface Props {
  params: {
    serverId: string;
    memberId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  let conversation =
    (await api.conversation.find({ memberOneId, memberTwoId })) ??
    (await api.conversation.find({
      memberOneId: memberTwoId,
      memberTwoId: memberOneId,
    }));

  if (!conversation) {
    conversation = await api.conversation.create({ memberOneId, memberTwoId });
  }

  return conversation;
};

export default async function Page({ params, searchParams }: Props) {
  const currentMember = await api.member.getCurrentMember();
  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId,
  );

  if (!conversation) {
    return redirect(`/server/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;
  const otherMember = memberOne.id === params.memberId ? memberOne : memberTwo;

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader
        type="conversation"
        serverId={params.serverId}
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!searchParams.video && (
        <>
          <ChatMessage
            type="conversation"
            currentMember={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
          />
          <ChatInput
            type="conversation"
            name={otherMember.profile.name}
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
}
