"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import FileUpload from "~/components/file-upload";
import {
  attachmentMessageSchema,
  type InferredAttachmentMessageSchema,
} from "~/components/schemas/message.schema";
import { Form, FormItem, FormField, FormControl } from "~/components/ui/form";
import { api } from "~/trpc/react";

export default function AttachmentForm() {
  const params = useParams();

  const form = useForm<InferredAttachmentMessageSchema>({
    resolver: zodResolver(attachmentMessageSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const { mutate: sendAttachment } = api.message.sendMessage.useMutation();

  const onSubmit = async (formData: InferredAttachmentMessageSchema) => {
    sendAttachment({
      ...formData,
      content: formData.fileUrl,
      serverId: params.serverId as string,
      channelId: params.channelId as string,
    });
  };

  return (
    <Form {...form}>
      <form
        id="attachment-form"
        name="attachment-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <FileUpload
                  value={field.value}
                  endpoint="messageFile"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
