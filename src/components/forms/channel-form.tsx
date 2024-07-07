"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  channelSchema,
  type InferredChannelSchema,
} from "~/components/schemas/channel.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

interface Props {
  // Add your component props here
}

const defaultValues: InferredChannelSchema = {
  name: "",
  type: "TEXT",
};

export default function ChannelForm(props: Props) {
  const params = useParams();

  const { data, onClose } = useModalStore();

  const form = useForm<InferredChannelSchema>({
    defaultValues: data.channel ?? defaultValues,
    resolver: zodResolver(channelSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const { mutate: createChannel } = api.channel.create.useMutation();
  const { mutate: updateChannel } = api.channel.update.useMutation();

  const onSubmit = async (formData: InferredChannelSchema) => {
    data.channel
      ? updateChannel({ ...formData, channelId: data.channel.id })
      : createChannel({ ...formData, serverId: params.serverId });
  };

  return (
    <Form {...form}>
      <form
        id="channel-form"
        name="channel-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">TÊN KÊNH</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} placeholder="kênh-mới" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">LOẠI KÊNH</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại kênh" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(ChannelType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
