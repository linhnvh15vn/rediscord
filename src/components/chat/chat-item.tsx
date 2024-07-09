"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { File, Trash, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import CustomTooltip from "~/components/custom-tooltip";
import {
  type InferredMessageSchema,
  messageSchema,
} from "~/components/schemas/message.schema";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import UserAvatar from "~/components/user-avatar";
import { DATE_FORMAT, ROLE_ICON } from "~/constants";
import { cn, getFileType } from "~/lib/utils";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";
import { type Member, type Message } from "~/types";

interface Props {
  type: "channel" | "conversation";
  message: Message;
  currentMember: Member;
}

export default function ChatItem({ type, message, currentMember }: Props) {
  const router = useRouter();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const { onOpen } = useModalStore();

  const form = useForm<InferredMessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: message.content,
    },
  });

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === message.member.id;

  const fileType = getFileType(message.fileUrl!);

  const canEditMessage = !message.deleted && isOwner && !message.fileUrl;
  const canDeleteMessage =
    !message.deleted && (isAdmin || isModerator || isOwner);

  const isPdf = fileType === "pdf" && message.fileUrl;
  const isImage = !isPdf && message.fileUrl;

  const isLoading = form.formState.isLoading;

  const { mutate: updateMessage } = api.message.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const onAvatarClick = () => {
    if (message.member.id === currentMember.id) return;
    router.push(
      `/server/${params?.serverId as string}/conversation/${message.member.id}`,
    );
  };

  const onSubmit = async (formData: InferredMessageSchema) => {
    updateMessage({ ...formData, id: message.id });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="group relative flex items-center p-4 hover:bg-accent">
      <div className="group flex items-start gap-2">
        <UserAvatar
          src={message.member.profile?.imageUrl}
          onClick={onAvatarClick}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold hover:underline">
              {message.member.profile?.name}
            </span>
            <CustomTooltip label={message.member.role}>
              {ROLE_ICON[message.member.role]}
            </CustomTooltip>
            <span className="ml-2 text-xs text-muted-foreground">
              {format(new Date(message.createdAt), DATE_FORMAT)}
            </span>
          </div>
          {isImage && (
            <Link
              href={message.fileUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-2 flex aspect-square size-48 items-center overflow-hidden rounded-md"
            >
              <Image
                src={message.fileUrl!}
                fill
                alt={message.content}
                className="object-cover"
              />
            </Link>
          )}
          {isPdf && (
            <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
              <File className="size-10 fill-indigo-200 stroke-indigo-400" />
              <Link
                href={message.fileUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline"
              >
                PDF File
              </Link>
            </div>
          )}
          {!message.fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm",
                message.deleted && "mt-1 text-xs italic text-muted-foreground",
              )}
            >
              {message.content}
              {message.updatedAt.toString() !== message.createdAt.toString() &&
                !message.deleted && (
                  <span className="mx-2 text-xs text-muted-foreground">
                    (edited)
                  </span>
                )}
            </p>
          )}
          {!message.fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input disabled={isLoading} {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm">
                  Save
                </Button>
              </form>
              <span className="mt-1 text-xs text-muted-foreground">
                Press esc to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="absolute -top-2 right-5 hidden items-center gap-2 rounded-sm border bg-accent p-1 shadow-md group-hover:flex">
          {canEditMessage && (
            <CustomTooltip label="Edit">
              <Edit
                className="ml-auto size-5"
                onClick={() => setIsEditing(true)}
              />
            </CustomTooltip>
          )}
          <CustomTooltip label="Delete">
            <Trash
              className="ml-auto size-5"
              onClick={() => onOpen("DELETE_MESSAGE", { message })}
            />
          </CustomTooltip>
        </div>
      )}
    </div>
  );
}
