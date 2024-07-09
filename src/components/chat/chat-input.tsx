"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import EmojiPicker from "~/components/emoji-picker";
import {
  type InferredMessageSchema,
  messageSchema,
} from "~/components/schemas/message.schema";
import { Form, FormField, FormItem, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

interface Props {
  type: "channel" | "conversation";
  name: string;
  query?: Record<string, string>;
}

export default function ChatInput({ type, name, query }: Props) {
  const params = useParams();
  const { onOpen } = useModalStore();

  const form = useForm<InferredMessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const { mutate: sendMessage } = api.message.sendMessage.useMutation();

  const onSubmit = async (formData: InferredMessageSchema) => {
    sendMessage({
      ...formData,
      serverId: params.serverId as string,
      channelId: params.channelId as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative px-4 py-6">
                  <button
                    type="button"
                    className="absolute left-8 top-1/2 -translate-y-1/2"
                    onClick={() => onOpen("ATTACHMENT", {})}
                  >
                    <Plus />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6"
                    placeholder={`#${name}`}
                    autoComplete="off"
                    {...field}
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
